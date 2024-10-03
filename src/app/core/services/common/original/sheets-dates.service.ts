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
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3vsx98YlycYcGdGGC7IRB_oLsdhA-Rs0_Ddzva1gPEdCZE_4TXrQyjwnHdsCWjyR3yH3XPx8Ridj7/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vTG_dHyPIonq4NbAb-90lG2ZU8Lell6KQp0K3nP8iI-eDMOYYzJXDGtCR59tobhYH53ack8lemkJAUn/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7vFE0Rh5YegvRLo2LWSGl_c_5YGaBofdwsirwxFZ1Ncnagxo64xLYfBafujOrvnIwQue4gLwcYQVI/pub?output=csv',
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRUqlQILdp0F2w8s5R5ZW_WHEj9FBuX_Okj6LC7W7p7G69t4WT-iHlutIs31oAmtZ3YmXWoERhCbroR/pub?output=csv'
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
