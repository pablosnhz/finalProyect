import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  origin: string | null | undefined;
  @ViewChild('navbarNav') navbarNav!: ElementRef;
  deferredPrompt: any;
  isAuthenticated = false;

  // android ios buttons carrusel
  isAndroidVisible: boolean = false;
  isIosVisible: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }

  ngOnInit(): void {
    // auth para el condicional de GRADO y INICIAR
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.origin = localStorage.getItem('origin');
      }
    });

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

  // variante de botones para las dos rutas de botones GRADO y INICIAR
  navigateToLogin(origin: string) {
    localStorage.setItem('origin', origin);
    const route = origin === 'iniciar' ? '/iniciar' : '/grado';
    this.router.navigate([route], { queryParams: { origin } });
  }
  isButtonVisible(buttonType: string): boolean {
    const origin = localStorage.getItem('origin');
    return !this.isAuthenticated || origin === buttonType;
  }


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


  // botones carrusel slider img
  showAndroidCarousel(): void {
    this.isAndroidVisible = true;
    this.isIosVisible = false;
  }

  showIosCarousel(): void {
    this.isIosVisible = true;
    this.isAndroidVisible = false;
  }
}
