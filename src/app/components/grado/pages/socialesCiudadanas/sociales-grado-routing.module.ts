import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SocialesNivelesGradoComponent } from './sociales-niveles/sociales-niveles-grado.component';
import { MainSocialesGradoComponent } from './main-sociales/main-sociales-grado.component';

const routes: Routes = [
  {
    path: '',
    component: MainSocialesGradoComponent,
  },
  {
    path: 'niveles',
    component: SocialesNivelesGradoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialesRoutingGradoModule { }
