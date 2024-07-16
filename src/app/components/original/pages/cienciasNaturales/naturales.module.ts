import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainNaturalesComponent } from './main-naturales/main-naturales.component';
import { RouterLink } from '@angular/router';
import { NaturalesRoutingModule } from './naturales-routing.module';

@NgModule({
  declarations: [
    MainNaturalesComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,

    NaturalesRoutingModule
  ]
})
export class NaturalesModule { }
