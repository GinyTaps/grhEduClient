import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { TypeMethodeAutorise } from '../type-methode-autorise/type-methode-autorise.model';

@Injectable({
  providedIn: 'root'
})
export class TypeMethodeAutoriseService {

    private resourceAllUrl = 'http://localhost:8080/findTypeMethodeAutorises';
    private resourceUrl = 'http://localhost:8080/findTypeMethodeAutorise';
    private resourceCreateUrl = 'http://localhost:8080/saveTypeMethodeAutorise';
    private resourceUpdateUrl = 'http://localhost:8080/updateTypeMethodeAutorise';
    private resourceDeleteUrl = 'http://localhost:8080/deleteTypeMethodeAutorise';
    
  constructor(
          private router: Router,
          private http: HttpClient,
          private authService: AuthService
  ) {}
  
  create(typeMethodeAutorise: TypeMethodeAutorise): Observable<TypeMethodeAutorise> {
      const copy = this.convert(typeMethodeAutorise);
      return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
  }

  update(typeMethodeAutorise: TypeMethodeAutorise): Observable<TypeMethodeAutorise> {
      const copy = this.convert(typeMethodeAutorise);
      return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
  }

  getAll() {
      return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
    }

  find(typeMethodeAutorise: TypeMethodeAutorise): Observable<TypeMethodeAutorise> {
      const copy = this.convert(typeMethodeAutorise);
      return this.http.post(`${this.resourceUrl}`, typeMethodeAutorise, {headers:this.authService.getHeader()});
  }
  

  query(req?: any) {
      return this.http.get(this.resourceUrl);
  }

  delete(idG: number): Observable<TypeMethodeAutorise> {
      return this.http.post(`${this.resourceDeleteUrl}`, +idG,{headers:this.authService.getHeader()});
  }
  
  search(motCle: string, typeMethodeAutorise: number, size: number) {
      console.log(motCle);
        return this.http.get('http://localhost:8080/chercherUsers?mot =' + motCle);
   }

  private convert(p: TypeMethodeAutorise): TypeMethodeAutorise {
      const copy: TypeMethodeAutorise = Object.assign({}, p);
      return copy;
  }
}
