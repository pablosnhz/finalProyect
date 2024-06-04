import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetGameButtonService {

  private resetGameSubject = new Subject<void>();

  resetGame$ = this.resetGameSubject.asObservable();

  triggerResetGame() {
    this.resetGameSubject.next();
  }
}
