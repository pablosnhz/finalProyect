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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTpR5U0t3bevSnJPMDgV8-pxr1NR3h9l_ttdz-DYVs0YeUori_Bul0Ron3Cq3Z3oBexRkMnxEmU5C-Q/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfc6n4OMHIb5KvSXNFxDcPGM4jhZEQDcpP70yirNLQ_r5YxwKVT0jBeItfN-wPvrPXqMn90nMtO_DE/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvfkkvYOhVos7NsE1cGd16yJYL2PZCmHRA6dNvmhYnkstdl_lPn6rGoVt7dCLQglI_wSjjYdAg9gmy/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRzOMeIAT00BCh-_4dpvIy52KOsIrbfOH8AmVw_XBsC7OlWaHfXL4NzK-Xw0iGkRavztiSqzvrR3Fl9/pub?output=csv'
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


