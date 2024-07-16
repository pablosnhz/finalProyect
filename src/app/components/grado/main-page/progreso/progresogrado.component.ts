import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataProgressGradoService } from 'src/app/core/services/common/grado/data-grado-progress.service';
import { LevelGradoService } from 'src/app/core/services/common/grado/level-grado-service.service';
import { ResetGameButtonGradoService } from 'src/app/core/services/common/grado/reset-game-button-grado.service';
import { TimeFinalGradoService } from 'src/app/core/services/common/grado/time-final-grado.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progresogrado.component.html',
  styleUrls: ['./progresogrado.component.scss']
})
export class ProgresoGradoComponent implements OnInit, OnDestroy {
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
    private dataProgressGrado: DataProgressGradoService,
    private resetGameGradoService: ResetGameButtonGradoService,
    private finalTimerGradoService: TimeFinalGradoService,
    private levelGradoService: LevelGradoService,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

  this.scrollToTop();

  this.updateProgress();
  this.subscriptions.push(
    this.dataProgressGrado.progressUpdated.subscribe(() => {
      this.updateProgress();
    })
  );

  this.subscriptions.push(
    this.finalTimerGradoService.getFinalTime().subscribe((time: number) => {
      this.finalTimer = time;
      console.log("Final timer:", this.finalTimer);
    })
  );

  this.subscriptions.push(
    this.resetGameGradoService.showResetButton$.subscribe((show: boolean) => {
      this.showResetButton = show;
      console.log("Button Reset Progreso:", this.showResetButton);
    })
  );

  this.showResetButton = this.resetGameGradoService.getShowResetButtonFromStorage();

  // lectura critica
  this.updateProgressLectura();
  this.subscriptions.push(
    this.dataProgressGrado.progressUpdatedLectura.subscribe(() => {
      this.updateProgressLectura();
    })
  );

  this.subscriptions.push(
    this.finalTimerGradoService.getFinalTimeLectura().subscribe((time: number) => {
      this.finalTimerLectura = time;
      console.log("Final timer:", this.finalTimerLectura);
    })
  );

  this.subscriptions.push(
    this.resetGameGradoService.showResetButtonLectura$.subscribe((show: boolean) => {
      this.showResetButtonLectura = show;
      console.log("Button Reset Progreso:", this.showResetButtonLectura);
    })
  );

  this.showResetButtonLectura = this.resetGameGradoService.getShowResetButtonFromStorageLectura();


    // sociales
    this.updateProgressSociales();
    this.subscriptions.push(
      this.dataProgressGrado.progressUpdatedSociales.subscribe(() => {
        this.updateProgressSociales();
      })
    );

    this.subscriptions.push(
      this.finalTimerGradoService.getFinalTimeSociales().subscribe((time: number) => {
        this.finalTimerSociales = time;
        console.log("Final timer:", this.finalTimerSociales);
      })
    );

    this.subscriptions.push(
      this.resetGameGradoService.showResetButtonSociales$.subscribe((show: boolean) => {
        this.showResetButtonSociales = show;
        console.log("Button Reset Progreso:", this.showResetButtonSociales);
      })
    );

    this.showResetButtonSociales = this.resetGameGradoService.getShowResetButtonFromStorageSociales();


  // naturales
  this.updateProgressNaturales();
  this.subscriptions.push(
    this.dataProgressGrado.progressUpdatedNaturales.subscribe(() => {
      this.updateProgressNaturales();
    })
  );

  this.subscriptions.push(
    this.finalTimerGradoService.getFinalTimeNaturales().subscribe((time: number) => {
      this.finalTimerNaturales = time;
      console.log("Final timer:", this.finalTimerNaturales);
    })
  );

  this.subscriptions.push(
    this.resetGameGradoService.showResetButtonNaturales$.subscribe((show: boolean) => {
      this.showResetButtonNaturales = show;
      console.log("Button Reset Progreso:", this.showResetButtonNaturales);
    })
  );

  this.showResetButtonNaturales = this.resetGameGradoService.getShowResetButtonFromStorageNaturales();

  // Ingles
  this.updateProgressIngles();
  this.subscriptions.push(
    this.dataProgressGrado.progressUpdatedIngles.subscribe(() => {
      this.updateProgressIngles();
    })
  );

  this.subscriptions.push(
    this.finalTimerGradoService.getFinalTimeIngles().subscribe((time: number) => {
      this.finalTimerIngles = time;
      console.log("Final timer:", this.finalTimerIngles);
    })
  );

  this.subscriptions.push(
    this.resetGameGradoService.showResetButtonIngles$.subscribe((show: boolean) => {
      this.showResetButtonIngles = show;
      console.log("Button Reset Progreso:", this.showResetButtonIngles);
    })
  );

