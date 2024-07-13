import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInglesComponent } from './main-ingles/main-ingles.component';
import { RouterLink } from '@angular/router';
import { InglesRoutingModule } from './ingles-routing.module';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { InglesNivelesComponent } from './ingles-niveles/ingles-niveles.component';

@NgModule({
  declarations: [
    MainInglesComponent,
    InglesNivelesComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterLink,

    InglesRoutingModule
  ]
})
export class InglesModule { }
