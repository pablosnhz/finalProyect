import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNaturalesComponent } from './main-naturales/main-naturales.component';
import { RouterLink } from '@angular/router';
import { NaturalesRoutingModule } from './naturales-routing.module';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { NaturalesNivelesComponent } from './naturales-niveles/naturales-niveles.component';

@NgModule({
  declarations: [
    MainNaturalesComponent,
    SpinnerComponent,
    NaturalesNivelesComponent
  ],
  imports: [
    CommonModule,
    RouterLink,

    NaturalesRoutingModule
  ]
})
export class NaturalesModule { }
