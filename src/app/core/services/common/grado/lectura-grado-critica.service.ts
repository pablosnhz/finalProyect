import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturaCriticaGradoService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTlC-yTmjkiZMtHS-9lIlcQM4Lkp4HZ-BpYFplBa8kktoGFj0NRETIOEF7C4-NRbrpcULjj_WJoa2UL/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSmXOmC_9f6rr07in1hawpSqDrDS-vdBLGTyKwm0RhfYfN76FOfUI6_BJNga1S7gc5Charin_xgZyEK/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQAWFbpeEVFUTNnibJcYa-RNGcetffIEiyv7s2JqFgqs6Z77b4mIWbm0Nj2xDkZ1iT0ccLf4JgD_arq/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQTnPkAfcbSBgLjUYJwPl7nHENz2kogNOs9ersDNL7AsQlz13dBnYnAsSPztYN6BxeT2GI0BH828_Ze/pub?output=csv'
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
        localStorage.setItem('lecturaCriticaGradoSheets', JSON.stringify(allData));
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
