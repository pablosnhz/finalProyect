import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatematicaGradoComponent } from './matematica/matematica-grado.component';
import { NivelesMatematicaGradoComponent } from './niveles-matematica/niveles-matematica-grado.component';

const routes: Routes = [
  {
    path: '',
    component: MatematicaGradoComponent,
  },
  {
    path: 'niveles',
    component: NivelesMatematicaGradoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatematicaRoutingGradoModule { }
