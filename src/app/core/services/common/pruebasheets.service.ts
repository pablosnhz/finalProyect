import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebasheetsService {

  constructor(private httpClient: HttpClient) {}

  getMilquestions(): Observable<any[]> {
    return this.httpClient.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vScPVmsfeVLxIe3mf5JTQTjdwi-uC2pOTTYHdIHVQOwKL8Q1ufCskJhKXJLVX8Li9Dk78sB9wggmDJV/pub?output=csv', { responseType: 'text' }).pipe(
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
        localStorage.setItem('milpreguntas', JSON.stringify(data));
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of([]);
      })
    );
  }


  getMilquestionsDos(): Observable<any[]> {
    return this.httpClient.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ37ySe4Qb_jmzhrvFSn90P26ixI8Aum_FWhMyMsMuD2eH-bSBqHXJ4LMwYWS3__seqYoXmmFQB9DVb/pub?output=csv', { responseType: 'text' }).pipe(
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
        localStorage.setItem('dosmilpreguntas', JSON.stringify(data));
        return data;
      }),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return of([]);
      })
    );
  }
}
