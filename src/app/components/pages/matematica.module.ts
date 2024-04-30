import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatematicasComponent } from './matematicas/matematicas.component';
import { NivelesMatematicaComponent } from './niveles-matematica/niveles-matematica.component';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    MatematicasComponent,
    NivelesMatematicaComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class MatematicaModule { }
