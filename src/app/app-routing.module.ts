import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './routes/auth/pages/login-page/login-page.component';

import { MainPageComponent } from './components/original/main-page/main-page.component';
import { ProgresoComponent } from './components/original/main-page/progreso/progreso.component';

import { MainPageGradoComponent } from './components/grado/main-page/main-pagegrado.component';
import { ProgresoGradoComponent } from './components/grado/main-page/progreso/progresogrado.component';

import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  // login
  {
    path: '',
    component: LoginPageComponent,
    loadChildren: () => import('./routes/login.module').then(m => m.LoginModule),
    pathMatch: 'full'
  },
  // Materias para "iniciar"
  {
    path: 'materias/iniciar',
    canActivate: [AuthGuard],
    component: MainPageComponent,
  },
  {
    path: 'materias/iniciar/matematica',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/original/pages/razonamientoLogico/matematica.module').then(m => m.MatematicaModule),
  },
  {
    path: 'materias/iniciar/lecturacritica',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/original/pages/lecturaCritica/lecturacritica.module').then(m => m.LecturacriticaModule),
  },
  {
    path: 'materias/iniciar/socialesciudadanas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/original/pages/socialesCiudadanas/sociales.module').then(m => m.SocialesModule),
  },
  {
    path: 'materias/iniciar/cienciasnaturales',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/original/pages/cienciasNaturales/naturales.module').then(m => m.NaturalesModule),
  },
  {
    path: 'materias/iniciar/ingles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/original/pages/ingles/ingles.module').then(m => m.InglesModule),
  },
  {
    path: 'materias/iniciar/progreso',
    canActivate: [AuthGuard],
    component: ProgresoComponent
  },
  // Materias para "grado"
  {
    path: 'materias/grado',
    canActivate: [AuthGuard],
    component: MainPageGradoComponent,
  },
  {
    path: 'materias/grado/matematica',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/grado/pages/razonamientoLogico/matematica-grado.module').then(m => m.MatematicaGradoModule),
  },
  {
    path: 'materias/grado/lecturacritica',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/grado/pages/lecturaCritica/lecturacritica-grado.module').then(m => m.LecturacriticaGradoModule),
  },
  {
    path: 'materias/grado/socialesciudadanas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/grado/pages/socialesCiudadanas/sociales-grado.module').then(m => m.SocialesGradoModule),
  },
  {
    path: 'materias/grado/cienciasnaturales',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/grado/pages/cienciasNaturales/naturales-grado.module').then(m => m.NaturalesGradoModule),
  },
  {
    path: 'materias/grado/ingles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/grado/pages/ingles/ingles-grado.module').then(m => m.InglesGradoModule),
  },
  {
    path: 'materias/grado/progreso',
    canActivate: [AuthGuard],
    component: ProgresoGradoComponent
  },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
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
