import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeEchelon } from './type-echelon.model';

@Injectable({
  providedIn: 'root'
})
export class TypeEchelonService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeEchelons';
    private resourceUrl = 'http://localhost:8087/api/findTypeEchelon';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeEchelons';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeEchelons';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeEchelons';
    
    typeEchelon: TypeEchelon;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeEchelon: TypeEchelon): Observable<TypeEchelon> {
          const copy = this.convert(typeEchelon);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeEchelon: TypeEchelon): Observable<TypeEchelon> {
          const copy = this.convert(typeEchelon);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeEchelon> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeEchelon> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeEchelons?mot =' + motCle);
       }

      private convert(typeEchelon: TypeEchelon): TypeEchelon {
          const copy: TypeEchelon = Object.assign({}, typeEchelon);
          return copy;
      }

}
