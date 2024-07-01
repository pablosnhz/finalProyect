import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProgresoComponent } from './components/main-page/progreso/progreso.component';

// Auth0
import { provideAuth0 } from '@auth0/auth0-angular';
import { NivelesMatematicaComponent } from './components/pages/razonamientoLogico/niveles-matematica/niveles-matematica.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LecturaNivelesComponent } from './components/pages/lecturaCritica/lectura-niveles/lectura-niveles.component';
import { SocialesNivelesComponent } from './components/pages/socialesCiudadanas/sociales-niveles/sociales-niveles.component';
import { NaturalesNivelesComponent } from './components/pages/cienciasNaturales/naturales-niveles/naturales-niveles.component';
import { InglesNivelesComponent } from './components/pages/ingles/ingles-niveles/ingles-niveles.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    MainPageComponent,
    ProgresoComponent,
    SpinnerComponent,

    NivelesMatematicaComponent,
    LecturaNivelesComponent,
    SocialesNivelesComponent,
    NaturalesNivelesComponent,
    InglesNivelesComponent
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
      domain: 'dev-dyyp1d0unr027i6u.us.auth0.com',
      clientId: 'BivuSrxGygi0ctlzcBxQvvRYfTweDpPW',
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: "http://localhost:4200",
        // redirect_uri: window.location.origin

      },
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
