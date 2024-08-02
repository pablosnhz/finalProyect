import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InglesGradoService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vS1uIgfBkwWZktQUV-5cmpF4gEh75c37751iPFNSEJ5SP6j0VTF5nTaepx1bMiXcLSka5LVLRewZLSN/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQj60rg-Z9d3ZkSvDrxslV3zmASOZ1cqozWr2LKegiOzBbJpJnkdDg1nKZj716UtYUOMU0ZUypCd6vP/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vR-Zs22fQ8NZldHc4Ohjjo8DsgcdszezZvPdqqKpow3yGs1xudNAar-hlOd3vow9b0mG9XO4ZtTR85K/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSHieB1Wg-_7zUGtuLnbShGz8KXhndg7-UpeR7MnxznQoL_rbb__zC4E_KvKbcmWvfN-9kmgNUd3mra/pub?output=csv'
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
        localStorage.setItem('inglesGradoSheets', JSON.stringify(allData));
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


