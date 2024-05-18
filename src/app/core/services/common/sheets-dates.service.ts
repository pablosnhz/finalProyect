// sheets-dates.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { parse } from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class SheetsDatesService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  getSheets(): Observable<any[]> {
    this.$loading.set(true);
    return this.httpClient.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRgkcYFvN0hy7HemFKxjnV3TiRzX15UE0BE5VyBetsdm87fOo1U76UsGIrNUPA-7P3eKD_n_Iqsmcrv/pub?output=csv', { responseType: 'text' }).pipe(
      map((csvData: string) => {
        const jsonData = parse(csvData, { header: true });
        const data: any[] = jsonData.data.map((row: any) => {
          return {
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
          };
        });
        localStorage.setItem('datosSheets', JSON.stringify(data));
        this.$loading.set(false);
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        this.$loading.set(false);
        return of([]);
      })
    );
  }
}
