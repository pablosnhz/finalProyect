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
  currentQuestionIndex: number | null = null;
  modalIds: string[] = [];
  correctAnswerIndices: Set<number> = new Set<number>();

  constructor(private sheetsService: SheetsDatesService) { }

  ngOnInit(): void {
    this.sheetsService.getSheets().subscribe(data => {
      this.questionsData = data;
      this.modalIds = data.map((_, index) => `static${index}`);
      // Inicializamos currentQuestionIndex al primer índice
      this.currentQuestionIndex = 0;

      this.iniciarTemporizador()
    });
  }

  prevQuestion() {
    if (this.currentQuestionIndex !== null && this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex !== null && this.currentQuestionIndex < this.questionsData.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  isAnswerCorrect(index: number, selectedOption: string | null): boolean {
    if (selectedOption === null) {
      return false; // Si no se ha seleccionado ninguna opción, consideramos la respuesta incorrecta.
    }
    const pregunta = this.questionsData[index];
    return pregunta.respuestas === selectedOption;
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



