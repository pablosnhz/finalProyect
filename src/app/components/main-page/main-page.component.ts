import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NivelesMatematicaComponent } from '../pages/razonamientoLogico/niveles-matematica/niveles-matematica.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit{


  @Input() levels: any[] = [];
  @Output() levelSelected = new EventEmitter<number>();

  levelStatus: boolean[] = [false, false, false, false];

  constructor(public auth: AuthService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
  }

  onSelectLevel(levelIndex: number) {
    this.levelSelected.emit(levelIndex);
  }

  isLevelCompleted(levelIndex: number): boolean {
    const level = this.levels[levelIndex];
    return level && level.every((question: any) => question.answered);
  }

  handleLevelStatusChanged() {
    console.log('Level status changed');
    this.updateLevelsStatus();
    this.cdr.detectChanges();
  }

  updateLevelsStatus() {
    this.levels = [...this.levels];
  }

  getButtonClass(levelIndex: number): string {
    return this.isLevelCompleted(levelIndex) ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png' : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }

  // Handler for the levelSelected event
  onLevelSelected(levelIndex: number) {
    this.onSelectLevel(levelIndex);
  }

  // Handler for the levelCompleted event
  onLevelCompleted(levelIndex: number) {
    this.levelStatus[levelIndex] = true;
    this.updateLevelsStatus();
  }

}
