import { Component, OnDestroy, OnInit } from '@angular/core';
import { SheetsDatesService } from 'src/app/services/sheets-dates.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-niveles-matematica',
  templateUrl: './niveles-matematica.component.html',
  styleUrls: ['./niveles-matematica.component.scss']
})
export class NivelesMatematicaComponent implements OnInit, OnDestroy {

  datos: any[] = [];
  selectedOption: string | null = null;
  questionsData: any[] = [];
  levels: any[] = [];
  currentLevelIndex: number = 0;
  currentQuestionIndex: number = 0;
  modalIds: string[] = [];
  selectedOptions: (string | null)[][] = [];
  answeredQuestionsCounts: number[] = [];


  clock: number = 0;
  private timerSubscription: Subscription | undefined;
  private startTime: number = 0;

  constructor(private sheetsService: SheetsDatesService) { }

  ngOnInit(): void {
    this.sheetsService.getSheets().subscribe(data => {
      this.questionsData = data;
      const numQuestionsPerLevel = 5;
      for (let i = 0; i < this.questionsData.length; i += numQuestionsPerLevel) {
        this.levels.push(this.questionsData.slice(i, i + numQuestionsPerLevel));
        this.answeredQuestionsCounts.push(0);
      }
      this.selectedOptions = this.levels.map(() => new Array(5).fill(null));
      this.modalIds = this.questionsData.map((_, index) => 'modal_' + index);
    });
    const storedStartTime = localStorage.getItem('startTime');
  if (storedStartTime) {
    this.startTime = parseInt(storedStartTime, 10);
    this.startTimer();
  } else {
    this.startTime = Date.now();
    localStorage.setItem('startTime', this.startTime.toString());
    this.startTimer();
  }
  }

  resetTimer() {
    this.clock = 0;
    this.startTime = Date.now();
    localStorage.setItem('startTime', this.startTime.toString());
  }

  prevLevel() {
    if (this.currentLevelIndex > 0) {
      this.currentLevelIndex--;
      this.currentQuestionIndex = 0;
    }
  }

  nextLevel() {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
      this.currentQuestionIndex = 0;
    }
  }

  selectLevel(levelIndex: number) {
    this.currentLevelIndex = levelIndex;
    this.currentQuestionIndex = 0;
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.levels[this.currentLevelIndex].length - 1) {
        this.currentQuestionIndex++;
    } else {
        if (this.answeredQuestionsCounts[this.currentLevelIndex] === 6) {
            document.getElementById('resetButton' + this.currentLevelIndex)!.removeAttribute('hidden');
        }

        this.answeredQuestionsCounts[this.currentLevelIndex]++;

        const allQuestionsAnswered = this.allQuestionsAnswered();
        if (allQuestionsAnswered) {
            document.getElementById('resetGameButton')!.removeAttribute('hidden');
            this.stopTimer();
        }
    }
}


  isAnswerCorrect(levelIndex: number, questionIndex: number): boolean {
    const pregunta = this.questionsData[levelIndex * 5 + questionIndex];
    const selectedOption = this.selectedOptions[levelIndex][questionIndex];
    if (selectedOption === null) {
      return false;
    }
    return pregunta.respuestas === pregunta[selectedOption];
  }

  onOptionSelected(levelIndex: number, questionIndex: number, option: string) {
    this.selectedOptions[levelIndex][questionIndex] = option;
    this.levels[levelIndex][questionIndex].answered = true;
  }


  startTimer() {
  this.clock = 0;
  this.timerSubscription = timer(0, 1000).subscribe(() => {
    const elapsedTime = Date.now() - this.startTime;
    this.clock = Math.floor(elapsedTime / 1000);
  });
}


  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  // Timer
  formatClock(): string {
    const hours = Math.floor(this.clock / 3600);
    const minutes = Math.floor((this.clock % 3600) / 60);
    const seconds = this.clock % 60;

    const formattedHours = this.padZero(hours);
    const formattedMinutes = this.padZero(minutes);
    const formattedSeconds = this.padZero(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


  resetLevel(levelIndex: number) {
    this.selectedOptions[levelIndex].fill(null); // Restablecer todas las opciones seleccionadas a null
    this.answeredQuestionsCounts[levelIndex] = 0; // Restablecer el contador de preguntas respondidas

    const radioInputs = document.querySelectorAll('input[name="options' + levelIndex + '"]');
    radioInputs.forEach((input: any) => {
      input.checked = false; // Desmarcar todas las opciones
      input.disabled = false; // Habilitar el input radio
    });

    // Restablecer solo la última pregunta
    const lastQuestionIndex = this.levels[levelIndex].length - 1;
    this.selectedOptions[levelIndex][lastQuestionIndex] = null;

    console.log('Preguntas después de restablecer:', this.selectedOptions[levelIndex]);
  }





  resetGame() {
    this.resetTimer();
    for (let i = 0; i < this.levels.length; i++) {
      this.resetLevel(i);
    }

    document.getElementById('resetGameButton')!.setAttribute('hidden', 'true');

    for (let i = 0; i < this.levels.length; i++) {
      document.getElementById('resetButton' + i)!.setAttribute('hidden', 'true');
    }
  }

  isResetGameButtonVisible(): boolean {
    return !this.allQuestionsAnswered();
  }

  allQuestionsAnswered(): boolean {
    return this.answeredQuestionsCounts.every(count => count === 5);
  }


}
