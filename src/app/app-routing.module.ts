import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './routes/auth/pages/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProgresoComponent } from './components/main-page/progreso/progreso.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { LecturaNivelesComponent } from './components/pages/lecturaCritica/lectura-niveles/lectura-niveles.component';
import { NivelesMatematicaComponent } from './components/pages/razonamientoLogico/niveles-matematica/niveles-matematica.component';
import { SocialesNivelesComponent } from './components/pages/socialesCiudadanas/sociales-niveles/sociales-niveles.component';
import { NaturalesNivelesComponent } from './components/pages/cienciasNaturales/naturales-niveles/naturales-niveles.component';
import { InglesNivelesComponent } from './components/pages/ingles/ingles-niveles/ingles-niveles.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    loadChildren: () => import('./routes/login.module').then(m => m.LoginModule),
  },
  // Materias
  {
    path: 'materias',
    // canActivate: [AuthGuard],
    component: MainPageComponent,
  },
  // { path: 'materias/matematica/niveles', component: NivelesMatematicaComponent },
  // { path: 'materias/lecturacritica/niveles', component: LecturaNivelesComponent },
  // { path: 'materias/socialesciudadanas/niveles', component: SocialesNivelesComponent },
  // { path: 'materias/cienciasnaturales/niveles', component: NaturalesNivelesComponent },
  // { path: 'materias/ingles/niveles', component: InglesNivelesComponent },

  // razonamiento logico
  {
    path: 'materias/matematica',
    loadChildren: () => import('./components/pages/razonamientoLogico/matematica.module').then(m => m.MatematicaModule),
  },
  // lecturacritica
  {
    path: 'materias/lecturacritica',
    loadChildren: () => import('./components/pages/lecturaCritica/lecturacritica.module').then(m => m.LecturacriticaModule),
  },
  // socualesciudadanas
  {
    path: 'materias/socialesciudadanas',
    loadChildren: () => import('./components/pages/socialesCiudadanas/sociales.module').then(m => m.SocialesModule),
  },
  // cienciasNaturales
  {
    path: 'materias/cienciasnaturales',
    loadChildren: () => import('./components/pages/cienciasNaturales/naturales.module').then(m => m.NaturalesModule),
  },
  // ingles
  {
    path: 'materias/ingles',
    loadChildren: () => import('./components/pages/ingles/ingles.module').then(m => m.InglesModule),
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'progreso',
    component: ProgresoComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
