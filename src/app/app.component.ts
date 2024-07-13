import { Component, OnInit } from '@angular/core';
import { SheetsDatesService } from './core/services/common/sheets-dates.service';
import { LecturaCriticaService } from './core/services/common/lectura-critica.service';
import { SocialesService } from './core/services/common/sociales.service';
import { NaturalesService } from './core/services/common/naturales.service';
import { InglesService } from './core/services/common/ingles.service';
import { NavigationEnd, Router } from '@angular/router';

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
              private inglesService: InglesService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.infoForIniciarandGrado(event.urlAfterRedirects);
      }
    });
  }

  // con esto priorizamos que se va a cargar segun la ruta ya sea para INICIAR o GRADO
  infoForIniciarandGrado(route: string) {
    if (route.startsWith('/materias/iniciar')) {
      this.sheetsDatesService.getSheets().subscribe();
      this.lecturaCritica.getSheets().subscribe();
      this.socialesService.getSheets().subscribe();
      this.naturalesService.getSheets().subscribe();
      this.inglesService.getSheets().subscribe();
    } else {
      if (route.startsWith('/materias/grado')) {
        this.sheetsDatesService.getSheets().subscribe();
        this.lecturaCritica.getSheets().subscribe();
        this.socialesService.getSheets().subscribe();
        this.naturalesService.getSheets().subscribe();
        this.inglesService.getSheets().subscribe();
      }
    }
  }
}
