import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeSituation } from './type-situation.model';

@Injectable({
  providedIn: 'root'
})
export class TypeSituationService {

    private resourceUrl = 'http://localhost:8087/api/findTypeSituation';
    private resourceAllUrl = 'http://localhost:8087/api/findTypeSituations';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeSituations';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeSituations';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeSituations';
    
    typeSituation: TypeSituation;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeSituation: TypeSituation): Observable<TypeSituation> {
          const copy = this.convert(typeSituation);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeSituation: TypeSituation): Observable<TypeSituation> {
          const copy = this.convert(typeSituation);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeSituation> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeSituation> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeSituations?mot =' + motCle);
       }

      private convert(typeSituation: TypeSituation): TypeSituation {
          const copy: TypeSituation = Object.assign({}, typeSituation);
          return copy;
      }
}
