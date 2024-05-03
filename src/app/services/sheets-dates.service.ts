import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetsDatesService {

  constructor(private httpClient: HttpClient) {}

  getSheets(): Observable<any[]> {
    return this.httpClient.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRgkcYFvN0hy7HemFKxjnV3TiRzX15UE0BE5VyBetsdm87fOo1U76UsGIrNUPA-7P3eKD_n_Iqsmcrv/pub?output=csv', { responseType: 'text' })
      .pipe(
        map((response: string) => {
          try {
            const contenido = response.split(/\r?\n/).slice(1).map((row) => {
              const values = [];
              let current = '';
              let insideQuotes = false;
              for (let i = 0; i < row.length; i++) {
                const char = row[i];
                if (char === '"') {
                  insideQuotes = !insideQuotes;
                } else if (char === ',' && !insideQuotes) {
                  values.push(current.trim());
                  current = '';
                } else {
                  current += char;
                }
              }
              values.push(current.trim());
              const [pregunta = '', enunciado = '', opcion_a = '', opcion_b = '', opcion_c = '', opcion_d = '', respuestas = '', explicacion = '', tema_relacionado_con_la_respuesta = '', contenido = '', imagen = ''] = values.map((value) => value.replace(/^"(.*)"$/, '$1').trim());
              return { pregunta, enunciado, opcion_a, opcion_b, opcion_c, opcion_d, respuestas, explicacion, tema_relacionado_con_la_respuesta, contenido, imagen };
            });
            localStorage.setItem('datosSheets', JSON.stringify(contenido));
            return contenido.filter(row => row.pregunta);
          } catch (error) {
            console.error('Error processing data:', error);
            return [];
          }
        }),
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError(error);
        })
      );
  }
}




