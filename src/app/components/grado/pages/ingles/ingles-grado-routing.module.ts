import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInglesGradoComponent } from './main-ingles/main-ingles-grado.component';
import { InglesNivelesGradoComponent } from './ingles-niveles/ingles-niveles-grado.component';

const routes: Routes = [
  {
    path: '',
    component: MainInglesGradoComponent
  },
  {
    path: 'niveles',
    component: InglesNivelesGradoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InglesRoutingGradoModule { }
