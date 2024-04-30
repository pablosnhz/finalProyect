import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetsDatesService {

  constructor(private httpClient: HttpClient) {}

  getSheets(): Observable<any[]> {
    return this.httpClient.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRgkcYFvN0hy7HemFKxjnV3TiRzX15UE0BE5VyBetsdm87fOo1U76UsGIrNUPA-7P3eKD_n_Iqsmcrv/pub?output=csv', { responseType: 'text' })
      .pipe(
        map((response: string) => {
          const contenido = response.split(/\r?\n/).slice(1).map((row) => {
            const values = row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
            const [pregunta, enunciado, opcion_a, opcion_b, opcion_c, opcion_d, respuestas, explicacion, tema_relacionado_con_la_respuesta, grafico_e_imagen] = values.map((value) => value.replace(/^"(.*)"$/, '$1').trim());
            return { pregunta, enunciado, opcion_a, opcion_b, opcion_c, opcion_d, respuestas, explicacion, tema_relacionado_con_la_respuesta, grafico_e_imagen };
          });
          localStorage.setItem('datosSheets', JSON.stringify(contenido));
          return contenido;
        }),
        catchError((error) => {
          console.error('Error fetching dates:', error);
          return throwError(error);
        })
      );
  }
}





