import { Component, OnInit } from '@angular/core';
import { SheetsDatesService } from './core/services/common/sheets-dates.service';
import { LecturaCriticaService } from './core/services/common/lectura-critica.service';
import { SocialesService } from './core/services/common/sociales.service';
import { NaturalesService } from './core/services/common/naturales.service';
import { InglesService } from './core/services/common/ingles.service';
import { SwPush } from '@angular/service-worker';
import { ApiRestService } from './core/services/common/api-rest.service';
import { getMessaging, getToken } from "firebase/messaging";
import { environments } from 'src/environments/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ProyectoGenius';


  // PRUEBA de priorizar los datos al cargar la app
  constructor(private sheetsDatesService: SheetsDatesService,
              private lecturaCritica: LecturaCriticaService,
              private socialesService: SocialesService,
              private naturalesService: NaturalesService,
              private inglesService: InglesService,
              private swPush: SwPush,
              private apiRest: ApiRestService
  ) {
    // this.subscribeToNotification();
   }

  ngOnInit(): void {
    this.sheetsDatesService.getSheets().subscribe(data => {
      if (data) {
        this.sheetsDatesService.getSheets();
      }
    })

    this.lecturaCritica.getSheets().subscribe(data => {
      if (data) {
        this.lecturaCritica.getSheets();
      }
    })

    this.socialesService.getSheets().subscribe(data => {
      if (data) {
        this.socialesService.getSheets();
      }
    })

    this.naturalesService.getSheets().subscribe(data => {
      if (data) {
        this.naturalesService.getSheets();
      }
    })

    this.inglesService.getSheets().subscribe(data => {
      if (data) {
        this.inglesService.getSheets();
      }
    })

    this.requestPermission();
  }

  // public readonly VAPID_PUBLIC_KEY = "BCAQRbQDGluHEj_XYfX56exXT0kpYC7SPWPYtlN9wy4Eg5HYvS11kyMW4kdoXNFE4misceKnfjtqEomiGOkTm7c";

  // subscribeToNotification(): void {
  //   this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY }).then(sub => {
  //     const token = JSON.parse(JSON.stringify(sub));
  //     console.log( 'NUESTRO TOKEN' ,token);
  //     this.apiRest.saveToken(token).subscribe(data => {
  //       console.log('datos guardados', data);

  //     })
  //   }).catch(err => {
  //     console.log('El usuario denego las notificaciones:', err);
  //   });
  // }

  requestPermission(): void {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environments.firebaseConfig.vapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
});
  }
}
