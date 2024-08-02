import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of, forkJoin, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturaCriticaService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQbcJaD5iUWVXfHOx9VZkKrFAdz_7puxUJtC1j-qpx3aZFeIPu_FU_tzXNbsr4dnTX4s_bjANjL0Te1/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRbvZSwjWetX3hOcnqgX7ui27OnTxV7qpc-csOspmXD_iKVcBy5xTc6u_us4aWaiRPD5ofLqxgUfd7e/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTbtd4cg5BAxxLu0tgPMs54NBfsLIr-QM5uh0pbOvItkN8k64AucC1YCngDwCAov0WpSSD9QOw5odJo/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSfc0sopM0dlTxAg2cVirlTVEqAIR1kMnECnP8viVmxXaMHWwn2pmSx6sqpPE-ycyeglFsFCQfIODGw/pub?output=csv'
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
        localStorage.setItem('lecturaCriticaSheets', JSON.stringify(allData));
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
