import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialesService {
  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQnLo9WtkRQPYa_qKkZ2X55CYvb2lVFIQYRjdQxdgNe0GabeLGH3sT6JbVBCbQhh6idvXVcw8V27rdG/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT9VwDPY6G2UPMqZWzuZSUJHWOaZDJObDUxru-2TbnZFcdUSwGmXisQ3rOUQJ5HQg40UpPI7w18eTWp/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6U-I-S_0zDiPCHuBlb-iEVmCDStf6VkpfetUykjgL8Ij3gZaQHiOLql6eOmN4kUrv2ZoWFBRU14yt/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTGSt4KJhADgzrhrp97HCpmHEBBt00Ic7Z3vHse4w2JgXHL3k0JpjXLDsgS42Iu1YNNksrSh1E8vSBg/pub?output=csv'
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
        localStorage.setItem('socialesSheets', JSON.stringify(allData));
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
