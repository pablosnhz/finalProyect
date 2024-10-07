import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-ingles',
  templateUrl: './main-ingles-grado.component.html',
  styleUrls: ['./main-ingles-grado.component.scss']
})
export class MainInglesGradoComponent implements OnInit{
  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  }
