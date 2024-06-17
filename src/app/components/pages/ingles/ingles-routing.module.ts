import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainInglesComponent } from './main-ingles/main-ingles.component';
import { InglesNivelesComponent } from './ingles-niveles/ingles-niveles.component';

const routes: Routes = [
  {
    path: '',
    component: MainInglesComponent
  },
  {
    path: 'niveles',
    component: InglesNivelesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InglesRoutingModule { }
