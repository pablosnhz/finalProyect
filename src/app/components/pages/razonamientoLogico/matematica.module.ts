import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatematicaComponent } from './matematica/matematica.component';
import { FormsModule } from '@angular/forms';
import { MatematicaRoutingModule } from './matematica-routing.module';

@NgModule({
  declarations: [
    MatematicaComponent,
    // NivelesMatematicaComponent,
    // SpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatematicaRoutingModule
  ]
})
export class MatematicaModule { }
