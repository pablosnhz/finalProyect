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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZBZSbZ752yN5VPGy-A0r3m6YlHcRJIhWxb9XcGZEGnlRjJmqE-7yC16GQoikvxSbhtj5GUtuv2h6U/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7fPZ7wMG8uxRJusNZc0aqdgfmcA_AefVISwzxz4bYrJr8uDacxL6aGUq575Lkq8htt_JblmmGMGm-/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSTxms5S86_Ttvl5Go9J-YjKyazWyaq9vIvqYcIwG5FxJQ9Q46JZQYigzEJQ_Alp9NUzvucF3EbiLhC/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vR73xsWpPYQklpfoMBzRQoYNLgBh1sb9tpf3Ne33nKJZZ0iUMRIGEen5uGMbvrePYAvLWqAbt6ZU5b9/pub?output=csv'
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
