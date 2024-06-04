import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetGameButtonService {

  private resetGameSubject = new BehaviorSubject<void>(undefined);
  resetGame$ = this.resetGameSubject.asObservable();

  private showResetButtonSubject = new BehaviorSubject<boolean>(false);
  showResetButton$ = this.showResetButtonSubject.asObservable();

  triggerResetGame() {
    this.resetGameSubject.next();
  }

  setShowResetButton(show: boolean) {
    this.showResetButtonSubject.next(show);
  }
}
