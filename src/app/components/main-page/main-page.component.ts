import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit{


  @Input() levels: any[] = [];
  @Output() levelSelected = new EventEmitter<number>();

  nivelesCompletados: number[] = [];
  levelStatus: boolean[] = [false, false, false, false];
  completedLevels: Set<number> = new Set<number>();

  constructor(public auth: AuthService, private cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

  onSelectLevel(levelIndex: number) {
    this.levelSelected.emit(levelIndex);
  }

  handleLevelStatusChanged() {
    console.log('Level status changed');
    this.updateLevelsStatus();
    this.cdr.detectChanges();
  }

  onLevelCompleted(levelIndex: number) {
    this.completedLevels.add(levelIndex);
  }

  isLevelCompleted(levelIndex: number): boolean {
    return this.completedLevels.has(levelIndex);
  }

  updateLevelsStatus() {
    this.levels = [...this.levels];
  }

  getButtonClass(levelIndex: number): string {
    return this.isLevelCompleted(levelIndex) ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png' : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }




}
