import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { parse } from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class SheetsDatesGradoService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vR1balZ8EROvpbvJerWRSivd1FlEKjizDv7UA5h4oYKUQm48mHxtZZRMVfLqhCCWchd7jQrOg3nzceM/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSn83N_0I_4iiIjGZeIB2vuTbs1i-zXFC8auPpmhMgQ61uxAgQoVX8WTaYhB5CQ_zo8pNTVh0EkWQx_/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTA9NzaCA8wnUFmvyLplHMJEqsk9ClT9fqz4Et1uKpr5Oz-CZCd5vlGF2ZTBUELIMesFwoK081MGoCN/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRxF0aFQBtGRS1lEvkttT_gTbF6JSCr_QNc0KuZYeXinQ980zFNFYQWa9TwHjzlVeOv9P0M4Kz3XU67/pub?output=csv'
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
        localStorage.setItem('razonamientoGradoSheets', JSON.stringify(allData));
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
