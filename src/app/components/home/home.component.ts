import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  @ViewChild('navbarNav') navbarNav!: ElementRef;
  deferredPrompt: any;

  constructor(private router: Router) {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }

  ngOnInit(): void {
    this.setupNavigationLinks();

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

  // iniciar(grado: number) {
  //   this.router.navigate(['/login'], { queryParams: { grado } });
  // }

  // navigate links specifically
  setupNavigationLinks() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = (link.getAttribute('href') as string).substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 300,
            behavior: 'smooth'
          });
          if (this.navbarNav.nativeElement.classList.contains('show')) {
            this.navbarNav.nativeElement.classList.remove('show');
          }
        }
      });
    });
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
