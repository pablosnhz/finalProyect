import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private completedLevels = new Set<number>();
  private completedLevelsSubject = new BehaviorSubject<Set<number>>(this.completedLevels);

  levelCompleted$ = this.completedLevelsSubject.asObservable();

  levelCompletedService(levelIndex: number): void {
    this.completedLevels.add(levelIndex);
    this.completedLevelsSubject.next(this.completedLevels);
    this.saveCompletedLevels();
  }

  getCompletedLevels(): Set<number> {
    return this.completedLevels;
  }

  loadCompletedLevels(): void {
    const storedLevels = localStorage.getItem('completedLevels');
    if (storedLevels) {
      this.completedLevels = new Set(JSON.parse(storedLevels));
      this.completedLevelsSubject.next(this.completedLevels);
    }
  }

  removeCompletedLevels(): void {
    localStorage.removeItem('completedLevels');
    this.getCompletedLevels().clear();
  }

  private saveCompletedLevels(): void {
    localStorage.setItem('completedLevels', JSON.stringify(Array.from(this.completedLevels)));
  }
}
