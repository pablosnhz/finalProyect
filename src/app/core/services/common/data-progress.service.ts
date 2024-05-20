import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProgressService {

  private correctAnswers: number = 0;
  private incorrectAnswers: number = 0;
  private totalQuestions: number = 0;

  constructor() { }

  recordAnswer(isCorrect: boolean) {
    if (isCorrect) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    this.totalQuestions++;
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
  }
}
