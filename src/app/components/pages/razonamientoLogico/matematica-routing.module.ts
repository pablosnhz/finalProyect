import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NivelesMatematicaComponent } from './niveles-matematica/niveles-matematica.component';
import { MatematicaComponent } from './matematica/matematica.component';

const routes: Routes = [
  {
    path: '',
    component: MatematicaComponent,
  },
  {
    path: 'niveles/:nivel',
    component: NivelesMatematicaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatematicaRoutingModule { }
