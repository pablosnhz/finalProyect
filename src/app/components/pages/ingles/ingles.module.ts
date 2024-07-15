import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainInglesComponent } from './main-ingles/main-ingles.component';
import { RouterLink } from '@angular/router';
import { InglesRoutingModule } from './ingles-routing.module';

@NgModule({
  declarations: [
    MainInglesComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,

    InglesRoutingModule
  ]
})
export class InglesModule { }
