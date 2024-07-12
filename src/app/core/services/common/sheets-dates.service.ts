import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { parse } from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class SheetsDatesService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  private sheetUrls: string[] = [
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5LHiwGH4-GJieOkoQNklYzpdenDE_Nb42Wd0E9llNeb-2BK3V4H3BE8Ij2nsnDjxGLmOvjfMNnCYH/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vR3EyKqk2MQ-29mW12eWFQwYdQ6xMlOSCRUJh1ScipphCx4cVqdGkilJopyjkFUyrAOf1ywIvr9_jXP/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRQwQT8Hoq-mc89sxdGAld0LwWc8MpU9EC4WkdJ2bT7bqEE3KwgyMMNzN1FBvdYR4kl7sF4lXZ_d6G_/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vSg7svl1plaObJgUhyygkgpw9o5C_KlPabXXFm5kQosuwMLnqLMY6VyZQ06qenU6hG_BDQjVDtSq7Vk/pub?output=csv'
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
        localStorage.setItem('razonamientoSheets', JSON.stringify(allData));
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
