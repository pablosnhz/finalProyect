import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-lectura',
  templateUrl: './main-lectura.component.html',
  styleUrls: ['./main-lectura.component.scss']
})
export class MainLecturaComponent implements OnInit {
  ngOnInit(): void {
    this.scrollToTop();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
