import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLecturaComponent } from './main-lectura/main-lectura.component';
import { LecturaNivelesComponent } from './lectura-niveles/lectura-niveles.component';

const routes: Routes = [
  {
    path: '',
    component: MainLecturaComponent
  },
  {
    path: 'niveles',
    component: LecturaNivelesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LecturaCriticaRoutingRoutingModule { }
