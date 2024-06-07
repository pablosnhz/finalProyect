import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetGameButtonService {

  private resetGameSubject = new BehaviorSubject<void>(undefined);
  resetGame$ = this.resetGameSubject.asObservable();

  private showResetButtonSubject = new BehaviorSubject<boolean>(this.getShowResetButtonFromStorage());
  showResetButton$ = this.showResetButtonSubject.asObservable();

  triggerResetGame() {
    this.resetGameSubject.next();
    this.setShowResetButton(false);
  }

  setShowResetButton(show: boolean) {
    localStorage.setItem('showResetButton', JSON.stringify(show));
    this.showResetButtonSubject.next(show);
  }

  public getShowResetButtonFromStorage(): boolean {
    const storedValue = localStorage.getItem('showResetButton');
    return storedValue ? JSON.parse(storedValue) : false;
  }
}
