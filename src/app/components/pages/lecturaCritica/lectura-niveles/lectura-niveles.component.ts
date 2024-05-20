import { Component } from '@angular/core';
import { PruebasheetsService } from 'src/app/core/services/common/pruebasheets.service';

@Component({
  selector: 'app-lectura-niveles',
  templateUrl: './lectura-niveles.component.html',
  styleUrls: ['./lectura-niveles.component.scss']
})
export class LecturaNivelesComponent {

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


  constructor(private pruebasSheets: PruebasheetsService) { }

  ngOnInit(): void {
  }

    primerSheets(): void {
      this.pruebasSheets.getMilquestions().subscribe(data => {
        this.setupQuestions(data);
      });
    }

    segundoSheets(): void {
      this.pruebasSheets.getMilquestionsDos().subscribe(data => {
        this.setupQuestions(data);
      });
    }

    private setupQuestions(data: any[]): void {
      this.questionsData = data;
      this.levels = [];
      this.answeredQuestionsCounts = [];
      const numQuestionsPerLevel = 5;
      for (let i = 0; i < this.questionsData.length; i += numQuestionsPerLevel) {
        this.levels.push(this.questionsData.slice(i, i + numQuestionsPerLevel));
        this.answeredQuestionsCounts.push(0);
      }
      this.selectedOptions = this.levels.map(() => new Array(5).fill(null));
      this.modalIds = this.questionsData.map((_, index) => 'modal_' + index);
    }
}


