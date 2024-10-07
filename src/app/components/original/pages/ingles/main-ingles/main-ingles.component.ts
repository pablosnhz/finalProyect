import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-ingles',
  templateUrl: './main-ingles.component.html',
  styleUrls: ['./main-ingles.component.scss']
})
export class MainInglesComponent implements OnInit{
  ngOnInit(): void {
    this.scrollToTop();
  }

  scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  }
