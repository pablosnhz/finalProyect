import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetGameButtonService {

// razonamiento logico
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

// lectura critica
private resetGameLecturaSubject = new BehaviorSubject<void>(undefined);
resetGameLectura$ = this.resetGameLecturaSubject.asObservable();

private showResetButtonLecturaSubject = new BehaviorSubject<boolean>(this.getShowResetButtonFromStorageLectura());
showResetButtonLectura$ = this.showResetButtonLecturaSubject.asObservable();

triggerResetGameLectura() {
  this.resetGameLecturaSubject.next();
  this.setShowResetButtonLectura(false);
}

setShowResetButtonLectura(show: boolean) {
  localStorage.setItem('showResetButtonLectura', JSON.stringify(show));
  this.showResetButtonLecturaSubject.next(show);
}

public getShowResetButtonFromStorageLectura(): boolean {
  const storedValue = localStorage.getItem('showResetButtonLectura');
  return storedValue ? JSON.parse(storedValue) : false;
}

// sociales
private resetGameSocialesSubject = new BehaviorSubject<void>(undefined);
resetGameSociales$ = this.resetGameSocialesSubject.asObservable();

private showResetButtonSocialesSubject = new BehaviorSubject<boolean>(this.getShowResetButtonFromStorageSociales());
showResetButtonSociales$ = this.showResetButtonSocialesSubject.asObservable();

triggerResetGameSociales() {
  this.resetGameSocialesSubject.next();
  this.setShowResetButtonSociales(false);
}

setShowResetButtonSociales(show: boolean) {
  localStorage.setItem('showResetButtonSociales', JSON.stringify(show));
  this.showResetButtonSocialesSubject.next(show);
}

public getShowResetButtonFromStorageSociales(): boolean {
  const storedValue = localStorage.getItem('showResetButtonSociales');
  return storedValue ? JSON.parse(storedValue) : false;
}

// naturales
private resetGameNaturalesSubject = new BehaviorSubject<void>(undefined);
resetGameNaturales$ = this.resetGameNaturalesSubject.asObservable();

private showResetButtonNaturalesSubject = new BehaviorSubject<boolean>(this.getShowResetButtonFromStorageNaturales());
showResetButtonNaturales$ = this.showResetButtonNaturalesSubject.asObservable();

triggerResetGameNaturales() {
  this.resetGameNaturalesSubject.next();
  this.setShowResetButtonNaturales(false);
}

setShowResetButtonNaturales(show: boolean) {
  localStorage.setItem('showResetButtonNaturales', JSON.stringify(show));
  this.showResetButtonNaturalesSubject.next(show);
}

public getShowResetButtonFromStorageNaturales(): boolean {
  const storedValue = localStorage.getItem('showResetButtonNaturales');
  return storedValue ? JSON.parse(storedValue) : false;
}

// ingles
private resetGameInglesSubject = new BehaviorSubject<void>(undefined);
resetGameIngles$ = this.resetGameInglesSubject.asObservable();

private showResetButtonInglesSubject = new BehaviorSubject<boolean>(this.getShowResetButtonFromStorageIngles());
showResetButtonIngles$ = this.showResetButtonInglesSubject.asObservable();

triggerResetGameIngles() {
  this.resetGameInglesSubject.next();
  this.setShowResetButtonIngles(false);
}

setShowResetButtonIngles(show: boolean) {
  localStorage.setItem('showResetButtonIngles', JSON.stringify(show));
  this.showResetButtonInglesSubject.next(show);
}

public getShowResetButtonFromStorageIngles(): boolean {
  const storedValue = localStorage.getItem('showResetButtonIngles');
  return storedValue ? JSON.parse(storedValue) : false;
}

}
