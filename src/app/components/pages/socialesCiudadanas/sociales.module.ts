import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSocialesComponent } from './main-sociales/main-sociales.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    MainSocialesComponent,
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class SocialesModule { }
