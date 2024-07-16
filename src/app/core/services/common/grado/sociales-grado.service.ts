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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRgPIbrLwRQ9hpCSVjhEXHPVjLuyLUCDya0fseJBn0_DbA8V-q6b-8_n2iebG8m3aypry1MWLl9hPJZ/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQisF_VM9U_zEHrhyQ4c2S8J1GSVDZeQ6T-K8w1NZygqBXN2M0KjGnq7K5WVVsArnT_fuXWagD2SWEn/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT-IOn2re_IZy_8B6fqvKglw6Hq_35ifjbOZqMpFo4EvftKsrWb2m1hXdNZeYtrD8D1yX18-Jv3MBWU/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRGak84sSnP3JpmIF_l7UJp82Q2QXJcLIc26xJS47l8qGQqV5hY_DzoqAdxzJ-o56D2GuSShaTCgtFi/pub?output=csv'
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
