import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeFonction } from './type-fonction.model';

@Injectable({
  providedIn: 'root'
})
export class TypeFonctionService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeFonctions';
    private resourceUrl = 'http://localhost:8087/api/findTypeFonction';
    private resourceLastUrl = 'http://localhost:8087/api/findLastFonction';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeFonctions';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeFonctions';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeFonctions';
    
    typeFonction: TypeFonction;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeFonction: TypeFonction): Observable<TypeFonction> {
          const copy = this.convert(typeFonction);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeFonction: TypeFonction): Observable<TypeFonction> {
          const copy = this.convert(typeFonction);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeFonction> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number): Observable<TypeFonction> {
          return this.http.post(`${this.resourceLastUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeFonction> {
          return this.http.post(`${this.resourceDeleteUrl}`,+id, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeFonctions?mot =' + motCle);
       }

      private convert(typeFonction: TypeFonction): TypeFonction {
          const copy: TypeFonction = Object.assign({}, typeFonction);
          return copy;
      }

}
