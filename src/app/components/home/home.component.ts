import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {
    document.addEventListener("scroll", () => {
      const goTopContainer = document.querySelector(".go-top-container");
      if (goTopContainer) {
        if (document.documentElement.scrollTop > 200) {
          goTopContainer.classList.add("deslizar");
        } else {
          goTopContainer.classList.remove("deslizar");
        }
      }
    });

    const goTopElement = document.querySelector('.go-top-container');
    if (goTopElement) {
      goTopElement.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  }
}
