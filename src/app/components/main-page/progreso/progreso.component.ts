import { Component, OnInit } from '@angular/core';
import { DataProgressService } from 'src/app/core/services/common/data-progress.service';
import { ResetGameButtonService } from 'src/app/core/services/common/reset-game-button.service';
import { TimeFinalService } from 'src/app/core/services/common/time-final.service';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.scss']
})
export class ProgresoComponent implements OnInit{
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  totalQuestions: number = 0;
  correctPorcentaje: number = 0;

  finalTimer: number | undefined;

  constructor(private dataProgress: DataProgressService,
              private resetGameService: ResetGameButtonService,
              private finalTimerService: TimeFinalService) {
    this.finalTimerService.getFinalTime().subscribe((time: number) => {
      this.finalTimer = time;
    });
  }

  ngOnInit(): void {
    this.updateProgress();
    this.dataProgress.progressUpdated.subscribe(() => {
      this.updateProgress();
    });

    this.finalTimerService.getFinalTime().subscribe((time: number) => {
      this.finalTimer = time;
      console.log("Final timer received:", this.finalTimer);
    });
  }

  onResetGame() {
    this.resetGameService.triggerResetGame();
  }

  updateProgress() {
    this.correctAnswers = this.dataProgress.getCorrectAnswers();
    this.incorrectAnswers = this.dataProgress.getIncorrectAnswers();
    this.totalQuestions = this.dataProgress.getTotalQuestions();
    this.correctPorcentaje = this.dataProgress.getCorrectPorcentaje();
  }
}
