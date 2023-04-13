import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private resourceUrl = 'http://localhost:8080/login';
  jwtToken: string;
  username: string;
  groupes: Array<string>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  saveToken(jwt: string) {
    localStorage.setItem('Token', jwt);
    // console.log(jwt);
    this.jwtToken = jwt;
    this.parseJWT();
  }

  parseJWT() {
    const jwtHelper = new JwtHelperService();
    const objWT = jwtHelper.decodeToken(this.jwtToken);
    this.username = objWT.sub; // sub représente withSubject qui est le username récupéré du côté serveur
    localStorage.setItem('username', this.username);
    // console.log('****** Contenu de username: '+ this.username);
    this.groupes = objWT.Groupes; // Groupes ici est la valeur du Claim définie du côté serveur
    // console.log('Groupes: '+ this.groupes);
    for(let g of this.groupes) {
      localStorage.setItem('Groupes', g);
    }
    /*console.log('Admin= '+this.isAdmin());
    console.log('Groupe '+this.groupes);*/
  }

  getHeader() {
    const header = new HttpHeaders({Authorization: this.jwtToken});
    // console.log(this.jwtToken);
    return header;
  }

  getHeaderForTree() {
    return this.jwtToken;
  }

  getGroupes() {
    // console.log(this.groupes);
    if(localStorage.getItem('Groupes').length >0) {
      // for (let g of localStorage.getItem('Groupes')) {
        this.groupes.push(localStorage.getItem('Groupes'));
      // }
    }
    return this.groupes;
  }

  loadCurrentUser() {
    return this.username;
  }

  isAdmin() {
    this.groupes.push(localStorage.getItem('Groupes'));
    // console.log(this.groupes.indexOf('STAFF') >= 0);
    return this.groupes.indexOf('STAFF') >= 0;
  }

  isUser() {
    this.groupes.push(localStorage.getItem('Groupes'));
    // console.log(this.groupes.indexOf('CUSTOMER') >= 0);
    return this.groupes.indexOf('CUSTOMER') >= 0;
    // return this.roles.includes('USER');
  }


  isAuthenticated() {
    return this.groupes && (this.isAdmin() || this.isUser());
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('Token');
    this.parseJWT();
  }

  initCredentials() {
    this.jwtToken = undefined;
    this.username = undefined;
    this.groupes = undefined;
  }
}
