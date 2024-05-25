import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { SheetsDatesService } from 'src/app/core/services/common/sheets-dates.service';
import { Subscription, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataProgressService } from 'src/app/core/services/common/data-progress.service';

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

  constructor(private sheetsService: SheetsDatesService,
              private progressService: DataProgressService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // al iniciar la app lo primero que aparece son los datos del sheets
    this.sheetsService.getSheets().subscribe(data => {
      if (data) {
        this.questionsData = data;
        this.iniciarLevels();
        this.loadSelectedOptions();
        this.restoreSelections();
      }
    });
    // controlamos el tiempo tambien una vez iniciada la app inicia el timer
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime) {
      this.startTime = parseInt(storedStartTime, 10);
      if (this.startTime > Date.now()) {
        this.resetTimer();
      } else {
        this.startTimer();
      }
    } else {
      this.startTime = Date.now();
      localStorage.setItem('startTime', this.startTime.toString());
      this.startTimer();
    };

  }

  // logica de niveles
  iniciarLevels() {
    const numQuestionsPorLevel = 5;

    for (let i = 0; i < this.questionsData.length; i += numQuestionsPorLevel) {
      this.levels.push(this.questionsData.slice(i, i + numQuestionsPorLevel));
      this.answeredQuestionsCounts.push(0);
    }
    this.selectedOptions = this.levels.map(() => new Array(numQuestionsPorLevel).fill(null));
    this.modalIds = this.questionsData.map((_, index) => 'modal_' + index);
  }

  // niveles
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

  // navegacion entre los niveles
  selectLevel(levelIndex: number) {
    this.currentLevelIndex = levelIndex;
    this.currentQuestionIndex = 0;
    this.questionsData = this.levels[this.currentLevelIndex];
  }

  // control de botones
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

  // detectamos las respuestas correctas e incorrectas
  isAnswerCorrect(levelIndex: number, questionIndex: number): boolean {
    const pregunta = this.questionsData[questionIndex];
    const selectedOption = this.selectedOptions[levelIndex][questionIndex];

    if (selectedOption === null) {
      return false;
    }
    return pregunta.respuestas === pregunta[selectedOption];
  }




  // opcion para evaluar la finalizacion de los niveles
  onOptionSelected(levelIndex: number, questionIndex: number, option: string) {
    this.selectedOptions[levelIndex][questionIndex] = option;
    // si la respuesta es correcta entonces la toma progressService
    const isCorrect = this.isAnswerCorrect(levelIndex, questionIndex);
    this.levels[levelIndex][questionIndex].answered = true;
    this.progressService.recordAnswer(isCorrect);
    // cada pregunta seleccionada la guardamos
    this.saveSelectedOptions();
    this.checkAllLevelsCompleted();
  }

  // timer
  startTimer() {
    this.stopTimer();

    this.timerSubscription = timer(0, 1000).subscribe(() => {
      const currentTime = Date.now();
      this.clock = Math.floor((currentTime - this.startTime) / 1000);
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = undefined;
    }
  }

  resetTimer() {
    this.stopTimer();
    this.clock = 0;
    this.startTime = Date.now();
    localStorage.setItem('startTime', this.startTime.toString());
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  // formato para controlar el timer
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


  // logica para resetear total
  resetGame() {
    this.resetTimer();
    for (let i = 0; i < this.levels.length; i++) {
      this.resetLevel(i);
    }
    document.getElementById('resetGameButton')!.setAttribute('hidden', 'true');
    // limpiamos tanto los campos de los inputs seleccionados como del localstorege
    localStorage.removeItem('selectedOptions');
    // Reiniciar todas las opciones seleccionadas dentro del localstorage para el progressService
    this.selectedOptions = this.levels.map(() => new Array(5).fill(null));

    // Reiniciar el contador de preguntas respondidas
    this.answeredQuestionsCounts = this.levels.map(() => 0);

    this.levels.forEach((level) => {
      level.forEach((question: any) => {
        question.answered = false;
      });
    });

    this.progressService.resetIncorrectAnswers();
    this.progressService.resetTotalQuestions();

    this.progressService.resetData();

  }



  // logica para resetear nivel e incluso el check/block de los niveles
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
    this.levels[levelIndex].forEach((question: any) => {
      question.answered = false;
    });

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
    this.progressService.removeAnswersForLevel(levelIndex);

    this.saveSelectedOptions();
  }

  // si todas las preguntas de los 4 niveles fueron completadas entonces aparece el resetTotal
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

  // boton de reseteo total
  isResetGameButtonVisible(): boolean {
    return this.allLevelsCompleted();
  }
  // boton de reseteo por nivel
  isResetLevelButtonVisible(): boolean {
    return this.isLevelCompleted(this.currentLevelIndex);
  }

  // checkeamos de que todos los niveles se hayan completado para parar el timer
  private checkAllLevelsCompleted() {
    if (this.allLevelsCompleted()) {
      this.stopTimer();
    }
  }

  // guardamos las respuestas seleccionadas
  saveSelectedOptions() {
    localStorage.setItem('selectedOptions', JSON.stringify(this.selectedOptions));
  }

  // cargamos las preguntas que seleccionamos
  loadSelectedOptions() {
    const storedOptions = localStorage.getItem('selectedOptions');
    if (storedOptions) {
      this.selectedOptions = JSON.parse(storedOptions);
    }
  }

  // cargamos las respuestas que seleccionamos e incluso el check de los niveles
  private restoreSelections() {
    const storedSelections = localStorage.getItem('selectedOptions');
    if (storedSelections) {
      this.selectedOptions = JSON.parse(storedSelections);
      this.updateAnsweredQuestionsCounts();

      for (let levelIndex = 0; levelIndex < this.selectedOptions.length; levelIndex++) {
        const level = this.selectedOptions[levelIndex];
        for (let questionIndex = 0; questionIndex < level.length; questionIndex++) {
          const selectedOption = this.selectedOptions[levelIndex][questionIndex];
          if (selectedOption !== null) {
            const question = this.levels[levelIndex][questionIndex];
            question.answered = true;
            const isCorrect = this.isAnswerCorrect(levelIndex, questionIndex);
            if (isCorrect) {
              this.levels[levelIndex][questionIndex].answered = true;
            }
          }
        }
      }
    }
  }

  private updateAnsweredQuestionsCounts() {
    this.answeredQuestionsCounts = this.levels.map((level, levelIndex) => {
      return level.reduce((count: number, _: any, questionIndex: number) => {
        return this.selectedOptions[levelIndex][questionIndex] !== null ? count + 1 : count;
      }, 0);
    });
  }

}
