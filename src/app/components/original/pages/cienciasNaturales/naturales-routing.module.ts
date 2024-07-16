import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNaturalesComponent } from './main-naturales/main-naturales.component';
import { NaturalesNivelesComponent } from './naturales-niveles/naturales-niveles.component';

const routes: Routes = [
  {
    path: '',
    component: MainNaturalesComponent
  },
  {
    path: 'niveles',
    component: NaturalesNivelesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NaturalesRoutingModule { }
