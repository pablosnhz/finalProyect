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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQGJ9-xXw4h3ne398LimtGuH5ObpxrX1McSqofgTvP1xn4LhoEJIVWeqapNLbMIe7wtzlnGwa84omEx/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRE97pVtQf79Uhu3VqT8MkLRr1b9PbzQ9rt8gfo4D8Cv1vgIIE0YaLXvnI27A6TGgf9uPYGUsz-dE5L/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2E2nOQ5KKO6__wS5pt-KOZA6nHHPbh919e55cxPY-IV_w4bW08QTLBkHhaK7BW2vKTsSz12um8GXX/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2URUXdR9uc7qBQ6UdZyR5xFVlj9YtLW-xlgfo14Qw8A818D-q51r5VySLIHe83QGo4KUXXBLcPR1x/pub?output=csv'
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


