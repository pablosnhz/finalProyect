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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT222ibNMSbf1nomjFRw01N-S-MYiVtjUAmyNDxqJj8h4zvX8_LWrd9DxZ8WH4i6zV7yxZz0HfQ1FRe/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTAnsL9KLF6uEMPr5bCpr8ydTC_sdjkjvIKO4T02udPpdbNgKek7rBR785tRufIf-FkmNNBQMEkZDj0/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRVfU8nMzBG10LX8Wx0_I1OR8WnGhSi7g4CrFddQ2OkWuGL6NiWBNJWOmW18mN5QPK4b9UBZR7qPgGP/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT4J479YXrBAOPh0ILW7DciozAMr1EFkEhGaTyi7uBseXJ1r5FN9amI3eoMPJuhHEIcBOywSnZLCMvn/pub?output=csv'
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


