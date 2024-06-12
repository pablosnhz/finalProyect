import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataProgressService } from 'src/app/core/services/common/data-progress.service';
import { ResetGameButtonService } from 'src/app/core/services/common/reset-game-button.service';
import { TimeFinalService } from 'src/app/core/services/common/time-final.service';
import { Subscription } from 'rxjs';
import { LevelService } from 'src/app/core/services/common/level-service.service';

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

  constructor(
    private dataProgress: DataProgressService,
    private resetGameService: ResetGameButtonService,
    private finalTimerService: TimeFinalService,
    private levelService: LevelService,
  ) {
    // this.subscriptions.push(
    //   this.finalTimerService.getFinalTime().subscribe((time: number) => {
    //     this.finalTimer = time;
    //     console.log("Constructor Final timer:", this.finalTimer);
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {

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


  }

  onResetGame() {
    this.resetGameService.triggerResetGame();
    this.finalTimerService.resetFinalTime();
    this.levelService.removeCompletedLevels();
    this.showResetButton = false;
    // aplicamos el timer para que se resetee el tiempo
    this.finalTimer = 0;

    this.dataProgress.resetData();
  }

  updateProgress() {
    this.correctAnswers = this.dataProgress.getCorrectAnswers();
    this.incorrectAnswers = this.dataProgress.getIncorrectAnswers();
    this.totalQuestions = this.dataProgress.getTotalQuestions();
    this.correctPorcentaje = this.dataProgress.getCorrectPorcentaje();
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
