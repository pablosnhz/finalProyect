import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-levels-completed',
  templateUrl: './levels-completed.component.html',
  styleUrls: ['./levels-completed.component.scss']
})
export class LevelsCompletedComponent {

  @Input() levels: any[] = [];
  @Input() currentLevelIndex: number = 0;
  @Output() levelSelected = new EventEmitter<number>();

  onSelectLevel(levelIndex: number) {
    this.levelSelected.emit(levelIndex);
  }

  isLevelCompleted(levelIndex: number): boolean {
    const level = this.levels[levelIndex];
    return level && level.every((question: any) => question.answered);
  }

}
