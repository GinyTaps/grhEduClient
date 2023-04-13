import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeEtablissement } from './type-etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class TypeEtablissementService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeEtablissements';
    private resourceUrl = 'http://localhost:8087/api/findTypeEtablissement';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeEtablissements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeEtablissements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeEtablissements';
    
    typeEtablissement: TypeEtablissement;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeEtablissement: TypeEtablissement): Observable<TypeEtablissement> {
          const copy = this.convert(typeEtablissement);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeEtablissement: TypeEtablissement): Observable<TypeEtablissement> {
          const copy = this.convert(typeEtablissement);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeEtablissement> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeEtablissement> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeEtablissements?mot =' + motCle);
       }

      private convert(typeEtablissement: TypeEtablissement): TypeEtablissement {
          const copy: TypeEtablissement = Object.assign({}, typeEtablissement);
          return copy;
      }

}
