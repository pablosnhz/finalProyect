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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8U1gvaBw-2od7_kOxgz4MsLL8eL4gMdlRUht_m0NxNc2P_8aMAZAV3fhXuQEXTYaXAa43ffSmtYh1/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjgwkw9NEHIXgpOnph0ZXgwJYcnOTrFNBG0P4lc6uz4UPGL43iZLtRmBT93JA1hWWFlGx0fE7mMEym/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQA6YD7UK-CmZgH3PJvCEoBG7in96-DTRX4af7P5K3CaN1vt3blAbJE_lN3L8xxFz8YmG3IJatcJywq/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQ2s5aIYAnCOflhGLuHzgf_os5Eaf8m2TW8mGBWYs0f3QN5EO1ru9WaW1r7zux11MPrWpRMmQo0SrI/pub?output=csv'
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


