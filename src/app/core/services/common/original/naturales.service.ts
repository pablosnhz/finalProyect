import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaturalesService {
  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vScqkZScocD-Qqx6ZWX9kudyoUGzMYGeeHtrlx8r9xMT_QnfADqvlP9Ra-jTF_T1x87nYlXRusYCKLJ/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTDKP7ntYyO0ZIZlNEMf7URRA40fT0-c1mAX8kwLYVe3SsEqpqraUsNNXdUKA_fOwlQ0eDYxVgHbmoG/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSYVNgrLNryXdLhs1IGv3DIgQ1yz394qGVsSpX_BnwLhFE2q3XB1yPqRdnxeWRuboetgtAc_RaHWn8i/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTeY8WryIMJiSxVFOo-8l4MDhzZsyINP6yXGsjXl4dALhf7MWjyLGW1mtc2531rdaP3qtzfLu0i3y8c/pub?output=csv'
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
            imagen: row.imagen,
            imagendos: row.imagendos,
            imagentres: row.imagentres,
            imagencuatro: row.imagencuatro
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
        localStorage.setItem('naturalesSheets', JSON.stringify(allData));
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


