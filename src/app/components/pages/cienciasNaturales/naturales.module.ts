import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNaturalesComponent } from './main-naturales/main-naturales.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    MainNaturalesComponent,
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class NaturalesModule { }
