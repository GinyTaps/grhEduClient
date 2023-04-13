import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EtablissementSecteur } from './etablissement-secteur.model';

@Injectable({
  providedIn: 'root'
})
export class EtablissementSecteurService {

    private resourceUrl = 'http://localhost:8087/api/findEtablissementSecteur';
    private resourceAllUrl = 'http://localhost:8087/api/findEtablissementSecteurs';
    private resourceCreateUrl = 'http://localhost:8087/api/createEtablissementSecteurs';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEtablissementSecteurs';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEtablissementSecteurs';
    
    etablissementSecteur: EtablissementSecteur;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(etablissementSecteur: EtablissementSecteur): Observable<EtablissementSecteur> {
          const copy = this.convert(etablissementSecteur);
          return this.http.post<EtablissementSecteur>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(etablissementSecteur: EtablissementSecteur): Observable<EtablissementSecteur> {
          const copy = this.convert(etablissementSecteur);
          return this.http.post<EtablissementSecteur>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(etabS): Observable<EtablissementSecteur> {
          const copy = this.convert(etabS);
          return this.http.post<EtablissementSecteur>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EtablissementSecteur> {
          return this.http.post<EtablissementSecteur>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, c:number): Observable<EtablissementSecteur> {
          let etabS = new EtablissementSecteur();
          etabS.id.codeEtablissement = id.toString();
          etabS.id.codeTypeSecteur = c.toString();
          const copy = this.convert(etabS);
          return this.http.post<EtablissementSecteur>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEtablissementSecteurs?mot =' + motCle);
       }

      private convert(etablissementSecteur: EtablissementSecteur): EtablissementSecteur {
          const copy: EtablissementSecteur = Object.assign({}, etablissementSecteur);
          return copy;
      }

}
