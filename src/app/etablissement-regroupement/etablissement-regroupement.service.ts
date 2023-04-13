import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtablissementRegroupement } from './etablissement-regroupement.model';

@Injectable({
  providedIn: 'root'
})
export class EtablissementRegroupementService {

    private resourceUrl = 'http://localhost:8087/api/findEtablissementRegroupement';
    private resourceAllUrl = 'http://localhost:8087/api/findEtablissementRegroupements';
    private resourceCreateUrl = 'http://localhost:8087/api/createEtablissementRegroupements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEtablissementRegroupements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEtablissementRegroupements';
    
    etablissementRegroupement: EtablissementRegroupement;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(etablissementRegroupement: EtablissementRegroupement): Observable<EtablissementRegroupement> {
          const copy = this.convert(etablissementRegroupement);
          return this.http.post<EtablissementRegroupement>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(etablissementRegroupement: EtablissementRegroupement): Observable<EtablissementRegroupement> {
          const copy = this.convert(etablissementRegroupement);
          return this.http.post<EtablissementRegroupement>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(etabR): Observable<EtablissementRegroupement> {
          const copy = this.convert(etabR);
          return this.http.post<EtablissementRegroupement>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EtablissementRegroupement> {
          return this.http.post<EtablissementRegroupement>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, c:number): Observable<EtablissementRegroupement> {
          let etabR = new EtablissementRegroupement();
          etabR.id.codeEtablissement = id.toString();
          etabR.id.codeRegroupement = c.toString();
          const copy = this.convert(etabR);
          return this.http.post<EtablissementRegroupement>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEtablissementRegroupements?mot =' + motCle);
       }

      private convert(etablissementRegroupement: EtablissementRegroupement): EtablissementRegroupement {
          const copy: EtablissementRegroupement = Object.assign({}, etablissementRegroupement);
          return copy;
      }

}
