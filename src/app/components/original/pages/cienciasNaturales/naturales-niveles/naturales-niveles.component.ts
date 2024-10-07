import { Component, EventEmitter, Output, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { DataProgressService } from 'src/app/core/services/common/original/data-progress.service';
import { LevelService } from 'src/app/core/services/common/original/level-service.service';
import { NaturalesService } from 'src/app/core/services/common/original/naturales.service';
import { ResetGameButtonService } from 'src/app/core/services/common/original/reset-game-button.service';
import { TimeFinalService } from 'src/app/core/services/common/original/time-final.service';

@Component({
  selector: 'app-naturales-niveles',
  templateUrl: './naturales-niveles.component.html',
  styleUrls: ['./naturales-niveles.component.scss']
})
export class NaturalesNivelesComponent {

datos: any[] = [];
selectedOption: string | null = null;
questionsData: any[] = [];
levels: any[] = [];
totalLevels: number = 4;
currentLevelIndex: number = 0;
currentQuestionIndex: number = 0;
modalIds: string[] = [];
selectedOptions: (string | null)[][] = [];
answeredQuestionsCounts: number[] = [];

level: number | undefined;

clock: number = 0;
private timerSubscription: Subscription | undefined;
private startTime: number = 0;

$loading: Signal<boolean> = this.naturalesService.$loading;

private queryParamsSubscription: Subscription | undefined;

// modal next level
showCompletedModal: boolean = false;

@Output() levelCompleted = new EventEmitter<number>();
@Output() isSelectLevel = new EventEmitter<number>();

private finalTime: number | null = null;

constructor(private naturalesService: NaturalesService,
            private progressNaturalesService: DataProgressService,
            private finalTimeNaturalesService: TimeFinalService,
            private resetGameButtonNaturalesService: ResetGameButtonService,
            private route: ActivatedRoute,
            private router: Router,
            private levelNaturalesService: LevelService
          ) {
            this.loadTimerState();
            }

ngOnInit(): void {
  this.scrollToTop();

  this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
    const level = +params['level'];
    if (!isNaN(level)) {
      this.selectLevel(level);
    }
  });
  // al iniciar la app lo primero que aparece son los datos del sheets
  this.naturalesService.getSheets().subscribe(data => {
    if (data) {
      this.questionsData = data;
      this.loadTimerState();
      this.iniciarLevels();
      this.loadSelectedOptions();
      this.restoreSelections();

      // solucion a iterar sobre los niveles del template mainPage para ir al nivel con su info en especifico
      if (this.currentLevelIndex !== undefined && this.currentLevelIndex < this.levels.length) {
        this.questionsData = this.levels[this.currentLevelIndex];
      }
    }
  });
}

loadTimerState() {
  const storedClock = localStorage.getItem('clockNaturales');
  const storedFinalTime = localStorage.getItem('finalTimeNaturales');
  const allLevelsCompleted = this.allLevelsCompleted();
  // tuve que llamar al resetGame$ aca para que tome el resetGame pero tenia errores con el timer, lo solucione al ponerlo
  // aca y no en el onInit que anteriormente presentaba errores con el timer...
  this.resetGameButtonNaturalesService.resetGameNaturales$.subscribe(() => {
    this.resetGame();
  });

  if (storedFinalTime && allLevelsCompleted) {
    this.clock = parseInt(storedFinalTime, 10);
    this.finalTimeNaturalesService.setFinalTimeNaturales(this.clock);
    } else if (storedClock) {
    this.clock = parseInt(storedClock, 10);
    this.startTimer();
    } else {
    this.resetTimer();
  }
}

storeFinalTime() {
if (this.allLevelsCompleted()) {
  this.finalTime = this.clock;
  localStorage.setItem('finalTimeNaturales', this.finalTime.toString());
  // SOLUCION DEL TIMER QUE LLEGABA EN CERO
  this.finalTimeNaturalesService.getFinalTimeNaturales().next(this.finalTime);
  }
}

// logica de niveles
iniciarLevels() {
  const numQuestionsPorLevel = 20;

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
    this.questionsData = this.levels[this.currentLevelIndex];
    this.checkAllLevelsCompleted();
    this.closeModal();
  }
}

// navegacion entre los niveles
selectLevel(levelIndex: number) {
  this.currentLevelIndex = levelIndex;
  this.currentQuestionIndex = 0;
  this.questionsData = this.levels[this.currentLevelIndex];
  this.router.navigate([], {
    relativeTo: this.route,
    queryParams: { level: levelIndex },
    queryParamsHandling: 'merge',
  });
  console.log(`Estas en el nivel: ${levelIndex}`);
  // localStorage.setItem('currentLevelIndexNaturales', levelIndex.toString());
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
      this.resetGameButtonNaturalesService.setShowResetButtonNaturales(true);
      this.stopTimer();
      this.storeFinalTime();
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
  const isCorrect = this.isAnswerCorrect(levelIndex, questionIndex);
  this.levels[levelIndex][questionIndex].answered = true;

  // Actualizar el progreso en el servicio
  this.progressNaturalesService.recordAnswerNaturales(isCorrect);

  // Guardar las opciones seleccionadas
  this.saveSelectedOptions();
  this.checkAllLevelsCompleted();
}


