import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { parse } from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class SheetsDatesService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQeN26DO_lXrzugLjBaSs3aqkBqv4H9gVrx_OoF3aCNz9V4m52Ww3erV1Mr6Ohl4KmTUSf5AvY4D_OH/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQUvlSW28lMZD9bGQ2rkHrGIGpDy2a6HFnchVa0Ky47NQgNt14NyXO9fwXPZxqkMiYU4CJE6m401hcm/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vROU0mrMjOw9Wmcc3h-bKC-UQPtL8t25OlW2m3NppnYv0eGjO579UftnapVAMJ-zUhzho2jmP1qC5WW/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQS0c0suEea2fimd0Mf80pIwEuCrFFrYeqQtUEUB_S8Ip8Vshul100gcUSe3EJrFhYxzL-K9NUZW1H4/pub?output=csv'
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
        localStorage.setItem('datosSheets', JSON.stringify(allData));
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
