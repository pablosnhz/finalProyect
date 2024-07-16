import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataProgressService } from 'src/app/core/services/common/original/data-progress.service';
import { LevelService } from 'src/app/core/services/common/original/level-service.service';
import { ResetGameButtonService } from 'src/app/core/services/common/original/reset-game-button.service';
import { TimeFinalService } from 'src/app/core/services/common/original/time-final.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.scss']
})
export class ProgresoComponent implements OnInit, OnDestroy {
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  totalQuestions: number = 0;
  correctPorcentaje: number = 0;
  finalTimer: number | undefined = 0;
  showResetButton: boolean = false;

  public subscriptions: Subscription[] = [];

  // lectura critica
  correctAnswersLectura: number = 0;
  incorrectAnswersLectura: number = 0;
  totalQuestionsLectura: number = 0;
  correctPorcentajeLectura: number = 0;
  finalTimerLectura: number | undefined = 0;
  showResetButtonLectura: boolean = false;


  // sociales
  correctAnswersSociales: number = 0;
  incorrectAnswersSociales: number = 0;
  totalQuestionsSociales: number = 0;
  correctPorcentajeSociales: number = 0;

  finalTimerSociales: number | undefined = 0;
  showResetButtonSociales: boolean = false;

  // naturales
  correctAnswersNaturales: number = 0;
  incorrectAnswersNaturales: number = 0;
  totalQuestionsNaturales: number = 0;
  correctPorcentajeNaturales: number = 0;
  finalTimerNaturales: number | undefined = 0;
  showResetButtonNaturales: boolean = false;

  // ingles
  correctAnswersIngles: number = 0;
  incorrectAnswersIngles: number = 0;
  totalQuestionsIngles: number = 0;
  correctPorcentajeIngles: number = 0;
  finalTimerIngles: number | undefined = 0;
  showResetButtonIngles: boolean = false;


