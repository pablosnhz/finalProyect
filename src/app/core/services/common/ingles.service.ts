import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InglesService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4T8uLwzBQrjzhSe4PPzGCPwT1teD1jVOqMX-3nuVDohY0yH9oftPgLvVEa-e3tGJrvgBaVVLqVe_1/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQCLrhl0LSsvhxPhakIZ6BKU7oRz0VdM6YO42AFmOjp7guWXB3YDpLXCL40KyZid8xo2MHRQ0r2K8bc/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vR86QO59r9rtCbR3cGhXfhVR3dd5vHj8Y2HdvqeGkIpSZBvDBzgECVVlN5C5SxoAOZ5yk2g_31yH2NV/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQB4Gg3wJ3q5A7QLiXuDcF9UK42YsmCdJTbnSliOoNvkco6Wdfrxv3xPcBpKJ90HFEAkVf6wI5FDlLQ/pub?output=csv'
  ];

  getSheets(): Observable<any[]> {
    this.$loading.set(true);

    const sheetRequests = this.sheetUrls.map(url =>
      this.httpClient.get(url, { responseType: 'text' }).pipe(
        map((csvData: string) => {
          const jsonData = parse(csvData, { header: true });
          return jsonData.data
          .map((row: any) => ({
            // nivel: row.nivel,
            pregunta: row.pregunta,
            enunciado: row.enunciado,
            a: row.a,
            b: row.b,
            c: row.c,
            d: row.d,
            respuestas: row.respuestas,
            explicacion: row.explicacion,
            titulo: row.titulo,
            teoria: row.teoria,
            imagen: row.imagen
          }));
        }),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return of([]);
        })
      )
    );

    return forkJoin(sheetRequests).pipe(
      map((sheetsData: any[][]) => {
        const allData = sheetsData.flat();
        localStorage.setItem('inglesSheets', JSON.stringify(allData));
        this.$loading.set(false);
        return allData;
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        this.$loading.set(false);
        return of([]);
      })
    );
  }
}


