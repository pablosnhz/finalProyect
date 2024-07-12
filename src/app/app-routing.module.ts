import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './routes/auth/pages/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProgresoComponent } from './components/main-page/progreso/progreso.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  // login
  {
    path: '',
    component: LoginPageComponent,
    loadChildren: () => import('./routes/login.module').then(m => m.LoginModule),
    pathMatch: 'full'
  },
  // Materias
  {
    path: 'materias',
    // canActivate: [AuthGuard],
    component: MainPageComponent,
  },
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
