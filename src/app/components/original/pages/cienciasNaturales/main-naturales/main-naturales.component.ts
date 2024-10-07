import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-naturales',
  templateUrl: './main-naturales.component.html',
  styleUrls: ['./main-naturales.component.scss']
})
export class MainNaturalesComponent implements OnInit{
ngOnInit(): void {
  this.scrollToTop();
}

scrollToTop() {
window.scrollTo({ top: 0, behavior: 'smooth' });
}

}




