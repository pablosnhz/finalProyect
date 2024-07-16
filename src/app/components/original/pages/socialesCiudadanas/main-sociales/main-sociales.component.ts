import { Component } from '@angular/core';

@Component({
  selector: 'app-main-sociales',
  templateUrl: './main-sociales.component.html',
  styleUrls: ['./main-sociales.component.scss']
})
export class MainSocialesComponent {


scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


}
