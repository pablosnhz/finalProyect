import { Component } from '@angular/core';
import { SheetsDatesService } from 'src/app/services/sheets-dates.service';

@Component({
  selector: 'app-niveles-matematica',
  templateUrl: './niveles-matematica.component.html',
  styleUrls: ['./niveles-matematica.component.scss']
})
export class NivelesMatematicaComponent {

//   questionsData: any[] = [];
//   currentQuestionIndex = 0;
//   totalQuestionsToShow = 15;
//   currentLevel = 1;

  constructor(private sheetsService: SheetsDatesService) {}

  ngOnInit(): void {
    this.sheetsService.getSheets().subscribe((data: any) => {
      // Aquí puedes hacer lo que quieras con los datos obtenidos del CSV
      console.log('Datos del CSV:', data);
    })
  }
//   ngOnInit(): void {
//     this.loadQuestions(this.currentLevel);
//   }

//   loadQuestions(nivel: number) {
//     this.sheetsService.getSheets().subscribe(
//       (contenido: any[]) => {
//         this.questionsData = contenido.filter(item => item.nivel === nivel);
//         this.questionsData = this.questionsData.slice(0, this.totalQuestionsToShow);
//         this.showQuestion(this.currentQuestionIndex);
//       },
//       error => {
//         console.error('Error fetching questions data:', error);
//       }
//     );
//   }

//   showQuestion(index: number) {
//     const pregunta = this.questionsData[index];
//     const storedResponse = localStorage.getItem(`response_${this.currentLevel}_${index}`);
//     const storedCorrect = localStorage.getItem(`correct_${this.currentLevel}_${index}`);

//     // Crear el elemento HTML para mostrar la pregunta y sus opciones
//     const questionDiv = document.createElement('div');
//     questionDiv.classList.add('container', 'mt-sm-5', 'my-1');

//     questionDiv.innerHTML = `
//       <div class="question ml-sm-5 pl-sm-5 pt-2">
//           <div class="py-2 h5 mb-4"><b>Pregunta ${pregunta.pregunta}: ${pregunta.enunciado}</b></div>
//           <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options${index}">
//               <div class="option mb-3">
//                   <input type="radio" id="option_a" name="options${index}" value="a" ${(storedResponse === 'a') ? 'checked' : ''} ${storedResponse ? 'disabled' : ''}>
//                   <label for="option_a">A) ${pregunta.opcion_a}</label>
//               </div>
//               <div class="option mb-3">
//                   <input type="radio" id="option_b" name="options${index}" value="b" ${(storedResponse === 'b') ? 'checked' : ''} ${storedResponse ? 'disabled' : ''}>
//                   <label for="option_b">B) ${pregunta.opcion_b}</label>
//               </div>
//               <div class="option mb-3">
//                   <input type="radio" id="option_c" name="options${index}" value="c" ${(storedResponse === 'c') ? 'checked' : ''} ${storedResponse ? 'disabled' : ''}>
//                   <label for="option_c">C) ${pregunta.opcion_c}</label>
//               </div>
//               <div class="option mb-3">
//                   <input type="radio" id="option_d" name="options${index}" value="d" ${(storedResponse === 'd') ? 'checked' : ''} ${storedResponse ? 'disabled' : ''}>
//                   <label for="option_d">D) ${pregunta.opcion_d}</label>
//               </div>
//           </div>
//           <div class="alert alert-success alert-dismissible fade show text-center ${storedCorrect === 'true' ? '' : 'd-none'}" id="alertCorrect${index}" role="alert">
//               <strong>¡Respuesta correcta!</strong>
//               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//           </div>

//           <div class="alert alert-danger alert-dismissible fade show text-center ${storedCorrect === 'false' ? '' : 'd-none'}" id="alertIncorrect${index}" role="alert">
//               <strong>La respuesta correcta era: ${pregunta.respuestas}</strong>
//               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//               <a href="#" class="bg-transparent border-0 justification-link" data-bs-toggle="modal" data-bs-target="#static${index}">
//                   <strong>Conocé la justificación. Haz Click aquí.</strong>
//               </a>
//           </div>

//           <!-- Modal -->
//           <div class="modal fade" id="static${index}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//               <div class="modal-dialog modal-dialog-centered">
//                   <div class="modal-content">
//                       <div class="modal-body">
//                           ${pregunta.explicacion}
//                       </div>
//                   <div class="modal-footer">
//                       <button type="button" class="btn btn-gray border border-dark text-black" data-bs-dismiss="modal">Ok! Gracias.</button>
//                   </div>
//               </div>
//           </div>
//           </div>
//       </div>
//   `;


// }
// }
  // data: any[] = [];
  // imagesLoaded: boolean = false;

  // constructor(private sheetsDatesService: SheetsDatesService) { }

  // ngOnInit(): void {
  //   this.sheetsDatesService.getSheets().subscribe(
  //     (data) => {
  //       this.data = data;
  //     },
  //     (error) => {
  //     console.error('Error fetching sheets data:', error);
  //     }
  //   );
  // }




  // getImages() {
  //   this.sheetsDatesService.getSheets().subscribe(
  //     (data) => {
  //       this.imagesLoaded = true;
  //       this.data = data;
  //       console.log(data)
  //     },
  //     (error) => {
  //       console.error('Error fetching dates:', error);
  //     }
  //   );
  // }

}


