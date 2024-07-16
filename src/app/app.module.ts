import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';



// Auth0
import { provideAuth0 } from '@auth0/auth0-angular';

import { MainPageComponent } from './components/original/main-page/main-page.component';
import { ProgresoComponent } from './components/original/main-page/progreso/progreso.component';
import { NaturalesNivelesComponent } from './components/original/pages/cienciasNaturales/naturales-niveles/naturales-niveles.component';
import { InglesNivelesComponent } from './components/original/pages/ingles/ingles-niveles/ingles-niveles.component';
import { LecturaNivelesComponent } from './components/original/pages/lecturaCritica/lectura-niveles/lectura-niveles.component';
import { NivelesMatematicaComponent } from './components/original/pages/razonamientoLogico/niveles-matematica/niveles-matematica.component';
import { SocialesNivelesComponent } from './components/original/pages/socialesCiudadanas/sociales-niveles/sociales-niveles.component';

import { ProgresoGradoComponent } from './components/grado/main-page/progreso/progresogrado.component';
import { MainPageGradoComponent } from './components/grado/main-page/main-pagegrado.component';
import { NaturalesNivelesGradoComponent } from './components/grado/pages/cienciasNaturales/naturales-niveles/naturales-grado-niveles.component';
import { InglesNivelesGradoComponent } from './components/grado/pages/ingles/ingles-niveles/ingles-niveles-grado.component';
import { LecturaNivelesGradoComponent } from './components/grado/pages/lecturaCritica/lectura-niveles/lectura-niveles-grado.component';
import { NivelesMatematicaGradoComponent } from './components/grado/pages/razonamientoLogico/niveles-matematica/niveles-matematica-grado.component';
import { SocialesNivelesGradoComponent } from './components/grado/pages/socialesCiudadanas/sociales-niveles/sociales-niveles-grado.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,

    // Original
    MainPageComponent,
    SpinnerComponent,

    ProgresoComponent,

    NivelesMatematicaComponent,
    LecturaNivelesComponent,
    SocialesNivelesComponent,
    NaturalesNivelesComponent,
    InglesNivelesComponent,

    // Grado
    MainPageGradoComponent,

    ProgresoGradoComponent,

    NaturalesNivelesGradoComponent,
    InglesNivelesGradoComponent,
    LecturaNivelesGradoComponent,
    NivelesMatematicaGradoComponent,
    SocialesNivelesGradoComponent
  ],
imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideAuth0({
      domain: 'dev-mfuhxwtsa6qnfcwb.us.auth0.com',
      clientId: 'gzAhbZn4ROfbNUkM90ykh6cxgibKVVhW',
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: "http://localhost:4200/",
      },
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
