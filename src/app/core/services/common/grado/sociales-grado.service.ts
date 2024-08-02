import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialesGradoService {
  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRP03yfbYA2-ZGlyYrmMrWrg-2ivbgQZhQOHr2mSvcxeBu_vGI0s6IXI5W3a86b3sOan_vyzsjSwmio/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSxene289h-QhUstotMiru1_UoypFjXxcTJ9xtgus9cI9Q6hQ2fY85x4tVmcck8hdlqzrmWFnbDe3oy/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTsasbabvh-wSQBOvogBKl6PwbS6KDXUrhVflfP3FKSeIxNY0WbPOzBYusJ36tGKyNPyIh23-Zu8yaV/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSEiHb-nF_gUNJ6SQ1Q06ffD6HsAy617qwWO9bgt-3fXBg5eYIanCV3vwV74RLDlQ34gNPs7lsK5j9v/pub?output=csv'
  ];

  getGradoSheets(): Observable<any[]> {
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
            imagen: row.imagen,
            imagendos: row.imagendos,
            imagentres: row.imagentres
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
        localStorage.setItem('socialesGradoSheets', JSON.stringify(allData));
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
