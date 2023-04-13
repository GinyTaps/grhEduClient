import { Injectable} from '@angular/core';
import { TypeTitre } from './type-titre.model';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeTitreService {

    private resourceUrl = 'http://localhost:8087/api/findTypeTitre';
    private resourceAllUrl = 'http://localhost:8087/api/findTypeTitres';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeTitres';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeTitres';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeTitres';
    
    typeTitre: TypeTitre;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeTitre: TypeTitre): Observable<TypeTitre> {
          const copy = this.convert(typeTitre);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeTitre: TypeTitre): Observable<TypeTitre> {
          const copy = this.convert(typeTitre);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeTitre> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeTitre> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeTitres?mot =' + motCle);
       }

      private convert(typeTitre: TypeTitre): TypeTitre {
          const copy: TypeTitre = Object.assign({}, typeTitre);
          return copy;
      }

      
}
