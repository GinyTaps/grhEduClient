import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeStatutEtablissement } from './type-statut-etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class TypeStatutEtablissementService {

    private resourceUrl = 'http://localhost:8087/api/findTypeStatutEtablissement';
    private resourceAllUrl = 'http://localhost:8087/api/findTypeStatutEtablissements';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeStatutEtablissements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeStatutEtablissements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeStatutEtablissements';
    
    typeStatutEtablissement: TypeStatutEtablissement;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeStatutEtablissement: TypeStatutEtablissement): Observable<TypeStatutEtablissement> {
          const copy = this.convert(typeStatutEtablissement);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeStatutEtablissement: TypeStatutEtablissement): Observable<TypeStatutEtablissement> {
          const copy = this.convert(typeStatutEtablissement);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeStatutEtablissement> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeStatutEtablissement> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeStatutEtablissements?mot =' + motCle);
       }

      private convert(typeStatutEtablissement: TypeStatutEtablissement): TypeStatutEtablissement {
          const copy: TypeStatutEtablissement = Object.assign({}, typeStatutEtablissement);
          return copy;
      }

}
