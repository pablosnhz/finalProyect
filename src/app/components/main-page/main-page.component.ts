import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit{

  // verlo hoy este levelselected no esta emitiendo nada
  @Output() levelSelected = new EventEmitter<number>();

  completedLevels: Set<number> = new Set<number>();

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }

  onSelectLevel(levelIndex: number) {
    this.levelSelected.emit(levelIndex);
    // this.router.navigate([], {
    this.router.navigate([], {
      queryParams: { level: levelIndex },
      queryParamsHandling: 'merge',
    });

  }

  onLevelCompleted(levelIndex: number) {
    this.completedLevels.add(levelIndex);
  }

  isLevelCompleted(levelIndex: number): boolean {
    return this.completedLevels.has(levelIndex);
  }

  getButtonClass(levelIndex: number): string {
    return this.isLevelCompleted(levelIndex)
      ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png'
      : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }

  onDataSelected(numQuestionsPorLevel: number) {
    console.log(`Número de preguntas por nivel: ${numQuestionsPorLevel}`);
    // Aquí puedes manejar los datos emitidos por el evento dataSelected
  }
}
