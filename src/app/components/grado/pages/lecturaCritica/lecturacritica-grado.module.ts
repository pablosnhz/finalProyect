import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainLecturaGradoComponent } from './main-lectura/main-lectura-grado.component';
import { LecturaCriticaRoutingGradoModule } from './lectura-critica-grado-routing.module';

@NgModule({
  declarations: [
    MainLecturaGradoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    LecturaCriticaRoutingGradoModule
  ]
})
export class LecturacriticaGradoModule { }
