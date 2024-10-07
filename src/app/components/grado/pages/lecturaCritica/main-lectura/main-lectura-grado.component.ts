import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-lectura',
  templateUrl: './main-lectura-grado.component.html',
  styleUrls: ['./main-lectura-grado.component.scss']
})
export class MainLecturaGradoComponent implements OnInit{
  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  }
