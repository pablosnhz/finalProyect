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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQyp3lvNQcMEDzOUHikoE9lkAxdzcoL7k4iBDEyHgO416fc4KyccFTsD0Su7L3lCIzJuc_SRZR8iyUo/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRLNKw9ql6TfTJgtIWp35ZE6epImQOTozvKzXetDi66p7R5nfwhbmtH5dW9Vxxe5vSEM3nUCq9e_boE/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQWj2HPkMwTdh75n1pyt1CTze65Bg9HvRxcX-WpuwOrq9Lw26xThXpXFG9HwR3NID9btjJcd4vU_WtA/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQGP3g9M6jMc0ELOc1OOCYOfMubTL7SpdIcNqByouzSZOxm0OVvmbf-u0rcProPTePi4UHAfdh8JT-e/pub?output=csv'
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
