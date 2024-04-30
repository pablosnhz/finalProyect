import { Component } from '@angular/core';
import { SheetsDatesService } from 'src/app/services/sheets-dates.service';

@Component({
  selector: 'app-niveles-matematica',
  templateUrl: './niveles-matematica.component.html',
  styleUrls: ['./niveles-matematica.component.scss']
})
export class NivelesMatematicaComponent {

  data: any[] = [];
  imagesLoaded: boolean = false;

  constructor(private sheetsDatesService: SheetsDatesService) { }

  ngOnInit(): void {
    this.sheetsDatesService.getSheets().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
      console.error('Error fetching sheets data:', error);
      }
    );
  }


  getImages() {
    this.sheetsDatesService.getSheets().subscribe(
      (data) => {
        this.data = data;
        this.imagesLoaded = true;
        console.log(data)
      },
      (error) => {
        console.error('Error fetching dates:', error);
      }
    );
  }


}

