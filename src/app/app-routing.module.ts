import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './routes/auth/pages/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProgresoComponent } from './components/main-page/progreso/progreso.component';
import { MatematicaComponent } from './components/pages/razonamientoLogico/matematica/matematica.component';
import { NivelesMatematicaComponent } from './components/pages/razonamientoLogico/niveles-matematica/niveles-matematica.component';
import { MainLecturaComponent } from './components/pages/lecturaCritica/main-lectura/main-lectura.component';
import { MainSocialesComponent } from './components/pages/socialesCiudadanas/main-sociales/main-sociales.component';
import { MainNaturalesComponent } from './components/pages/cienciasNaturales/main-naturales/main-naturales.component';
import { MainInglesComponent } from './components/pages/ingles/main-ingles/main-ingles.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { LecturaNivelesComponent } from './components/pages/lecturaCritica/lectura-niveles/lectura-niveles.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    loadChildren: () => import('./routes/login.module').then(m => m.LoginModule),
  },
  {
    path: 'materias',
    // canActivate: [AuthGuard],
    component: MainPageComponent,
  },
  {
    path: 'materias/matematica',
    loadChildren: () => import('./components/pages/razonamientoLogico/matematica.module').then(m => m.MatematicaModule),
  },
  // {
  //   path: 'materias/matematica',
  //   component: MatematicaComponent,
  //   loadChildren: () => import('./components/pages/razonamientoLogico/matematica.module').then(m => m.MatematicaModule),
  // },
  // {
  //   path: 'materias/matematica/niveles/:level',
  //   component: NivelesMatematicaComponent,
  // },
  // lecturacritica
  {
    path: 'materias/lecturacritica',
    component:  MainLecturaComponent,
    loadChildren: () => import('./components/pages/lecturaCritica/lecturacritica.module').then(m => m.LecturacriticaModule),
  },
  {
    path: 'materias/lecturacritica/niveleslectura',
    component: LecturaNivelesComponent,
  },
  // socualesciudadanas
  {
    path: 'materias/socialesciudadanas',
    component: MainSocialesComponent,
    loadChildren: () => import('./components/pages/socialesCiudadanas/sociales.module').then(m => m.SocialesModule),
  },
  // cienciasNaturales
  {
    path: 'materias/cienciasnaturales',
    component: MainNaturalesComponent,
    loadChildren: () => import('./components/pages/cienciasNaturales/naturales.module').then(m => m.NaturalesModule),
  },
  // ingles
  {
    path: 'materias/ingles',
    component: MainInglesComponent,
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
