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
            const rows = response.split('\n');
            const contenido = [];
            for (let i = 1; i < rows.length; i++) {
              const rowData = rows[i].split(',').map(cell => cell.trim().replace(/^\"|\"$/g, ''));
              const rowObj: any = {};
              if (rowData.length >= 13) {
                rowObj.pregunta = rowData[0] || '';
                rowObj.enunciado = rowData[1] || '';
                rowObj.a = rowData[2] || '';
                rowObj.b = rowData[3] || '';
                rowObj.c = rowData[4] || '';
                rowObj.d = rowData[5] || '';
                rowObj.respuestas = rowData[6] ? rowData[6].replace(/^\"|\"$/g, '') : '';
                rowObj.explicacion = rowData[7] || '';
                rowObj.tema = rowData[8] || '';
                rowObj.contenido = rowData[9] || '';
                rowObj.imagen = rowData[10] || '';


                rowObj.contenido += ', ' + rowData.slice(11, -1).join(',').replace(/^\"|\"$/g, '');

                contenido.push(rowObj);
              }
            }
            localStorage.setItem('datosSheets', JSON.stringify(contenido));
            return contenido;
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


