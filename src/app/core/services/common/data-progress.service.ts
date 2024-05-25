import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProgressService {
  private correctAnswers: number = 0;
  private incorrectAnswers: number = 0;
  private totalQuestions: number = 0;

  progressUpdated: Subject<void> = new Subject<void>();

  constructor() {
    this.loadProgressFromLocalStorage();
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
    localStorage.setItem('correctAnswers', this.correctAnswers.toString());
    localStorage.setItem('incorrectAnswers', this.incorrectAnswers.toString());
    localStorage.setItem('totalQuestions', this.totalQuestions.toString());
  }

  private loadProgressFromLocalStorage() {
    this.correctAnswers = parseInt(localStorage.getItem('correctAnswers') || '0', 10);
    this.incorrectAnswers = parseInt(localStorage.getItem('incorrectAnswers') || '0', 10);
    this.totalQuestions = parseInt(localStorage.getItem('totalQuestions') || '0', 10);
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

}
