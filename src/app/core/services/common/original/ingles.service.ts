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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT-GL2rcufMlVljNMUGhduEr9w6WBQsbdgnBQCusKqApG3F_v6t3qwP2ud5BguPA9DIZOomaIMDU9jt/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQuZnAtz63iKXv-sQONcrOtSPta3ZMfA_twrksmU0M6c49vP5lEDysVeVG4pxZTcnKXr8fmL69r1zrt/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSESlWKQ5wQAP18Bz4Uw1lTZ-Z6czMegC62qDIOxApmQWq0DFFFJgs15yPRjC6Mp8BiVmg9rVRlRerO/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7jtviTARCGudwUTkTLOW2TB1VRpJ_xtny_qwflmq5TEc9XMJeznIwqJLlEUrVDAWKEb3xhFkHN366/pub?output=csv'
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
            imagen: row.imagen,
            imagendos: row.imagendos,
            imagentres: row.imagentres,
            imagencuatro: row.imagencuatro
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


