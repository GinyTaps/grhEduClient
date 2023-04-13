import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {
    
    private resourceUrl = 'http://localhost:8080/login';
    private resourceRecupPassUrl = 'http://localhost:8080/recupPassword';
    private resourceVerifCUrl = 'http://localhost:8080/verifCode';
    private resourceReInitPassUrl = 'http://localhost:8080/reInitPassword';
    jwtToken: string;
    username: string;
    user: User;
    groupes: Array<string>;
    // roles: Array<string>;

  constructor(
          private router: Router,
          private http: HttpClient,
          private authService: AuthService) {
      
  }
  
  login(data) {
      return this.http.post(this.resourceUrl, data, {observe: 'response'}) // {observe: 'response'} permet de récupérer toute la réponse à savoir l'entête, le corps
  }
  
  recupPass(email: string) {
      return this.http.get(`${this.resourceRecupPassUrl}/${email}`);
  }
  
  verifCode(email: string, code: number) {
      return this.http.get(`${this.resourceVerifCUrl}/${email}/${code}`);
  }
  
  reInitPass(u: User, pc: string, e: string, c: number): Observable<User> {
      const copy = this.convert(u);
      return this.http.post(`${this.resourceReInitPassUrl}/${pc}/${e}/${c}`, copy); // , {headers:this.authService.getHeader()});
  }
  
  logout() {
      localStorage.clear(); // removeItem('Token');
      this.authService.initCredentials();
		this.router.navigate(['login']);
  }
  
  private convert(user: User): User {
      const copy: User = Object.assign({}, user);
      return copy;
  }
  
}
