import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

isNavbarCollapsed: boolean;
show: boolean;
hide: boolean;
user: string;

  constructor(
          private router: Router,
          public activatedRoute: ActivatedRoute,
          private loginService: LoginService,
          private authService: AuthService) {
    this.isNavbarCollapsed = true;
   }

  ngOnInit() {
      // this.show = true;
      this.show = false;
      this.hide = true;
  }

  isAuthenticated() {
    this.user = localStorage.getItem('username'); // pour savoir quel utilisateur est connecté
    return (localStorage.getItem('Groupes').indexOf('STAFF') >= 0 || localStorage.getItem('Groupes').indexOf('CUSTOMER') >= 0);

  }

  onLogout() {
      // this.router.navigateByUrl('/login');
      // this.router.navigate(['login']);
      // this.loginService.logout();
    this.router.navigate(['login']);
	  localStorage.clear();
      this.authService.initCredentials();
  }

  collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

}
