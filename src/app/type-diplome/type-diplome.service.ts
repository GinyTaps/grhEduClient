import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeDiplome } from './type-diplome.model';

@Injectable({
  providedIn: 'root'
})
export class TypeDiplomeService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeDiplomes';
    private resourceUrl = 'http://localhost:8087/api/findTypeDiplome';
    private resourceLastUrl = 'http://localhost:8087/api/findLastHandicap';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeDiplomes';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeDiplomes';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeDiplomes';
    
    typeDiplome: TypeDiplome;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeDiplome: TypeDiplome): Observable<TypeDiplome> {
          const copy = this.convert(typeDiplome);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeDiplome: TypeDiplome): Observable<TypeDiplome> {
          const copy = this.convert(typeDiplome);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeDiplome> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number): Observable<TypeDiplome> {
          return this.http.post(`${this.resourceLastUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeDiplome> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeDiplomes?mot =' + motCle);
       }

      private convert(typeDiplome: TypeDiplome): TypeDiplome {
          const copy: TypeDiplome = Object.assign({}, typeDiplome);
          return copy;
      }

}
