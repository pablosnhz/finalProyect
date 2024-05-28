import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-levels-completed',
  templateUrl: './levels-completed.component.html',
  styleUrls: ['./levels-completed.component.scss']
})
export class LevelsCompletedComponent implements OnChanges{

  @Input() levels: any[] = [];
  @Input() currentLevelIndex: number = 0;
  @Output() levelSelected = new EventEmitter<number>();
  @Output() levelStatusChanged = new EventEmitter<void>();

  onSelectLevel(levelIndex: number) {
    this.levelSelected.emit(levelIndex);
  }

  isLevelCompleted(levelIndex: number): boolean {
    this.levelStatusChanged.emit();
    const level = this.levels[levelIndex];
    return level && level.every((question: any) => question.answered);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.levels.forEach((level, index) => {
      if (this.isLevelCompleted(index)) {
        console.log(`Level ${index} is completed.`);
      }
    });
  }
}
