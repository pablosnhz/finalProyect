import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainNaturalesGradoComponent } from './main-naturales/main-naturales-grado.component';
import { NaturalesRoutingGradoModule } from './naturales-grado-routing.module';

@NgModule({
  declarations: [
    MainNaturalesGradoComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,

    NaturalesRoutingGradoModule
  ]
})
export class NaturalesGradoModule { }
