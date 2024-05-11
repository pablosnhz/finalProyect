import { Component, OnDestroy, OnInit } from '@angular/core';
import { SheetsDatesService } from 'src/app/services/sheets-dates.service';

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

  private temporizadorInterval: any;
  private segundosTranscurridos: number = 0;

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
    this.segundosTranscurridos = parseInt(localStorage.getItem('segundosTranscurridos') || '0', 10);
    this.iniciarTemporizador();
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
      this.answeredQuestionsCounts[this.currentLevelIndex]++;
      if (this.answeredQuestionsCounts[this.currentLevelIndex] === 5) {
        document.getElementById('resetButton' + this.currentLevelIndex)!.removeAttribute('hidden');
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

  ngOnDestroy(): void {
    clearInterval(this.temporizadorInterval);
    localStorage.setItem('segundosTranscurridos', this.segundosTranscurridos.toString());
  }

  private iniciarTemporizador(): void {
    this.temporizadorInterval = setInterval(() => {
      this.segundosTranscurridos++;
      this.actualizarTemporizador();
    }, 1000);

    this.actualizarTemporizador(); // Actualizar el temporizador inmediatamente
  }

  private actualizarTemporizador(): void {
    const horas = Math.floor(this.segundosTranscurridos / 3600);
    const minutos = Math.floor((this.segundosTranscurridos % 3600) / 60);
    const segundosRestantes = this.segundosTranscurridos % 60;

    const temporizadorElement = document.getElementById('temporizador');
    if (temporizadorElement) {
      temporizadorElement.innerText = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
    }
  }

  resetQuestions(levelIndex: number) {
    this.selectedOptions[levelIndex] = new Array(5).fill(null);
    this.answeredQuestionsCounts[levelIndex] = 0;

    const options = document.querySelectorAll('input[name="options' + levelIndex + '"]');
    options.forEach((option: any) => {
      option.checked = false;
    });

    document.getElementById('resetButton' + levelIndex)!.setAttribute('hidden', 'true');
  }
}
