import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelStatusService {

  private levelStatusSubject = new BehaviorSubject<boolean[]>([false, false, false, false]);
  levelStatus$ = this.levelStatusSubject.asObservable();

  constructor() {}

  updateLevelStatus(levelIndex: number, status: boolean) {
    const currentStatus = this.levelStatusSubject.value;
    currentStatus[levelIndex] = status;
    this.levelStatusSubject.next(currentStatus);
  }

  getLevelStatus(levelIndex: number): boolean {
    return this.levelStatusSubject.value[levelIndex];
  }
}
