import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { SheetsDatesService } from 'src/app/core/services/common/sheets-dates.service';
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

  $loading: Signal<boolean> = this.sheetsService.$loading;

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
    this.stopTimer();
    this.clock = 0;
    this.startTime = Date.now();
    localStorage.setItem('startTime', this.startTime.toString());
    this.startTimer();
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
      this.checkAllLevelsCompleted();
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
      this.answeredQuestionsCounts[this.currentLevelIndex]++;
      this.checkAllLevelsCompleted();
      if (this.allQuestionsAnswered()) {
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
    this.checkAllLevelsCompleted();
  }

  startTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
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

  resetGame() {
    this.resetTimer();
    for (let i = 0; i < this.levels.length; i++) {
      this.resetLevel(i);
    }
    document.getElementById('resetGameButton')!.setAttribute('hidden', 'true');
  }

  resetLevel(levelIndex: number) {
    if (!this.selectedOptions[levelIndex]) {
      return;
    }

    this.selectedOptions[levelIndex].fill(null);

    const radioInputs = document.querySelectorAll<HTMLInputElement>('input[name="options' + levelIndex + '"]');
    radioInputs.forEach((input: HTMLInputElement) => {
      input.checked = false;
      input.disabled = false;
    });

    this.answeredQuestionsCounts[levelIndex] = 0;
    this.levels[levelIndex].forEach((question: any) => question.answered = false);

    const lockButton = document.getElementById('levelLockButton' + (levelIndex + 1)) as HTMLElement;
    if (lockButton) {
      lockButton.classList.remove('btn-success');
      lockButton.classList.add('btn-secondary');

      const checkIcon = lockButton.querySelector('.bi-check-lg') as HTMLElement;
      const lockIcon = lockButton.querySelector('.bi-lock') as HTMLElement;
      if (checkIcon) {
        checkIcon.style.display = 'none';
      }
      if (lockIcon) {
        lockIcon.style.display = 'inline-block';
      }
    }
  }

  isResetGameButtonVisible(): boolean {
    return this.allLevelsCompleted();
  }

  allQuestionsAnswered(): boolean {
    return this.answeredQuestionsCounts.every(count => count === 5);
  }

  // verificamo que todos los niveles hayan sido resueltos
  allLevelsCompleted(): boolean {
    return this.levels.every((_, index) => this.isLevelCompleted(index));
  }

  // verificamos los niveles que fueron resueltos
  isLevelCompleted(levelIndex: number): boolean {
    const questions = this.levels[levelIndex];
    for (const question of questions) {
      if (!question.answered) {
        return false;
      }
    }
    return true;
  }

  isResetLevelButtonVisible(): boolean {
    return this.isLevelCompleted(this.currentLevelIndex);
  }

  // checkeamos de que todos los niveles se hayan completado para parar el timer
  private checkAllLevelsCompleted() {
    if (this.allLevelsCompleted()) {
      this.stopTimer();
    }
  }
}
