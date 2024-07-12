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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQEC6SFKPOLXv8P-cis2GYYJZPdOv0UqdYHldeOyiq1A3CwimR3kKkkTjZGNu2p2V23en3vuOcSkPEz/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTdpeH1WZMl4YQnnF-2jrpxCGraoCIUfgZoTO8ZM_nPjrnJY4MK84U-f3tMK8EclgoNWQhBCxIH5Dq/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQlF9UjYk9bwN7JDPtwC6IGvf01ps8MiWnMaxX5kRIED4iDy1sWIOGH0EDW7ArUO5Kgjq_oV2UKh8qb/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMSWmySKO_-YlLDIm_Ufb3i_lKNgTM5dffxPUEk2YJKPG9ASJxzIJucRAhbsuXAvPonNabCOWGkmIG/pub?output=csv'
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