  constructor(
    private dataProgress: DataProgressService,
    private resetGameService: ResetGameButtonService,
    private finalTimerService: TimeFinalService,
    private levelService: LevelService,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

  this.scrollToTop();

  this.updateProgress();
  this.subscriptions.push(
    this.dataProgress.progressUpdated.subscribe(() => {
      this.updateProgress();
    })
  );

  this.subscriptions.push(
    this.finalTimerService.getFinalTime().subscribe((time: number) => {
      this.finalTimer = time;
      console.log("Final timer:", this.finalTimer);
    })
  );

  this.subscriptions.push(
    this.resetGameService.showResetButton$.subscribe((show: boolean) => {
      this.showResetButton = show;
      console.log("Button Reset Progreso:", this.showResetButton);
    })
  );

  this.showResetButton = this.resetGameService.getShowResetButtonFromStorage();

  // lectura critica
  this.updateProgressLectura();
  this.subscriptions.push(
    this.dataProgress.progressUpdatedLectura.subscribe(() => {
      this.updateProgressLectura();
    })
  );

  this.subscriptions.push(
    this.finalTimerService.getFinalTimeLectura().subscribe((time: number) => {
      this.finalTimerLectura = time;
      console.log("Final timer:", this.finalTimerLectura);
    })
  );

  this.subscriptions.push(
    this.resetGameService.showResetButtonLectura$.subscribe((show: boolean) => {
      this.showResetButtonLectura = show;
      console.log("Button Reset Progreso:", this.showResetButtonLectura);
    })
  );

  this.showResetButtonLectura = this.resetGameService.getShowResetButtonFromStorageLectura();


    // sociales
    this.updateProgressSociales();
    this.subscriptions.push(
      this.dataProgress.progressUpdatedSociales.subscribe(() => {
        this.updateProgressSociales();
      })
    );

    this.subscriptions.push(
      this.finalTimerService.getFinalTimeSociales().subscribe((time: number) => {
        this.finalTimerSociales = time;
        console.log("Final timer:", this.finalTimerSociales);
      })
    );

    this.subscriptions.push(
      this.resetGameService.showResetButtonSociales$.subscribe((show: boolean) => {
        this.showResetButtonSociales = show;
        console.log("Button Reset Progreso:", this.showResetButtonSociales);
      })
    );

    this.showResetButtonSociales = this.resetGameService.getShowResetButtonFromStorageSociales();


  // naturales
  this.updateProgressNaturales();
  this.subscriptions.push(
    this.dataProgress.progressUpdatedNaturales.subscribe(() => {
      this.updateProgressNaturales();
    })
  );

  this.subscriptions.push(
    this.finalTimerService.getFinalTimeNaturales().subscribe((time: number) => {
      this.finalTimerNaturales = time;
      console.log("Final timer:", this.finalTimerNaturales);
    })
  );

  this.subscriptions.push(
    this.resetGameService.showResetButtonNaturales$.subscribe((show: boolean) => {
      this.showResetButtonNaturales = show;
      console.log("Button Reset Progreso:", this.showResetButtonNaturales);
    })
  );

  this.showResetButtonNaturales = this.resetGameService.getShowResetButtonFromStorageNaturales();

  // Ingles
  this.updateProgressIngles();
  this.subscriptions.push(
    this.dataProgress.progressUpdatedIngles.subscribe(() => {
      this.updateProgressIngles();
    })
  );

  this.subscriptions.push(
    this.finalTimerService.getFinalTimeIngles().subscribe((time: number) => {
      this.finalTimerIngles = time;
      console.log("Final timer:", this.finalTimerIngles);
    })
  );

  this.subscriptions.push(
    this.resetGameService.showResetButtonIngles$.subscribe((show: boolean) => {
      this.showResetButtonIngles = show;
      console.log("Button Reset Progreso:", this.showResetButtonIngles);
    })
  );

  this.showResetButtonIngles = this.resetGameService.getShowResetButtonFromStorageIngles();

}

onResetGame() {
  localStorage.removeItem('completedLevels');
  localStorage.removeItem('selectedOptions');
  this.resetGameService.triggerResetGame();
  this.finalTimerService.resetFinalTime();
  this.levelService.removeCompletedLevels();
  this.showResetButton = false;
  this.finalTimer = 0;
  this.dataProgress.resetData();
}

onResetGameLectura() {
  localStorage.removeItem('completedLevelsLectura');
  localStorage.removeItem('selectedOptionsLectura');
  this.resetGameService.triggerResetGameLectura();
  this.finalTimerService.resetFinalTimeLectura();
  this.levelService.removeCompletedLevelsLectura();
  this.showResetButtonLectura = false;
  this.finalTimerLectura = 0;
  this.dataProgress.resetDataLectura();
}

onResetGameSociales() {
  localStorage.removeItem('completedLevelsSociales');
  localStorage.removeItem('selectedOptionsSociales');
  this.resetGameService.triggerResetGameSociales();
  this.finalTimerService.resetFinalTimeSociales();
  this.levelService.removeCompletedLevelsSociales();
  this.showResetButtonSociales = false;
  this.finalTimerSociales = 0;
  this.dataProgress.resetDataSociales();
}

onResetGameNaturales() {
  localStorage.removeItem('completedLevelsNaturales');
  localStorage.removeItem('selectedOptionsNaturales');
  this.resetGameService.triggerResetGameNaturales();
  this.finalTimerService.resetFinalTimeNaturales();
  this.levelService.removeCompletedLevelsNaturales();
  this.showResetButtonNaturales = false;
  this.finalTimerNaturales = 0;
  this.dataProgress.resetDataNaturales();
}

onResetGameIngles() {
  localStorage.removeItem('completedLevelsIngles');
  localStorage.removeItem('selectedOptionsIngles');
  this.resetGameService.triggerResetGameIngles();
  this.finalTimerService.resetFinalTimeIngles();
  this.levelService.removeCompletedLevelsIngles();
  this.showResetButtonIngles = false;
  this.finalTimerIngles = 0;
  this.dataProgress.resetDataIngles();
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  updateProgress() {
    this.correctAnswers = this.dataProgress.getCorrectAnswers();
    this.incorrectAnswers = this.dataProgress.getIncorrectAnswers();
    this.totalQuestions = this.dataProgress.getTotalQuestions();
    this.correctPorcentaje = this.dataProgress.getCorrectPorcentaje();
  }

  updateProgressLectura() {
    this.correctAnswersLectura = this.dataProgress.getCorrectAnswersLectura();
    this.incorrectAnswersLectura = this.dataProgress.getIncorrectAnswersLectura();
    this.totalQuestionsLectura = this.dataProgress.getTotalQuestionsLectura();
    this.correctPorcentajeLectura = this.dataProgress.getCorrectPorcentajeLectura();
  }

  updateProgressSociales() {
    this.correctAnswersSociales = this.dataProgress.getCorrectAnswersSociales();
    this.incorrectAnswersSociales = this.dataProgress.getIncorrectAnswersSociales();
    this.totalQuestionsSociales = this.dataProgress.getTotalQuestionsSociales();
    this.correctPorcentajeSociales = this.dataProgress.getCorrectPorcentajeSociales();
  }

  updateProgressNaturales() {
    this.correctAnswersNaturales = this.dataProgress.getCorrectAnswersNaturales();
    this.incorrectAnswersNaturales = this.dataProgress.getIncorrectAnswersNaturales();
    this.totalQuestionsNaturales = this.dataProgress.getTotalQuestionsNaturales();
    this.correctPorcentajeNaturales = this.dataProgress.getCorrectPorcentajeNaturales();
  }

  updateProgressIngles() {
    this.correctAnswersIngles = this.dataProgress.getCorrectAnswersIngles();
    this.incorrectAnswersIngles = this.dataProgress.getIncorrectAnswersIngles();
    this.totalQuestionsIngles = this.dataProgress.getTotalQuestionsIngles();
    this.correctPorcentajeIngles = this.dataProgress.getCorrectPorcentajeIngles();
  }

  // formato para hacer el cambio del tiempo el cual antes por defecto me llegaba 21:00:00
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(secs)}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
