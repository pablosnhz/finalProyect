import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit{
  origin: string | undefined;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.origin = params['origin'];
      if (this.origin) {
        localStorage.setItem('origin', this.origin);
      }
    });

    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('Accedió:', isAuthenticated);
        const origin = localStorage.getItem('origin');
        this.router.navigate(['/materias', origin]);
      }
    });
}
login() {
  this.auth.loginWithRedirect();
}

}
