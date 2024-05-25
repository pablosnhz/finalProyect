import { Component, OnInit } from '@angular/core';
import { SheetsDatesService } from './core/services/common/sheets-dates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ProyectoGenius';


  // PRUEBA de priorizar los datos al cargar la app
  constructor(private sheetsDatesService: SheetsDatesService) { }

  ngOnInit(): void {
    this.sheetsDatesService.getSheets().subscribe(data => {
      if (data) {
        this.sheetsDatesService.getSheets();
      }
    })
  }

}







