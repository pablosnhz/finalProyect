import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLecturaComponent } from './main-lectura/main-lectura.component';
import { LecturaCriticaRoutingRoutingModule } from './lectura-critica-routing-routing.module';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@NgModule({
  declarations: [
    MainLecturaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    LecturaCriticaRoutingRoutingModule
  ]
})
export class LecturacriticaModule { }
