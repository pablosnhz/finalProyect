import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProgressGradoService {

// razonamiento logico
private correctAnswers: number = 0;
private incorrectAnswers: number = 0;
private totalQuestions: number = 0;

progressUpdated: Subject<void> = new Subject<void>();

constructor() {
  this.loadProgressFromLocalStorage();
  this.loadProgressFromLocalStorageLectura();
  this.loadProgressFromLocalStorageSociales();
  this.loadProgressFromLocalStorageNaturales();
  this.loadProgressFromLocalStorageIngles();
}

recordAnswer(isCorrect: boolean) {
  if (isCorrect) {
    this.correctAnswers++;
  } else {
    this.incorrectAnswers++;
  }
  this.totalQuestions++;
  this.saveProgressToLocalStorage();
  this.progressUpdated.next();
}

removeAnswer(isCorrect: boolean) {
  if (isCorrect && this.correctAnswers > 0) {
    this.correctAnswers--;
  } else if (this.incorrectAnswers > 0) {
    this.incorrectAnswers--;
  }
  if (this.totalQuestions > 0) {
    this.totalQuestions--;
  }
  this.saveProgressToLocalStorage();
  this.progressUpdated.next();
}

getCorrectAnswers(): number {
  return this.correctAnswers;
}

getIncorrectAnswers(): number {
  return this.incorrectAnswers;
}

getTotalQuestions(): number {
  return this.totalQuestions;
}

getCorrectPorcentaje(): number {
  return this.totalQuestions > 0 ? (this.correctAnswers / this.totalQuestions) * 100 : 0;
}

resetData() {
  this.correctAnswers = 0;
  this.incorrectAnswers = 0;
  this.totalQuestions = 0;
  this.saveProgressToLocalStorage();
  this.progressUpdated.next();
}

resetIncorrectAnswers() {
  this.incorrectAnswers = 0;
  this.saveProgressToLocalStorage();
}

resetTotalQuestions() {
  this.totalQuestions = 0;
  this.saveProgressToLocalStorage();
}

private saveProgressToLocalStorage() {
  localStorage.setItem('correctAnswersGrado', this.correctAnswers.toString());
  localStorage.setItem('incorrectAnswersGrado', this.incorrectAnswers.toString());
  localStorage.setItem('totalQuestionsGrado', this.totalQuestions.toString());
}

private loadProgressFromLocalStorage() {
  this.correctAnswers = parseInt(localStorage.getItem('correctAnswersGrado') || '0', 10);
  this.incorrectAnswers = parseInt(localStorage.getItem('incorrectAnswersGrado') || '0', 10);
  this.totalQuestions = parseInt(localStorage.getItem('totalQuestionsGrado') || '0', 10);
}

removeAnswersForLevel(levelIndex: number) {
  const numQuestionsPorLevel = 5;
  const startIndex = levelIndex * numQuestionsPorLevel;
  const endIndex = startIndex + numQuestionsPorLevel;

  for (let i = startIndex; i < endIndex; i++) {
    const isCorrect = this.correctAnswers > 0;
    this.removeAnswer(isCorrect);
  }
}


// lecturaCritica
private correctAnswersLectura: number = 0;
private incorrectAnswersLectura: number = 0;
private totalQuestionsLectura: number = 0;

progressUpdatedLectura: Subject<void> = new Subject<void>();


recordAnswerLectura(isCorrect: boolean) {
  if (isCorrect) {
    this.correctAnswersLectura++;
  } else {
    this.incorrectAnswersLectura++;
  }
  this.totalQuestionsLectura++;
  this.saveProgressToLocalStorageLectura();
  this.progressUpdatedLectura.next();
}

removeAnswerLectura(isCorrect: boolean) {
  if (isCorrect && this.correctAnswersLectura > 0) {
    this.correctAnswersLectura--;
  } else if (this.incorrectAnswersLectura > 0) {
    this.incorrectAnswersLectura--;
  }
  if (this.totalQuestionsLectura > 0) {
    this.totalQuestionsLectura--;
  }
  this.saveProgressToLocalStorageLectura();
  this.progressUpdatedLectura.next();
}

getCorrectAnswersLectura(): number {
  return this.correctAnswersLectura;
}

getIncorrectAnswersLectura(): number {
  return this.incorrectAnswersLectura;
}

getTotalQuestionsLectura(): number {
  return this.totalQuestionsLectura;
}

getCorrectPorcentajeLectura(): number {
  return this.totalQuestionsLectura > 0 ? (this.correctAnswersLectura / this.totalQuestionsLectura) * 100 : 0;
}

resetDataLectura() {
  this.correctAnswersLectura = 0;
  this.incorrectAnswersLectura = 0;
  this.totalQuestionsLectura = 0;
  this.saveProgressToLocalStorageLectura();
  this.progressUpdatedLectura.next();
}

resetIncorrectAnswersLectura() {
  this.incorrectAnswersLectura = 0;
  this.saveProgressToLocalStorageLectura();
}

resetTotalQuestionsLectura() {
  this.totalQuestionsLectura = 0;
  this.saveProgressToLocalStorageLectura();
}

private saveProgressToLocalStorageLectura() {
  localStorage.setItem('correctAnswersLecturaGrado', this.correctAnswersLectura.toString());
  localStorage.setItem('incorrectAnswersLecturaGrado', this.incorrectAnswersLectura.toString());
  localStorage.setItem('totalQuestionsLecturaGrado', this.totalQuestionsLectura.toString());
}

private loadProgressFromLocalStorageLectura() {
  this.correctAnswersLectura = parseInt(localStorage.getItem('correctAnswersLecturaGrado') || '0', 10);
  this.incorrectAnswersLectura = parseInt(localStorage.getItem('incorrectAnswersLecturaGrado') || '0', 10);
  this.totalQuestionsLectura = parseInt(localStorage.getItem('totalQuestionsLecturaGrado') || '0', 10);
}

removeAnswersForLevelLectura(levelIndex: number) {
  const numQuestionsPorLevel = 5;
  const startIndex = levelIndex * numQuestionsPorLevel;
  const endIndex = startIndex + numQuestionsPorLevel;

  for (let i = startIndex; i < endIndex; i++) {
    const isCorrect = this.correctAnswersLectura > 0;
    this.removeAnswerLectura(isCorrect);
  }
}

// sociales
private correctAnswersSociales: number = 0;
private incorrectAnswersSociales: number = 0;
private totalQuestionsSociales: number = 0;

progressUpdatedSociales: Subject<void> = new Subject<void>();


recordAnswerSociales(isCorrect: boolean) {
  if (isCorrect) {
    this.correctAnswersSociales++;
  } else {
    this.incorrectAnswersSociales++;
  }
  this.totalQuestionsSociales++;
  this.saveProgressToLocalStorageSociales();
  this.progressUpdatedSociales.next();
}

removeAnswerSociales(isCorrect: boolean) {
  if (isCorrect && this.correctAnswersSociales > 0) {
    this.correctAnswersSociales--;
  } else if (this.incorrectAnswersSociales > 0) {
    this.incorrectAnswersSociales--;
  }
  if (this.totalQuestionsSociales > 0) {
    this.totalQuestionsSociales--;
  }
  this.saveProgressToLocalStorageSociales();
  this.progressUpdatedSociales.next();
}

getCorrectAnswersSociales(): number {
  return this.correctAnswersSociales;
}

getIncorrectAnswersSociales(): number {
  return this.incorrectAnswersSociales;
}

getTotalQuestionsSociales(): number {
  return this.totalQuestionsSociales;
}

getCorrectPorcentajeSociales(): number {
  return this.totalQuestionsSociales > 0 ? (this.correctAnswersSociales / this.totalQuestionsSociales) * 100 : 0;
}

resetDataSociales() {
  this.correctAnswersSociales = 0;
  this.incorrectAnswersSociales = 0;
  this.totalQuestionsSociales = 0;
  this.saveProgressToLocalStorageSociales();
  this.progressUpdatedSociales.next();
}

resetIncorrectAnswersSociales() {
  this.incorrectAnswersSociales = 0;
  this.saveProgressToLocalStorageSociales();
}

resetTotalQuestionsSociales() {
  this.totalQuestionsSociales = 0;
  this.saveProgressToLocalStorageSociales();
}

private saveProgressToLocalStorageSociales() {
  localStorage.setItem('correctAnswersSocialesGrado', this.correctAnswersSociales.toString());
  localStorage.setItem('incorrectAnswersSocialesGrado', this.incorrectAnswersSociales.toString());
  localStorage.setItem('totalQuestionsSocialesGrado', this.totalQuestionsSociales.toString());
}

private loadProgressFromLocalStorageSociales() {
  this.correctAnswersSociales = parseInt(localStorage.getItem('correctAnswersSocialesGrado') || '0', 10);
  this.incorrectAnswersSociales = parseInt(localStorage.getItem('incorrectAnswersSocialesGrado') || '0', 10);
  this.totalQuestionsSociales = parseInt(localStorage.getItem('totalQuestionsSocialesGrado') || '0', 10);
}

removeAnswersForLevelSociales(levelIndex: number) {
  const numQuestionsPorLevel = 5;
  const startIndex = levelIndex * numQuestionsPorLevel;
  const endIndex = startIndex + numQuestionsPorLevel;

  for (let i = startIndex; i < endIndex; i++) {
    const isCorrect = this.correctAnswersSociales > 0;
    this.removeAnswerSociales(isCorrect);
  }
}


// naturales
private correctAnswersNaturales: number = 0;
private incorrectAnswersNaturales: number = 0;
private totalQuestionsNaturales: number = 0;

progressUpdatedNaturales: Subject<void> = new Subject<void>();


recordAnswerNaturales(isCorrect: boolean) {
  if (isCorrect) {
    this.correctAnswersNaturales++;
  } else {
    this.incorrectAnswersNaturales++;
  }
  this.totalQuestionsNaturales++;
  this.saveProgressToLocalStorageNaturales();
  this.progressUpdatedNaturales.next();
}

removeAnswerNaturales(isCorrect: boolean) {
  if (isCorrect && this.correctAnswersNaturales > 0) {
    this.correctAnswersNaturales--;
  } else if (this.incorrectAnswersNaturales > 0) {
    this.incorrectAnswersNaturales--;
  }
  if (this.totalQuestionsNaturales > 0) {
    this.totalQuestionsNaturales--;
  }
  this.saveProgressToLocalStorageNaturales();
  this.progressUpdatedNaturales.next();
}

getCorrectAnswersNaturales(): number {
  return this.correctAnswersNaturales;
}

getIncorrectAnswersNaturales(): number {
  return this.incorrectAnswersNaturales;
}

getTotalQuestionsNaturales(): number {
  return this.totalQuestionsNaturales;
}

getCorrectPorcentajeNaturales(): number {
  return this.totalQuestionsNaturales > 0 ? (this.correctAnswersNaturales / this.totalQuestionsNaturales) * 100 : 0;
}

resetDataNaturales() {
  this.correctAnswersNaturales = 0;
  this.incorrectAnswersNaturales = 0;
  this.totalQuestionsNaturales = 0;
  this.saveProgressToLocalStorageNaturales();
  this.progressUpdatedNaturales.next();
}

resetIncorrectAnswersNaturales() {
  this.incorrectAnswersNaturales = 0;
  this.saveProgressToLocalStorageNaturales();
}

resetTotalQuestionsNaturales() {
  this.totalQuestionsNaturales = 0;
  this.saveProgressToLocalStorageNaturales();
}

private saveProgressToLocalStorageNaturales() {
  localStorage.setItem('correctAnswersNaturalesGrado', this.correctAnswersNaturales.toString());
  localStorage.setItem('incorrectAnswersNaturalesGrado', this.incorrectAnswersNaturales.toString());
  localStorage.setItem('totalQuestionsNaturalesGrado', this.totalQuestionsNaturales.toString());
}

private loadProgressFromLocalStorageNaturales() {
  this.correctAnswersNaturales = parseInt(localStorage.getItem('correctAnswersNaturalesGrado') || '0', 10);
  this.incorrectAnswersNaturales = parseInt(localStorage.getItem('incorrectAnswersNaturalesGrado') || '0', 10);
  this.totalQuestionsNaturales = parseInt(localStorage.getItem('totalQuestionsNaturalesGrado') || '0', 10);
}

removeAnswersForLevelNaturales(levelIndex: number) {
  const numQuestionsPorLevel = 5;
  const startIndex = levelIndex * numQuestionsPorLevel;
  const endIndex = startIndex + numQuestionsPorLevel;

  for (let i = startIndex; i < endIndex; i++) {
    const isCorrect = this.correctAnswersNaturales > 0;
    this.removeAnswerNaturales(isCorrect);
  }
}

//ingles
private correctAnswersIngles: number = 0;
private incorrectAnswersIngles: number = 0;
private totalQuestionsIngles: number = 0;

progressUpdatedIngles: Subject<void> = new Subject<void>();


recordAnswerIngles(isCorrect: boolean) {
  if (isCorrect) {
    this.correctAnswersIngles++;
  } else {
    this.incorrectAnswersIngles++;
  }
  this.totalQuestionsIngles++;
  this.saveProgressToLocalStorageIngles();
  this.progressUpdatedIngles.next();
}

removeAnswerIngles(isCorrect: boolean) {
  if (isCorrect && this.correctAnswersIngles > 0) {
    this.correctAnswersIngles--;
  } else if (this.incorrectAnswersIngles > 0) {
    this.incorrectAnswersIngles--;
  }
  if (this.totalQuestionsIngles > 0) {
    this.totalQuestionsIngles--;
  }
  this.saveProgressToLocalStorageIngles();
  this.progressUpdatedIngles.next();
}

getCorrectAnswersIngles(): number {
  return this.correctAnswersIngles;
}

getIncorrectAnswersIngles(): number {
  return this.incorrectAnswersIngles;
}

getTotalQuestionsIngles(): number {
  return this.totalQuestionsIngles;
}

getCorrectPorcentajeIngles(): number {
  return this.totalQuestionsIngles > 0 ? (this.correctAnswersIngles / this.totalQuestionsIngles) * 100 : 0;
}

resetDataIngles() {
  this.correctAnswersIngles = 0;
  this.incorrectAnswersIngles = 0;
  this.totalQuestionsIngles = 0;
  this.saveProgressToLocalStorageIngles();
  this.progressUpdatedIngles.next();
}

resetIncorrectAnswersIngles() {
  this.incorrectAnswersIngles = 0;
  this.saveProgressToLocalStorageIngles();
}

resetTotalQuestionsIngles() {
  this.totalQuestionsIngles = 0;
  this.saveProgressToLocalStorageIngles();
}

private saveProgressToLocalStorageIngles() {
  localStorage.setItem('correctAnswersInglesGrado', this.correctAnswersIngles.toString());
  localStorage.setItem('incorrectAnswersInglesGrado', this.incorrectAnswersIngles.toString());
  localStorage.setItem('totalQuestionsInglesGrado', this.totalQuestionsIngles.toString());
}

private loadProgressFromLocalStorageIngles() {
  this.correctAnswersIngles = parseInt(localStorage.getItem('correctAnswersInglesGrado') || '0', 10);
  this.incorrectAnswersIngles = parseInt(localStorage.getItem('incorrectAnswersInglesGrado') || '0', 10);
  this.totalQuestionsIngles = parseInt(localStorage.getItem('totalQuestionsInglesGrado') || '0', 10);
}

removeAnswersForLevelIngles(levelIndex: number) {
  const numQuestionsPorLevel = 5;
  const startIndex = levelIndex * numQuestionsPorLevel;
  const endIndex = startIndex + numQuestionsPorLevel;

  for (let i = startIndex; i < endIndex; i++) {
    const isCorrect = this.correctAnswersIngles > 0;
    this.removeAnswerIngles(isCorrect);
  }
}
}
