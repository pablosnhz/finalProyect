import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatematicaComponent } from './matematica/matematica.component';
import { NivelesMatematicaComponent } from './niveles-matematica/niveles-matematica.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { MatematicaRoutingModule } from './matematica-routing.module';
import { LevelsCompletedComponent } from 'src/app/shared/levels-completed/levels-completed.component';

@NgModule({
  declarations: [
    MatematicaComponent,
    NivelesMatematicaComponent,
    SpinnerComponent,
    LevelsCompletedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatematicaRoutingModule
  ]
})
export class MatematicaModule { }
