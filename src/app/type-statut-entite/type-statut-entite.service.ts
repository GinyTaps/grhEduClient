import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeStatutEntite } from './type-statut-entite.model';

@Injectable({
  providedIn: 'root'
})
export class TypeStatutEntiteService {

    private resourceUrl = 'http://localhost:8087/api/findTypeStatutEntite';
    private resourceAllUrl = 'http://localhost:8087/api/findTypeStatutEntites';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeStatutEntites';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeStatutEntites';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeStatutEntites';
    
    typeStatutEntite: TypeStatutEntite;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeStatutEntite: TypeStatutEntite): Observable<TypeStatutEntite> {
          const copy = this.convert(typeStatutEntite);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeStatutEntite: TypeStatutEntite): Observable<TypeStatutEntite> {
          const copy = this.convert(typeStatutEntite);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeStatutEntite> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeStatutEntite> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeStatutEntites?mot =' + motCle);
       }

      private convert(typeStatutEntite: TypeStatutEntite): TypeStatutEntite {
          const copy: TypeStatutEntite = Object.assign({}, typeStatutEntite);
          return copy;
      }

}
