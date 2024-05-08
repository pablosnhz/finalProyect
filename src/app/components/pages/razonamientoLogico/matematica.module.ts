import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NivelesMatematicaComponent } from './niveles-matematica/niveles-matematica.component';
import { RouterLink } from '@angular/router';
import { MatematicaComponent } from './matematica/matematica.component';



@NgModule({
  declarations: [
    NivelesMatematicaComponent,
    MatematicaComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class MatematicaModule { }
