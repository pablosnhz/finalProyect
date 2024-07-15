import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSocialesComponent } from './main-sociales/main-sociales.component';
import { RouterLink } from '@angular/router';
import { SocialesRoutingModule } from './sociales-routing.module';

@NgModule({
  declarations: [
    MainSocialesComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,

    SocialesRoutingModule
  ]
})
export class SocialesModule { }
