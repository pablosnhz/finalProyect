import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit{
  constructor( public auth: AuthService , private router: Router){}

  ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     this.grado = +params['grado'] || 9;
  //   });

  //   this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
  //     if (isAuthenticated) {
  //       console.log('accedio?', isAuthenticated)
  //       this.router.navigate(['/materias'], { queryParams: { grado: this.grado } });
  //     }
  //   })
  // }

    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log('accedio?', isAuthenticated)
        this.router.navigate(['/materias']);
      }
    })
  }

  login(){
    this.auth.loginWithRedirect();
  }
}
