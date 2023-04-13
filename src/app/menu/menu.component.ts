import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupePage } from '../groupe-page/groupe-page.model';
import { GroupePageService } from '../groupe-page/groupe-page.service';
import { Profile } from '../profile/profile.model';
import { LoginComponent } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    show: boolean;
    user: string;
    groupePage: GroupePage;
    roles: string[];

  constructor(
          private login: LoginComponent,
          private groupePageService: GroupePageService,
          private authService: AuthService,
          private router: Router,
          private http: HttpClient,
          private ngxRolesService: NgxRolesService,
          private permissionsService: NgxPermissionsService,
          private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isAuthenticated();
  }

  isUser() {
      return this.authService.isUser();
  }

  /*isAuthorised() {
      if(this.isAuthenticated()) {
          this.login.hasAuthority();
      } else {

      }

  }*/

  isAdmin() {
      return this.authService.isAdmin();
  }

  isAuthenticated() {
      // console.log(this.login.groupePagesL);
    if(localStorage.getItem('Groupes').indexOf('STAFF') >= 0 || localStorage.getItem('Groupes').indexOf('CUSTOMER') >= 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.user = localStorage.getItem('username'); // pour savoir quel utilisateur est connecté
    return (localStorage.getItem('Groupes').indexOf('STAFF') >= 0 || localStorage.getItem('Groupes').indexOf('CUSTOMER') >= 0);

    /*if(this.authService.isAuthenticated || this.authService.jwtToken) {
		this.user = this.authService.loadCurrentUser(); //pour savoir quel utilisateur est connecté
		return this.show = true;
	} else {
		return this.show = false;
	}*/

      // return this.authService.isAuthenticated();

      /*if(this.authService.isAuthenticated()) { // && this.login.isAuthorised()) {
          this.user = this.authService.loadCurrentUser();
          this.permissionsService.loadPermissions(this.authService.getGroupes());
          this.roles = this.authService.getGroupes();*/
          // this.login.isAuthorised();
          /*this.http.get('url').subscribe( (perm) => {

              this.permissionsService.loadPermissions(perm);
           })*/
          /*this.groupePageService.getAll().subscribe( res => {
              this.login.hasAuthority(res);
          });*/

          // pour gérer l'accessibilité de certaines pages
          /*if(this.authService.getGroupes().includes('ADMIN')) {
              // console.log(true);
              this.show = true;
          } else {
              // console.log(false);
              this.show = false;
          }

          return this.authService.isAuthenticated();
      } else {
          return true
      }*/
      /*this.user = this.authService.loadCurrentUser(); //pour savoir quel utilisateur est connecté
      return this.authService.isAuthenticated();*/
  }

}
