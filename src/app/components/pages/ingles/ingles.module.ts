import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInglesComponent } from './main-ingles/main-ingles.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    MainInglesComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class InglesModule { }
