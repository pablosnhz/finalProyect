import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelGradoService {

// razonamiento logico
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
  const storedLevels = localStorage.getItem('completedLevelsGrado');
  if (storedLevels) {
    this.completedLevels = new Set(JSON.parse(storedLevels));
    this.completedLevelsSubject.next(this.completedLevels);
  }
}

removeCompletedLevels(): void {
  localStorage.removeItem('completedLevelsGrado');
  // this.getCompletedLevels().clear();

  this.completedLevels.clear();
}

private saveCompletedLevels(): void {
  localStorage.setItem('completedLevelsGrado', JSON.stringify(Array.from(this.completedLevels)));
}

// lectura critica
private completedLevelsLectura = new Set<number>();
private completedLevelsLecturaSubject = new BehaviorSubject<Set<number>>(this.completedLevelsLectura);

levelCompletedLectura$ = this.completedLevelsLecturaSubject.asObservable();

levelCompletedLecturaService(levelIndex: number): void {
  this.completedLevelsLectura.add(levelIndex);
  this.completedLevelsLecturaSubject.next(this.completedLevelsLectura);
  this.saveCompletedLevelsLectura();
}

getCompletedLevelsLectura(): Set<number> {
  return this.completedLevelsLectura;
}

loadCompletedLevelsLectura(): void {
  const storedLevelsLectura = localStorage.getItem('completedLevelsLecturaGrado');
  if (storedLevelsLectura) {
    this.completedLevelsLectura = new Set(JSON.parse(storedLevelsLectura));
    this.completedLevelsLecturaSubject.next(this.completedLevelsLectura);
  }
}

removeCompletedLevelsLectura(): void {
  localStorage.removeItem('completedLevelsLecturaGrado');
  // this.getCompletedLevels().clear();

  this.completedLevelsLectura.clear();
}

private saveCompletedLevelsLectura(): void {
  localStorage.setItem('completedLevelsLecturaGrado', JSON.stringify(Array.from(this.completedLevelsLectura)));
}


// sociales
private completedLevelsSociales = new Set<number>();
private completedLevelsSocialesSubject = new BehaviorSubject<Set<number>>(this.completedLevelsSociales);

levelCompletedSociales$ = this.completedLevelsSocialesSubject.asObservable();

levelCompletedSocialesService(levelIndex: number): void {
  this.completedLevelsSociales.add(levelIndex);
  this.completedLevelsSocialesSubject.next(this.completedLevelsSociales);
  this.saveCompletedLevelsSociales();
}

getCompletedLevelsSociales(): Set<number> {
  return this.completedLevelsSociales;
}

loadCompletedLevelsSociales(): void {
  const storedLevelsSociales = localStorage.getItem('completedLevelsSocialesGrado');
  if (storedLevelsSociales) {
    this.completedLevelsSociales = new Set(JSON.parse(storedLevelsSociales));
    this.completedLevelsSocialesSubject.next(this.completedLevelsSociales);
  }
}

removeCompletedLevelsSociales(): void {
  localStorage.removeItem('completedLevelsSocialesGrado');
  // this.getCompletedLevels().clear();

  this.completedLevelsSociales.clear();
}

private saveCompletedLevelsSociales(): void {
  localStorage.setItem('completedLevelsSocialesGrado', JSON.stringify(Array.from(this.completedLevelsSociales)));
}

// naturales
private completedLevelsNaturales = new Set<number>();
private completedLevelsNaturalesSubject = new BehaviorSubject<Set<number>>(this.completedLevelsNaturales);

levelCompletedNaturales$ = this.completedLevelsNaturalesSubject.asObservable();

levelCompletedNaturalesService(levelIndex: number): void {
  this.completedLevelsNaturales.add(levelIndex);
  this.completedLevelsNaturalesSubject.next(this.completedLevelsNaturales);
  this.saveCompletedLevelsNaturales();
}

getCompletedLevelsNaturales(): Set<number> {
  return this.completedLevelsNaturales;
}

loadCompletedLevelsNaturales(): void {
  const storedLevelsNaturales = localStorage.getItem('completedLevelsNaturalesGrado');
  if (storedLevelsNaturales) {
    this.completedLevelsNaturales = new Set(JSON.parse(storedLevelsNaturales));
    this.completedLevelsNaturalesSubject.next(this.completedLevelsNaturales);
  }
}

removeCompletedLevelsNaturales(): void {
  localStorage.removeItem('completedLevelsNaturalesGrado');
  // this.getCompletedLevels().clear();

  this.completedLevelsNaturales.clear();
}

private saveCompletedLevelsNaturales(): void {
  localStorage.setItem('completedLevelsNaturalesGrado', JSON.stringify(Array.from(this.completedLevelsNaturales)));
}

// Ingles
private completedLevelsIngles = new Set<number>();
private completedLevelsInglesSubject = new BehaviorSubject<Set<number>>(this.completedLevelsIngles);

levelCompletedIngles$ = this.completedLevelsInglesSubject.asObservable();

levelCompletedInglesService(levelIndex: number): void {
  this.completedLevelsIngles.add(levelIndex);
  this.completedLevelsInglesSubject.next(this.completedLevelsIngles);
  this.saveCompletedLevelsIngles();
}

getCompletedLevelsIngles(): Set<number> {
  return this.completedLevelsIngles;
}

loadCompletedLevelsIngles(): void {
  const storedLevelsIngles = localStorage.getItem('completedLevelsInglesGrado');
  if (storedLevelsIngles) {
    this.completedLevelsIngles = new Set(JSON.parse(storedLevelsIngles));
    this.completedLevelsInglesSubject.next(this.completedLevelsIngles);
  }
}

removeCompletedLevelsIngles(): void {
  localStorage.removeItem('completedLevelsInglesGrado');
  // this.getCompletedLevels().clear();

  this.completedLevelsIngles.clear();
}

private saveCompletedLevelsIngles(): void {
  localStorage.setItem('completedLevelsInglesGrado', JSON.stringify(Array.from(this.completedLevelsIngles)));
}

}
