import { Component } from '@angular/core';
import { SheetsDatesService } from 'src/app/services/sheets-dates.service';


@Component({
  selector: 'app-niveles-matematica',
  templateUrl: './niveles-matematica.component.html',
  styleUrls: ['./niveles-matematica.component.scss']
})
export class NivelesMatematicaComponent {

datos: any[] = [];

selectedOption: string | null = null;
  questionsData: any[] = [];
  levels: any[] = [];
  currentLevelIndex: number = 0;
  currentQuestionIndex: number | null = null;
  modalIds: string[] = [];
  selectedOptions: (string | null)[] = [];


constructor(private sheetsService: SheetsDatesService) { }

ngOnInit(): void {
  this.sheetsService.getSheets().subscribe(data => {
    this.questionsData = data;
    const numQuestionsPerLevel = 5;
    for (let i = 0; i < this.questionsData.length; i += numQuestionsPerLevel) {
      this.levels.push(this.questionsData.slice(i, i + numQuestionsPerLevel));
    }
    this.selectedOptions = new Array(this.questionsData.length).fill(null);
    this.currentQuestionIndex = 0;

    this.iniciarTemporizador();
  });
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

prevQuestion() {
  if (this.currentQuestionIndex !== null && this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
  }
}

nextQuestion() {
  if (this.currentQuestionIndex !== null && this.currentQuestionIndex < this.levels[this.currentLevelIndex].length - 1) {
    this.currentQuestionIndex++;
  }
}

isAnswerCorrect(index: number): boolean {
  const pregunta = this.questionsData[index];
  const selectedOption = this.selectedOptions[index];
  if (selectedOption === null) {
    return false;
  }
  return pregunta.respuestas === pregunta[selectedOption];
}



onOptionSelected(index: number, opcion: string) {
  this.selectedOptions[index] = opcion;
  this.selectedOption = opcion;
  this.levels[this.currentLevelIndex][index].answered = true;
}

iniciarTemporizador() {
  let segundos = 0;
  setInterval(() => {
    segundos++;
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;
    const temporizadorElement = document.getElementById('temporizador');
    if (temporizadorElement) {
      temporizadorElement.innerText = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
    }
  }, 1000);
}

}















  // ngOnInit(): void {
  //   this.sheetsService.getSheets().subscribe((data: any) => {
  //     this.datos = data;
  //     console.log('Datos del CSV:', data);
  //   })
  // }



