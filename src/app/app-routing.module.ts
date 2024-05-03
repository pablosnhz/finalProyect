import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginPageComponent } from './routes/auth/pages/login-page/login-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NivelesMatematicaComponent } from './components/pages/niveles-matematica/niveles-matematica.component';
import { MatematicaComponent } from './components/pages/matematica/matematica.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
    loadChildren: () => import('./routes/login.module').then(m => m.LoginModule),
  },
  {
    path: 'materias',
    component: MainPageComponent,
  },
  {
    path: 'materias/matematica',
    component: MatematicaComponent,
    loadChildren: () => import('./components/pages/matematica.module').then(m => m.MatematicaModule),
  },
  {
    path: 'materias/matematica/niveles',
    component: NivelesMatematicaComponent,
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
