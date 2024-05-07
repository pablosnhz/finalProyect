import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { parse } from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class SheetsDatesService {

  constructor(private httpClient: HttpClient) {}

  getSheets(): Observable<any[]> {
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
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return [];
      })
    );
  }

}















//   getSheets(): Observable<any[]> {
//     return this.httpClient.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRgkcYFvN0hy7HemFKxjnV3TiRzX15UE0BE5VyBetsdm87fOo1U76UsGIrNUPA-7P3eKD_n_Iqsmcrv/pub?output=csv', { responseType: 'text' })
//       .pipe(
//         map((response: string) => {
//           try {
//             const rows = response.split('\n');
//             const contenido = [];
//             for (let i = 1; i < rows.length; i++) {
//               const rowData = rows[i].split(',');
//               const rowObj: any = {};
//               if (rowData.length >= 13) {
//                 rowObj.pregunta = rowData[0].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.enunciado = rowData[1].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.a = rowData[2].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.b = rowData[3].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.c = rowData[4].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.d = rowData[5].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.respuestas = rowData[6].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.explicacion = rowData[7].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.tema = rowData[8].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.contenido = rowData[9].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.imagen = rowData[10].trim().replace(/^"|"$/g, '') || '';
//                 rowObj.contenido += ', ' + rowData.slice(11).map(cell => cell.trim().replace(/^"|"$/g, '')).join(',');
//                 contenido.push(rowObj);
//               }
//             }
//             localStorage.setItem('datosSheets', JSON.stringify(contenido));
//             return contenido;
//           } catch (error) {
//             console.error('Error processing data:', error);
//             return [];
//           }
//         }),
//         catchError((error) => {
//           console.error('Error fetching data:', error);
//           return throwError(error);
//         })
//       );
//   }

// }


