import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LevelsCompletedComponent } from '../../shared/levels-completed/levels-completed.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit{

  constructor( public auth: AuthService ){}

  ngOnInit(): void {

  }

  logout(){
    this.auth.logout();
  }

  levels: any[] = [];
  currentLevelIndex: number = 0;
  @Output() levelSelected = new EventEmitter<number>();

  onSelectLevel(levelIndex: number) {
    this.levelSelected.emit(levelIndex);
  }

  isLevelCompleted(levelIndex: number): boolean {
    const level = this.levels[levelIndex];
    return level && level.every((question: any) => question.answered);
  }
}
