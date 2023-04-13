import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeSecteur } from './type-secteur.model';

@Injectable({
  providedIn: 'root'
})
export class TypeSecteurService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeSecteurs';
    private resourceUrl = 'http://localhost:8087/api/findTypeSecteur';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeSecteurs';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeSecteurs';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeSecteurs';
    
    typeSecteur: TypeSecteur;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeSecteur: TypeSecteur): Observable<TypeSecteur> {
          const copy = this.convert(typeSecteur);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeSecteur: TypeSecteur): Observable<TypeSecteur> {
          const copy = this.convert(typeSecteur);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeSecteur> {
          // console.log('********* Dans le service ************');
          // console.log(id);
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeSecteur> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeSecteurs?mot =' + motCle);
       }

      private convert(typeSecteur: TypeSecteur): TypeSecteur {
          const copy: TypeSecteur = Object.assign({}, typeSecteur);
          return copy;
      }

}
