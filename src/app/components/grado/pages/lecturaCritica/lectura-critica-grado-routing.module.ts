import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LecturaNivelesGradoComponent } from './lectura-niveles/lectura-niveles-grado.component';
import { MainLecturaGradoComponent } from './main-lectura/main-lectura-grado.component';

const routes: Routes = [
  {
    path: '',
    component: MainLecturaGradoComponent
  },
  {
    path: 'niveles',
    component: LecturaNivelesGradoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturaCriticaRoutingGradoModule { }
