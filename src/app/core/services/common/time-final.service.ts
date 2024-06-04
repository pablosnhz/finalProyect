import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeFinalService {

  private finalTime: BehaviorSubject<number> = new BehaviorSubject(0);

  setFinalTime(time: number) {
    this.finalTime.next(time);
  }

  getFinalTime(): Observable<number> {
    return this.finalTime.asObservable();
  }
}
