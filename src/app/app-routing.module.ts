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
  // Materias para "iniciar"
  {
    path: 'materias/iniciar',
    // canActivate: [AuthGuard],
    component: MainPageComponent,
  },
  {
    path: 'materias/iniciar/matematica',
    loadChildren: () => import('./components/pages/razonamientoLogico/matematica.module').then(m => m.MatematicaModule),
  },
  {
    path: 'materias/iniciar/lecturacritica',
    loadChildren: () => import('./components/pages/lecturaCritica/lecturacritica.module').then(m => m.LecturacriticaModule),
  },
  {
    path: 'materias/iniciar/socialesciudadanas',
    loadChildren: () => import('./components/pages/socialesCiudadanas/sociales.module').then(m => m.SocialesModule),
  },
  {
    path: 'materias/iniciar/cienciasnaturales',
    loadChildren: () => import('./components/pages/cienciasNaturales/naturales.module').then(m => m.NaturalesModule),
  },
  {
    path: 'materias/iniciar/ingles',
    loadChildren: () => import('./components/pages/ingles/ingles.module').then(m => m.InglesModule),
  },
  {
    path: 'materias/iniciar/progreso',
    component: ProgresoComponent
  },
  // Materias para "grado"
  {
    path: 'materias/grado',
    // canActivate: [AuthGuard],
    component: MainPageComponent,
  },
  {
    path: 'materias/grado/matematica',
    loadChildren: () => import('./components/pages/razonamientoLogico/matematica.module').then(m => m.MatematicaModule),
  },
  {
    path: 'materias/grado/lecturacritica',
    loadChildren: () => import('./components/pages/lecturaCritica/lecturacritica.module').then(m => m.LecturacriticaModule),
  },
  {
    path: 'materias/grado/socialesciudadanas',
    loadChildren: () => import('./components/pages/socialesCiudadanas/sociales.module').then(m => m.SocialesModule),
  },
  {
    path: 'materias/grado/cienciasnaturales',
    loadChildren: () => import('./components/pages/cienciasNaturales/naturales.module').then(m => m.NaturalesModule),
  },
  {
    path: 'materias/grado/ingles',
    loadChildren: () => import('./components/pages/ingles/ingles.module').then(m => m.InglesModule),
  },
  {
    path: 'materias/grado/progreso',
    component: ProgresoComponent
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









// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './components/home/home.component';
// import { LoginPageComponent } from './routes/auth/pages/login-page/login-page.component';
// import { MainPageComponent } from './components/main-page/main-page.component';
// import { ProgresoComponent } from './components/main-page/progreso/progreso.component';
// import { AuthGuard } from '@auth0/auth0-angular';

// const routes: Routes = [
//   // login
//   {
//     path: '',
//     component: LoginPageComponent,
//     loadChildren: () => import('./routes/login.module').then(m => m.LoginModule),
//     pathMatch: 'full'
//   },
//   // Materias
//   {
//     path: 'materias',
//     // canActivate: [AuthGuard],
//     component: MainPageComponent,
//   },
//   // razonamiento logico
//   {
//     path: 'materias/matematica',
//     loadChildren: () => import('./components/pages/razonamientoLogico/matematica.module').then(m => m.MatematicaModule),
//   },
//   // lecturacritica
//   {
//     path: 'materias/lecturacritica',
//     loadChildren: () => import('./components/pages/lecturaCritica/lecturacritica.module').then(m => m.LecturacriticaModule),
//   },
//   // socualesciudadanas
//   {
//     path: 'materias/socialesciudadanas',
//     loadChildren: () => import('./components/pages/socialesCiudadanas/sociales.module').then(m => m.SocialesModule),
//   },
//   // cienciasNaturales
//   {
//     path: 'materias/cienciasnaturales',
//     loadChildren: () => import('./components/pages/cienciasNaturales/naturales.module').then(m => m.NaturalesModule),
//   },
//   // ingles
//   {
//     path: 'materias/ingles',
//     loadChildren: () => import('./components/pages/ingles/ingles.module').then(m => m.InglesModule),
//   },
//   {
//     path: 'home',
//     pathMatch: 'full',
//     component: HomeComponent,
//   },
//   {
//     path: 'progreso',
//     component: ProgresoComponent
//   },
//   {
//     path: '**',
//     redirectTo: '',
//   }
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
