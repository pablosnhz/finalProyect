import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSocialesComponent } from './main-sociales/main-sociales.component';
import { SocialesNivelesComponent } from './sociales-niveles/sociales-niveles.component';

const routes: Routes = [
  {
    path: '',
    component: MainSocialesComponent,
  },
  {
    path: 'niveles',
    component: SocialesNivelesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialesRoutingModule { }
