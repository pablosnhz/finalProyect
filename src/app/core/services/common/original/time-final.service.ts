import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeFinalService {

// razonamiento logico
private finalTimeSubject = new BehaviorSubject<number>(this.getFinalTimeFromStorage());
finalTime$ = this.finalTimeSubject.asObservable();

setFinalTime(time: number) {
  localStorage.setItem('finalTime', time.toString());
  this.finalTimeSubject.next(time);
}

resetFinalTime() {
  localStorage.removeItem('clock');
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

// lecturaCritica
private finalTimeLecturaSubject = new BehaviorSubject<number>(this.getFinalTimeFromStorageLectura());
finalTimeLectura$ = this.finalTimeLecturaSubject.asObservable();

setFinalTimeLectura(time: number) {
  localStorage.setItem('finalTimeLectura', time.toString());
  this.finalTimeLecturaSubject.next(time);
}

resetFinalTimeLectura() {
  localStorage.removeItem('clockLectura');
  localStorage.removeItem('finalTimeLectura');
  this.finalTimeLecturaSubject.next(0);
}

getFinalTimeLectura(): BehaviorSubject<number> {
  return this.finalTimeLecturaSubject;
}

private getFinalTimeFromStorageLectura(): number {
  const storedTime = localStorage.getItem('finalTimeLectura');
  return storedTime ? parseInt(storedTime, 10) : 0;
}

// sociales
private finalTimeSocialesSubject = new BehaviorSubject<number>(this.getFinalTimeFromStorageSociales());
finalTimeSociales$ = this.finalTimeSocialesSubject.asObservable();

setFinalTimeSociales(time: number) {
  localStorage.setItem('finalTimeSociales', time.toString());
  this.finalTimeSocialesSubject.next(time);
}

resetFinalTimeSociales() {
  localStorage.removeItem('clockSociales');
  localStorage.removeItem('finalTimeSociales');
  this.finalTimeSocialesSubject.next(0);
}

getFinalTimeSociales(): BehaviorSubject<number> {
  return this.finalTimeSocialesSubject;
}

private getFinalTimeFromStorageSociales(): number {
  const storedTime = localStorage.getItem('finalTimeSociales');
  return storedTime ? parseInt(storedTime, 10) : 0;
}

// naturales
private finalTimeNaturalesSubject = new BehaviorSubject<number>(this.getFinalTimeFromStorageNaturales());
finalTimeNaturales$ = this.finalTimeNaturalesSubject.asObservable();

setFinalTimeNaturales(time: number) {
  localStorage.setItem('finalTimeNaturales', time.toString());
  this.finalTimeNaturalesSubject.next(time);
}

resetFinalTimeNaturales() {
  localStorage.removeItem('clockNaturales');
  localStorage.removeItem('finalTimeNaturales');
  this.finalTimeNaturalesSubject.next(0);
}

getFinalTimeNaturales(): BehaviorSubject<number> {
  return this.finalTimeNaturalesSubject;
}

private getFinalTimeFromStorageNaturales(): number {
  const storedTime = localStorage.getItem('finalTimeNaturales');
  return storedTime ? parseInt(storedTime, 10) : 0;
}

// ingles
private finalTimeInglesSubject = new BehaviorSubject<number>(this.getFinalTimeFromStorageIngles());
finalTimeIngles$ = this.finalTimeInglesSubject.asObservable();

setFinalTimeIngles(time: number) {
  localStorage.setItem('finalTimeIngles', time.toString());
  this.finalTimeInglesSubject.next(time);
}

resetFinalTimeIngles() {
  localStorage.removeItem('clockIngles');
  localStorage.removeItem('finalTimeIngles');
  this.finalTimeInglesSubject.next(0);
}

getFinalTimeIngles(): BehaviorSubject<number> {
  return this.finalTimeInglesSubject;
}

private getFinalTimeFromStorageIngles(): number {
  const storedTime = localStorage.getItem('finalTimeIngles');
  return storedTime ? parseInt(storedTime, 10) : 0;
}

}
