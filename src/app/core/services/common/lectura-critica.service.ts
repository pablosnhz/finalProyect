import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturaCriticaService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjluTvTMEzhbcAAHCg4Vx6l6M9WwBVEoPiq5nCyEhIj2UDFg82J2l1Yygwf8GQFUVS3-CjKxKzSC6u/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQFvRco0cs3fnMQK2fUZ0FZer7IqoDglKZqzh2gVG6koqw07gRTlicULFelZvqEuj79Cc3ZGt8bC5OA/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQO678wjyB7LYea5Z1Wqw1wWcd_XQbepSzv4b262n9-a8ueOH696Gy2rcxnUGHGX2CwMNdV7DZmb6W2/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYUmx_r6DPMNCLmEa-hFA9zlTegYP2jEMin5abaGKpuEAmGtYSHntLO5Sy3q5G248ouoPlDN5520bp/pub?output=csv'
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
        localStorage.setItem('lecturaCriticaSheets', JSON.stringify(allData));
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
