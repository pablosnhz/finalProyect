import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LevelsCompletedComponent } from 'src/app/shared/levels-completed/levels-completed.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, AfterViewInit{


  logout() {
    this.auth.logout();
  }
  constructor(public auth: AuthService, private cdr: ChangeDetectorRef) {}

  @ViewChild(LevelsCompletedComponent) levelsCompletedComponent!: LevelsCompletedComponent;

  @Input() levels: any[] = [];
  @Output() levelSelected = new EventEmitter<number>();

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.levelsCompletedComponent) {
      this.levelsCompletedComponent.levelStatusChanged.subscribe(() => {
        this.handleLevelStatusChanged();
      });
    }
  }

  onSelectLevel(levelIndex: number) {
    this.levelSelected.emit(levelIndex);
  }

  isLevelCompleted(levelIndex: number): boolean {
    const level = this.levels[levelIndex];
    return level && level.every((question: any) => question.answered);
  }

  handleLevelStatusChanged() {
    console.log('cambios de estado de nivel');
    this.updateLevelsStatus();
    this.cdr.detectChanges();
  }

  updateLevelsStatus() {
    this.levels = [...this.levels];
  }

  getButtonClass(levelIndex: number): string {
    return this.isLevelCompleted(levelIndex) ? 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Circle-512.png' : 'https://icones.pro/wp-content/uploads/2022/08/icone-de-cadenas-de-securite-gris.png';
  }

}
