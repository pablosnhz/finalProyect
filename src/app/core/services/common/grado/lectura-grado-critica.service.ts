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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPhABJzSW64wpmACuEXf7XnqIpHoY1fuooyCpVggyzaykZBJzZxKOLXam8Tt4ozYak_ddZHzhAv0uT/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZyLz_66DSinPGrGW-Z-92ewPPsZsLXj4KKhR2RneEZsMum2xVjGgCnywIMCK3jYr9EEKR3ycTs-rV/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSN7SHRzRZbxM0XCAUTixektwFEJzXDhMIp2oDO2M29z89Bf8c6aEM6iqrUCzZWxBAKIAN4UMTeyUsH/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQF8JBwDmPNJhnnfTJ7_B3MkZjFzwRNORGioGFsI5IOE_nYHqyQiwHW6JiMD4CFrRI0kB652EnKHNdI/pub?output=csv'
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
