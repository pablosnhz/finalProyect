import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-sociales',
  templateUrl: './main-sociales-grado.component.html',
  styleUrls: ['./main-sociales-grado.component.scss']
})
export class MainSocialesGradoComponent implements OnInit{
  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  }
