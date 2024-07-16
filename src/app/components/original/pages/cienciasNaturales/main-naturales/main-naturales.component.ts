import { Component } from '@angular/core';

@Component({
  selector: 'app-main-naturales',
  templateUrl: './main-naturales.component.html',
  styleUrls: ['./main-naturales.component.scss']
})
export class MainNaturalesComponent {


scrollToTop() {
window.scrollTo({ top: 0, behavior: 'smooth' });
}

}




