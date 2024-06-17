import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  deferredPrompt: any;

  constructor() {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }

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

    this.scrollToTop();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('se realizo la instalacion de la PWA');
        } else {
          console.log('no se realizo la instalacion de la PWA');
        }
        this.deferredPrompt = null;
      });
    }
  }

}
