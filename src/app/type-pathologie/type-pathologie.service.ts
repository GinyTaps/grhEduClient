import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypePathologie } from './type-pathologie.model';

@Injectable({
  providedIn: 'root'
})
export class TypePathologieService {

    private resourceUrl = 'http://localhost:8087/api/findTypePathologie';
    private resourceAllUrl = 'http://localhost:8087/api/findTypePathologies';
    private resourceLastUrl = 'http://localhost:8087/api/findLastHandicap';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypePathologies';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypePathologies';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypePathologies';
    
    typePathologie: TypePathologie;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typePathologie: TypePathologie): Observable<TypePathologie> {
          const copy = this.convert(typePathologie);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typePathologie: TypePathologie): Observable<TypePathologie> {
          const copy = this.convert(typePathologie);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypePathologie> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number): Observable<TypePathologie> {
          return this.http.post(`${this.resourceLastUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypePathologie> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypePathologies?mot =' + motCle);
       }

      private convert(typePathologie: TypePathologie): TypePathologie {
          const copy: TypePathologie = Object.assign({}, typePathologie);
          return copy;
      }

}
