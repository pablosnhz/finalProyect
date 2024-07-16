import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainInglesGradoComponent } from './main-ingles/main-ingles-grado.component';
import { InglesRoutingGradoModule } from './ingles-grado-routing.module';

@NgModule({
  declarations: [
    MainInglesGradoComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,

    InglesRoutingGradoModule
  ]
})
export class InglesGradoModule { }
