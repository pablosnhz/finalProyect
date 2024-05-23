import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NivelesMatematicaComponent } from './niveles-matematica/niveles-matematica.component';
import { RouterLink } from '@angular/router';
import { MatematicaComponent } from './matematica/matematica.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@NgModule({
  declarations: [
    NivelesMatematicaComponent,
    MatematicaComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
  ],
})
export class MatematicaModule { }
