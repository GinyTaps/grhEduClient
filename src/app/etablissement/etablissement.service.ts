import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etablissement } from './etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

    private resourceAllUrl = 'http://localhost:8087/api/findEtablissements';
    private resourceUrl = 'http://localhost:8087/api/findEtablissement';
    private resourceCreateUrl = 'http://localhost:8087/api/createEtablissements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEtablissements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEtablissements';
    private searchListUrl = 'http://localhost:8087/api/chercherListEtab';
    
    etablissement: Etablissement;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(etablissement: Etablissement): Observable<Etablissement> {
          const copy = this.convert(etablissement);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(etablissement: Etablissement): Observable<Etablissement> {
          const copy = this.convert(etablissement);
          return this.http.post<Etablissement>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<Etablissement> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<Etablissement> {
          return this.http.post(this.resourceDeleteUrl, +id,{headers:this.authService.getHeader()});
      }
      
      searchList(id: number) {
          return this.http.post(`${this.searchListUrl}`, +id, {headers:this.authService.getHeader()});
        }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEtablissements?mot =' + motCle);
       }

      private convert(etablissement: Etablissement): Etablissement {
          const copy: Etablissement = Object.assign({}, etablissement);
          return copy;
      }

}