// timer
startTimer() {
  this.stopTimer();
  const storedClock = parseInt(localStorage.getItem('clockNaturales') || '0', 10);
  this.clock = storedClock;
  this.startTime = Date.now();
  localStorage.setItem('startTimeNaturales', this.startTime.toString());
  this.timerSubscription = timer(0, 1000).subscribe(() => {
    const currentTime = Date.now();
    this.clock = storedClock + Math.floor((currentTime - this.startTime) / 1000);
    localStorage.setItem('clockNaturales', this.clock.toString());
  });
}

stopTimer() {
  if (this.timerSubscription) {
    this.timerSubscription.unsubscribe();
    this.timerSubscription = undefined;
  }
  localStorage.setItem('clockNaturales', this.clock.toString());
  localStorage.removeItem('startTimeNaturales');
}


resetTimer() {
  this.stopTimer();
  this.clock = 0;
  localStorage.setItem('clockNaturales', this.clock.toString());
  this.startTime = Date.now();
  localStorage.setItem('startTimeNaturales', this.startTime.toString());
  // this.startTimer();
}


ngOnDestroy(): void {
  this.stopTimer();
  // this.storeFinalTime();

  localStorage.setItem('clockNaturales', this.clock.toString());
  localStorage.setItem('startTimeNaturales', this.startTime.toString());
}

// formato para controlar el timer
formatClock(): string {
  const hours = Math.floor(this.clock / 3600);
  const minutes = Math.floor((this.clock % 3600) / 60);
  const seconds = this.clock % 60;

  return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;


}

padZero(num: number): string {
  return num < 10 ? '0' + num : num.toString();
}

// logica para resetear total
resetGame() {
  // Reinicia el tiempo final a cero
  this.finalTime = null;
  localStorage.removeItem('finalTimeNaturales');
  // localStorage.removeItem('currentLevelIndexNaturales');

  // reseteo progreso y timer
  this.resetTimer();

  for (let i = 0; i < this.levels.length; i++) {
    this.resetLevel(i);
  }
  document.getElementById('resetGameButton')!.setAttribute('hidden', 'true');

  // Limpia los campos
  localStorage.removeItem('selectedOptionsNaturales');
  localStorage.removeItem('startTimeNaturales');
  localStorage.removeItem('clockNaturales');

  // Reiniciar todas las opciones seleccionadas para el progressService
  this.selectedOptions = this.levels.map(() => new Array(5).fill(null));

  // Reiniciar el contador de preguntas respondidas para el progress
  this.answeredQuestionsCounts = this.levels.map(() => 0);

  // Marcar todas las preguntas como no respondidas y restablecer el progreso del servicio
  this.levels.forEach((level) => {
    level.forEach((question: any) => {
      question.answered = false;
      });
  });

  if(this.allLevelsCompleted()) {
    return this.resetGameButtonNaturalesService.setShowResetButtonNaturales(true);
  }

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
  this.progressNaturalesService.removeAnswersForLevelNaturales(levelIndex);

  this.saveSelectedOptions();
}

// si todas las preguntas de los 4 niveles fueron completadas entonces aparece el resetTotal
allQuestionsAnswered(): boolean {
  return this.answeredQuestionsCounts.every(count => count === 5);
}

// verificamo que todos los niveles hayan sido resueltos
// refactorice el codigo para hacer el condicional del resetButton show en progreso
allLevelsCompleted(): boolean {
  const allLevelsCompleted = this.levels.every((_, index) => this.isLevelCompleted(index));
  // condicional para mostrar el next level modal
  if (this.isLevelCompleted(this.currentLevelIndex)) {
    this.showCompletedModal = true;
  }
  // this.resetGameButtonService.setShowResetButton(allLevelsCompleted);
  return allLevelsCompleted;
}

// verificamos los niveles que fueron resueltos
isLevelCompleted(levelIndex: number): boolean {
  const questions = this.levels[levelIndex];
  // Verificar si questions es nulo o indefinido, o si no es un arreglo iterable
  if (!questions || !Array.isArray(questions)) {
    return false;
  }

  // Iterar sobre las preguntas solo si questions es un arreglo iterable
  for (const question of questions) {
    if (!question.answered) {
      return false;
    }
  }
  this.levelNaturalesService.levelCompletedNaturalesService(levelIndex);
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
  const allLevelsCompleted = this.allLevelsCompleted();
  this.resetGameButtonNaturalesService.setShowResetButtonNaturales(allLevelsCompleted);
  if (allLevelsCompleted) {
    this.stopTimer();
    this.storeFinalTime();
  }
}

// guardamos las respuestas seleccionadas
saveSelectedOptions() {
  localStorage.setItem('selectedOptionsNaturales', JSON.stringify(this.selectedOptions));
}

// cargamos las preguntas que seleccionamos
loadSelectedOptions() {
  const storedOptions = localStorage.getItem('selectedOptionsNaturales');
  if (storedOptions) {
    this.selectedOptions = JSON.parse(storedOptions);
  }
}

// cargamos las respuestas que seleccionamos e incluso el check de los niveles
private restoreSelections() {
  const storedSelections = localStorage.getItem('selectedOptionsNaturales');
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

// logica de los modales para proximo nivel
closeModal() {
  this.showCompletedModal = false;
}

openModal() {
  this.showCompletedModal = true;
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// gestion de boton para la img eye
showAnswer: { [key: number]: boolean } = {};
toggleAnswer(index: number) {
  this.showAnswer[index] = !this.showAnswer[index];
}
resetAnswer(index: number) {
  this.showAnswer[index] = false;
}


}
