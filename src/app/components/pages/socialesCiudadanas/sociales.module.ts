import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainSocialesComponent } from './main-sociales/main-sociales.component';
import { RouterLink } from '@angular/router';
import { SocialesRoutingModule } from './sociales-routing.module';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { SocialesNivelesComponent } from './sociales-niveles/sociales-niveles.component';

@NgModule({
  declarations: [
    MainSocialesComponent,
    SpinnerComponent,
    SocialesNivelesComponent
  ],
  imports: [
    CommonModule,
    RouterLink,

    SocialesRoutingModule
  ]
})
export class SocialesModule { }
