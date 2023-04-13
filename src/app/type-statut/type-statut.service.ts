import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeStatut } from './type-statut.model';

@Injectable({
  providedIn: 'root'
})
export class TypeStatutService {

    private resourceUrl = 'http://localhost:8087/api/findTypeStatut';
    private resourceAllUrl = 'http://localhost:8087/api/findTypeStatuts';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeStatuts';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeStatuts';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeStatuts';
    
    typeStatut: TypeStatut;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeStatut: TypeStatut): Observable<TypeStatut> {
          const copy = this.convert(typeStatut);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeStatut: TypeStatut): Observable<TypeStatut> {
          const copy = this.convert(typeStatut);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeStatut> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeStatut> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeStatuts?mot =' + motCle);
       }

      private convert(typeStatut: TypeStatut): TypeStatut {
          const copy: TypeStatut = Object.assign({}, typeStatut);
          return copy;
      }

}
