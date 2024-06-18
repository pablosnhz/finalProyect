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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQZ7t5yUhS-ieHNnmMw19SnF1RUfGXAn04Vc9LRU_6eIC0DiasGwi_CQxN4VtOwEdv2Qxt4BqNL92_U/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSUoeAn7Rz3tzZ27woAZ4wqia7d1BS1p7Mg9r0e39pOP9QKLD0ikaqj6sX8sOVJGqI45AMi3AnJPVcK/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQMAiF7W88dTFEqzJmsuNx3P-vAlxRxf1F05v-xEc9P2N8QwzdXQ84DKls46K2ZKRzVgX29p7M1WoX1/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSJXKN_3Bex6Y1kIIjOzEBdPWpiUID1zz1e4t8DsAQeUSpH2KtH3sebHWAy8K7hT7PNAFeUo4FO1sAj/pub?output=csv'
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
