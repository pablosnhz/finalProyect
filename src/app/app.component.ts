import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { InglesService } from './core/services/common/original/ingles.service';
import { LecturaCriticaService } from './core/services/common/original/lectura-critica.service';
import { NaturalesService } from './core/services/common/original/naturales.service';
import { SheetsDatesService } from './core/services/common/original/sheets-dates.service';
import { SocialesService } from './core/services/common/original/sociales.service';
import { SheetsDatesGradoService } from './core/services/common/grado/sheets-grado-dates.service';
import { LecturaCriticaGradoService } from './core/services/common/grado/lectura-grado-critica.service';
import { SocialesGradoService } from './core/services/common/grado/sociales-grado.service';
import { NaturalesGradoService } from './core/services/common/grado/naturales-grado.service';
import { InglesGradoService } from './core/services/common/grado/ingles-grado.service';

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
              private router: Router,

              // grado
              private sheetsDatesGradoService: SheetsDatesGradoService,
              private lecturaGradoService: LecturaCriticaGradoService,
              private socialesGradoService: SocialesGradoService,
              private naturalesGradoService: NaturalesGradoService,
              private inglesGradoService: InglesGradoService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.infoForIniciarAndGrado(event.urlAfterRedirects);
      }
    });
  }

  // con esto priorizamos que se va a cargar segun la ruta ya sea para INICIAR o GRADO
  infoForIniciarAndGrado(route: string) {
    if (route.startsWith('/materias/iniciar')) {
      this.sheetsDatesService.getSheets().subscribe();
      this.lecturaCritica.getSheets().subscribe();
      this.socialesService.getSheets().subscribe();
      this.naturalesService.getSheets().subscribe();
      this.inglesService.getSheets().subscribe();
    } else {
    if (route.startsWith('/materias/grado')) {
      this.sheetsDatesGradoService.getGradoSheets().subscribe();
      this.lecturaGradoService.getGradoSheets().subscribe();
      this.socialesGradoService.getGradoSheets().subscribe();
      this.naturalesGradoService.getGradoSheets().subscribe();
      this.inglesGradoService.getGradoSheets().subscribe();
    }
    }
  }
}
