import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNaturalesGradoComponent } from './main-naturales/main-naturales-grado.component';
import { NaturalesNivelesGradoComponent } from './naturales-niveles/naturales-grado-niveles.component';

const routes: Routes = [
  {
    path: '',
    component: MainNaturalesGradoComponent
  },
  {
    path: 'niveles',
    component: NaturalesNivelesGradoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaturalesRoutingGradoModule { }
