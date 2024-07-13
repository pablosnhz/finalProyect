import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLecturaComponent } from './main-lectura/main-lectura.component';
import { LecturaCriticaRoutingRoutingModule } from './lectura-critica-routing-routing.module';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { LecturaNivelesComponent } from './lectura-niveles/lectura-niveles.component';

@NgModule({
  declarations: [
    MainLecturaComponent,
    SpinnerComponent,
    LecturaNivelesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    LecturaCriticaRoutingRoutingModule
  ]
})
export class LecturacriticaModule { }
