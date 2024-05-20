import { Component, OnInit } from '@angular/core';
import { DataProgressService } from 'src/app/core/services/common/data-progress.service';

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

  constructor(private dataProgress: DataProgressService) { }

  ngOnInit(): void {
    this.correctAnswers = this.dataProgress.getCorrectAnswers();
    this.incorrectAnswers = this.dataProgress.getIncorrectAnswers();
    this.totalQuestions = this.dataProgress.getTotalQuestions();
    this.correctPorcentaje = this.dataProgress.getCorrectPorcentaje();
  }
}
