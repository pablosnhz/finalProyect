import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatematicaGradoComponent } from './matematica/matematica-grado.component';
import { MatematicaRoutingGradoModule } from './matematica-grado-routing.module';

@NgModule({
  declarations: [
    MatematicaGradoComponent,
    // NivelesMatematicaComponent,
    // SpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatematicaRoutingGradoModule
  ]
})
export class MatematicaGradoModule { }