  this.showResetButtonIngles = this.resetGameGradoService.getShowResetButtonFromStorageIngles();

}

onResetGame() {
  localStorage.removeItem('completedLevelsGrado');
  localStorage.removeItem('selectedOptionsGrado');
  this.resetGameGradoService.triggerResetGame();
  this.finalTimerGradoService.resetFinalTime();
  this.levelGradoService.removeCompletedLevels();
  this.showResetButton = false;
  this.finalTimer = 0;
  this.dataProgressGrado.resetData();
}

onResetGameLectura() {
  localStorage.removeItem('completedLevelsLecturaGrado');
  localStorage.removeItem('selectedOptionsLecturaGrado');
  this.resetGameGradoService.triggerResetGameLectura();
  this.finalTimerGradoService.resetFinalTimeLectura();
  this.levelGradoService.removeCompletedLevelsLectura();
  this.showResetButtonLectura = false;
  this.finalTimerLectura = 0;
  this.dataProgressGrado.resetDataLectura();
}

onResetGameSociales() {
  localStorage.removeItem('completedLevelsSocialesGrado');
  localStorage.removeItem('selectedOptionsSocialesGrado');
  this.resetGameGradoService.triggerResetGameSociales();
  this.finalTimerGradoService.resetFinalTimeSociales();
  this.levelGradoService.removeCompletedLevelsSociales();
  this.showResetButtonSociales = false;
  this.finalTimerSociales = 0;
  this.dataProgressGrado.resetDataSociales();
}

onResetGameNaturales() {
  localStorage.removeItem('completedLevelsNaturalesGrado');
  localStorage.removeItem('selectedOptionsNaturalesGrado');
  this.resetGameGradoService.triggerResetGameNaturales();
  this.finalTimerGradoService.resetFinalTimeNaturales();
  this.levelGradoService.removeCompletedLevelsNaturales();
  this.showResetButtonNaturales = false;
  this.finalTimerNaturales = 0;
  this.dataProgressGrado.resetDataNaturales();
}

onResetGameIngles() {
  localStorage.removeItem('completedLevelsInglesGrado');
  localStorage.removeItem('selectedOptionsInglesGrado');
  this.resetGameGradoService.triggerResetGameIngles();
  this.finalTimerGradoService.resetFinalTimeIngles();
  this.levelGradoService.removeCompletedLevelsIngles();
  this.showResetButtonIngles = false;
  this.finalTimerIngles = 0;
  this.dataProgressGrado.resetDataIngles();
}

scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

  updateProgress() {
    this.correctAnswers = this.dataProgressGrado.getCorrectAnswers();
    this.incorrectAnswers = this.dataProgressGrado.getIncorrectAnswers();
    this.totalQuestions = this.dataProgressGrado.getTotalQuestions();
    this.correctPorcentaje = this.dataProgressGrado.getCorrectPorcentaje();
  }

  updateProgressLectura() {
    this.correctAnswersLectura = this.dataProgressGrado.getCorrectAnswersLectura();
    this.incorrectAnswersLectura = this.dataProgressGrado.getIncorrectAnswersLectura();
    this.totalQuestionsLectura = this.dataProgressGrado.getTotalQuestionsLectura();
    this.correctPorcentajeLectura = this.dataProgressGrado.getCorrectPorcentajeLectura();
  }

  updateProgressSociales() {
    this.correctAnswersSociales = this.dataProgressGrado.getCorrectAnswersSociales();
    this.incorrectAnswersSociales = this.dataProgressGrado.getIncorrectAnswersSociales();
    this.totalQuestionsSociales = this.dataProgressGrado.getTotalQuestionsSociales();
    this.correctPorcentajeSociales = this.dataProgressGrado.getCorrectPorcentajeSociales();
  }

  updateProgressNaturales() {
    this.correctAnswersNaturales = this.dataProgressGrado.getCorrectAnswersNaturales();
    this.incorrectAnswersNaturales = this.dataProgressGrado.getIncorrectAnswersNaturales();
    this.totalQuestionsNaturales = this.dataProgressGrado.getTotalQuestionsNaturales();
    this.correctPorcentajeNaturales = this.dataProgressGrado.getCorrectPorcentajeNaturales();
  }

  updateProgressIngles() {
    this.correctAnswersIngles = this.dataProgressGrado.getCorrectAnswersIngles();
    this.incorrectAnswersIngles = this.dataProgressGrado.getIncorrectAnswersIngles();
    this.totalQuestionsIngles = this.dataProgressGrado.getTotalQuestionsIngles();
    this.correctPorcentajeIngles = this.dataProgressGrado.getCorrectPorcentajeIngles();
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
