import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeFinalService {

  private finalTimeSubject = new BehaviorSubject<number>(this.getFinalTimeFromStorage());
  finalTime$ = this.finalTimeSubject.asObservable();

  setFinalTime(time: number) {
    localStorage.setItem('finalTime', time.toString());
    this.finalTimeSubject.next(time);
  }

  resetFinalTime() {
    localStorage.removeItem('finalTime');
    this.finalTimeSubject.next(0);
  }

  getFinalTime(): BehaviorSubject<number> {
    return this.finalTimeSubject;
  }

  private getFinalTimeFromStorage(): number {
    const storedTime = localStorage.getItem('finalTime');
    return storedTime ? parseInt(storedTime, 10) : 0;
  }
}
