import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MainPageComponent } from './components/main-page/main-page.component';

// Auth0
import { provideAuth0 } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainPageComponent,
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
        // redirect_uri: "https://makete.netlify.app/materias",
        redirect_uri: "http://localhost:4200/",
        // redirect_uri: window.location.origin

      },
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
