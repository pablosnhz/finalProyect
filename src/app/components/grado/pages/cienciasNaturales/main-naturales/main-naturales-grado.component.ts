import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-naturales',
  templateUrl: './main-naturales-grado.component.html',
  styleUrls: ['./main-naturales-grado.component.scss']
})
export class MainNaturalesGradoComponent implements OnInit{
  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  }




