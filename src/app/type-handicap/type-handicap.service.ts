import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeHandicap } from './type-handicap.model';

@Injectable({
  providedIn: 'root'
})
export class TypeHandicapService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeHandicaps';
    private resourceUrl = 'http://localhost:8087/api/findTypeHandicap';
    private resourceLastUrl = 'http://localhost:8087/api/findLastHandicap';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeHandicaps';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeHandicaps';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeHandicaps';
    
    typeHandicap: TypeHandicap;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeHandicap: TypeHandicap): Observable<TypeHandicap> {
          const copy = this.convert(typeHandicap);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeHandicap: TypeHandicap): Observable<TypeHandicap> {
          const copy = this.convert(typeHandicap);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeHandicap> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number): Observable<TypeHandicap> {
          return this.http.post(`${this.resourceLastUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeHandicap> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeHandicaps?mot =' + motCle);
       }

      private convert(typeHandicap: TypeHandicap): TypeHandicap {
          const copy: TypeHandicap = Object.assign({}, typeHandicap);
          return copy;
      }
      
}
