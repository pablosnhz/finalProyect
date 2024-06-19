import { Component, OnInit } from '@angular/core';
import { SheetsDatesService } from './core/services/common/sheets-dates.service';
import { LecturaCriticaService } from './core/services/common/lectura-critica.service';
import { SocialesService } from './core/services/common/sociales.service';
import { NaturalesService } from './core/services/common/naturales.service';
import { InglesService } from './core/services/common/ingles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ProyectoGenius';


  // PRUEBA de priorizar los datos al cargar la app
  constructor(private sheetsDatesService: SheetsDatesService,
              private lecturaCritica: LecturaCriticaService,
              private socialesService: SocialesService,
              private naturalesService: NaturalesService,
              private inglesService: InglesService
  ) { }

  ngOnInit(): void {
    this.sheetsDatesService.getSheets().subscribe(data => {
      if (data) {
        this.sheetsDatesService.getSheets();
      }
    })

    this.lecturaCritica.getSheets().subscribe(data => {
      if (data) {
        this.lecturaCritica.getSheets();
      }
    })

    this.socialesService.getSheets().subscribe(data => {
      if (data) {
        this.socialesService.getSheets();
      }
    })

    this.naturalesService.getSheets().subscribe(data => {
      if (data) {
        this.naturalesService.getSheets();
      }
    })

    this.inglesService.getSheets().subscribe(data => {
      if (data) {
        this.inglesService.getSheets();
      }
    })
  }


}







