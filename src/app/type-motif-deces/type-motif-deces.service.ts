import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeMotifDeces } from './type-motif-deces.model';

@Injectable({
  providedIn: 'root'
})
export class TypeMotifDecesService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeMotifDeces';
    private resourceUrl = 'http://localhost:8087/api/findTypeMotifDece';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeMotifDeces';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeMotifDeces';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeMotifDeces';
    
    typeMotifDeces: TypeMotifDeces;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeMotifDeces: TypeMotifDeces): Observable<TypeMotifDeces> {
          const copy = this.convert(typeMotifDeces);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeMotifDeces: TypeMotifDeces): Observable<TypeMotifDeces> {
          const copy = this.convert(typeMotifDeces);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeMotifDeces> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeMotifDeces> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeMotifDecess?mot =' + motCle);
       }

      private convert(typeMotifDeces: TypeMotifDeces): TypeMotifDeces {
          const copy: TypeMotifDeces = Object.assign({}, typeMotifDeces);
          return copy;
      }

}
