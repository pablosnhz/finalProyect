import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLecturaComponent } from './main-lectura/main-lectura.component';
import { LecturaNivelesComponent } from './lectura-niveles/lectura-niveles.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    MainLecturaComponent,
    LecturaNivelesComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class LecturacriticaModule { }
