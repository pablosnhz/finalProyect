import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NaturalesGradoService {
  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTWAvv1-nWeNVEYSB3N1IXv_fJGyWff_NzWZhAbnyV-Cg60xc3qVRDKXKzOBdqcNjSCQIXvWBNUCAo4/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTUmZK8a3hOh17BIkhCP7CU9WfxB74qAFvvobgWJRKs6U_kDr3vzYb4G25tg1y1CA1YnaFFLmLXcRfH/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTFSzgIGq2K7EYStb5R95-ZKMiK1o35OK8s7zQL3BqtK-Qf5RDAArLJROXUPOSZCuKMNtIzmXSfJ1iJ/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRk6f0G7etyTN173vfI7R4NH0JQBeiUEXs2iqj-kuYSdSA1D-M69L5GlVtD4zbhgijMUIktkg3VGDV9/pub?output=csv'
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
        localStorage.setItem('naturalesGradoSheets', JSON.stringify(allData));
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


