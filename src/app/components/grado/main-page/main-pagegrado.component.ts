import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { LevelGradoService } from 'src/app/core/services/common/grado/level-grado-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-pagegrado.component.html',
  styleUrls: ['./main-pagegrado.component.scss'],
})
export class MainPageGradoComponent implements OnInit {

  completedLevels: Set<number> = new Set<number>();
  completedLevelsLectura: Set<number> = new Set<number>();
  completedLevelsSociales: Set<number> = new Set<number>();
  completedLevelsNaturales: Set<number> = new Set<number>();
  completedLevelsIngles: Set<number> = new Set<number>();

  stateType: string | undefined;

  constructor(
    public auth: AuthService,
    private router: Router,
    private levelGradoService: LevelGradoService
  ) {}

  ngOnInit(): void {

    // oneSignal
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
      await OneSignal.init({
        appId: 'cee476c5-443f-41df-b1ac-f524d5948b65',
        notifyButton: {
          enable: true
        },
        serviceWorkerParam: { scope: '/assets/push/onesignal/' },
        serviceWorkerPath: '/assets/push/onesignal/OneSignalSDKWorker.js',
        user: { email: '', external_id: '' },
      });
    });

    const oneSignalScript = document.createElement('script');
    oneSignalScript.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
    oneSignalScript.defer = true;
    document.head.appendChild(oneSignalScript);


    this.levelGradoService.loadCompletedLevels();
    this.completedLevels = this.levelGradoService.getCompletedLevels();

    this.levelGradoService.levelCompleted$.subscribe((completedLevels) => {
      this.completedLevels = completedLevels;
    });

    // lectura
    this.levelGradoService.loadCompletedLevelsLectura();
    this.completedLevelsLectura = this.levelGradoService.getCompletedLevelsLectura();

    this.levelGradoService.levelCompletedLectura$.subscribe((completedLevels) => {
      this.completedLevelsLectura = completedLevels;
    });

    // sociales
    this.levelGradoService.loadCompletedLevelsSociales();
    this.completedLevelsSociales = this.levelGradoService.getCompletedLevelsSociales();

    this.levelGradoService.levelCompletedSociales$.subscribe((completedLevels) => {
      this.completedLevelsSociales = completedLevels;
    });

    // naturales
    this.levelGradoService.loadCompletedLevelsNaturales();
    this.completedLevelsNaturales = this.levelGradoService.getCompletedLevelsNaturales();

    this.levelGradoService.levelCompletedNaturales$.subscribe((completedLevels) => {
      this.completedLevelsNaturales = completedLevels;
    });

    // ingles
    this.levelGradoService.loadCompletedLevelsIngles();
    this.completedLevelsIngles = this.levelGradoService.getCompletedLevelsIngles();

    this.levelGradoService.levelCompletedIngles$.subscribe((completedLevels) => {
      this.completedLevelsIngles = completedLevels;
    });
  }

  logout() {
    localStorage.removeItem('origin');
    this.auth.logout({ returnTo: window.location.origin } as any);
  }

  onSelectLevel(levelIndex: number) {
    this.router.navigate([], {
      queryParams: { level: levelIndex },
      queryParamsHandling: 'merge',
    });
  }

  isLevelCompletedIngles(levelIndex: number): boolean {
    return this.completedLevelsIngles.has(levelIndex);
  }

  isLevelCompletedNaturales(levelIndex: number): boolean {
    return this.completedLevelsNaturales.has(levelIndex);
  }

  isLevelCompletedSociales(levelIndex: number): boolean {
    return this.completedLevelsSociales.has(levelIndex);
  }

  isLevelCompletedLectura(levelIndex: number): boolean {
    return this.completedLevelsLectura.has(levelIndex);
  }

  isLevelCompleted(levelIndex: number): boolean {
    return this.completedLevels.has(levelIndex);
  }


  getButtonClassNaturales(levelIndex: number): string {
    return this.isLevelCompletedNaturales(levelIndex)
      ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png'
      : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }

  getButtonClassIngles(levelIndex: number): string {
    return this.isLevelCompletedIngles(levelIndex)
      ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png'
      : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }

  getButtonClassSociales(levelIndex: number): string {
    return this.isLevelCompletedSociales(levelIndex)
      ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png'
      : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }

  getButtonClassLectura(levelIndex: number): string {
    return this.isLevelCompletedLectura(levelIndex)
      ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png'
      : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }

  getButtonClass(levelIndex: number): string {
    return this.isLevelCompleted(levelIndex)
      ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png'
      : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }
}
