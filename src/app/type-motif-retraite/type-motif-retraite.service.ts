import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeMotifRetraite } from './type-motif-retraite.model';

@Injectable({
  providedIn: 'root'
})
export class TypeMotifRetraiteService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeMotifRetraites';
    private resourceUrl = 'http://localhost:8087/api/findTypeMotifRetraite';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeMotifRetraites';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeMotifRetraites';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeMotifRetraites';
    
    typeMotifRetraite: TypeMotifRetraite;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeMotifRetraite: TypeMotifRetraite): Observable<TypeMotifRetraite> {
          const copy = this.convert(typeMotifRetraite);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeMotifRetraite: TypeMotifRetraite): Observable<TypeMotifRetraite> {
          const copy = this.convert(typeMotifRetraite);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeMotifRetraite> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeMotifRetraite> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeMotifRetraites?mot =' + motCle);
       }

      private convert(typeMotifRetraite: TypeMotifRetraite): TypeMotifRetraite {
          const copy: TypeMotifRetraite = Object.assign({}, typeMotifRetraite);
          return copy;
      }

}
