import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainSocialesGradoComponent } from './main-sociales/main-sociales-grado.component';
import { SocialesRoutingGradoModule } from './sociales-grado-routing.module';

@NgModule({
  declarations: [
    MainSocialesGradoComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,

    SocialesRoutingGradoModule
  ]
})
export class SocialesGradoModule { }
