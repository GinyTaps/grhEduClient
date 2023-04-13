import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poste } from './poste.model';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

    private resourceUrl = 'http://localhost:8087/api/findPoste';
    private resourceAllUrl = 'http://localhost:8087/api/findPostes';
    private resourceLastUrl = 'http://localhost:8087/api/findLastPosteOfEmploye';
    private resourceLastPUrl = 'http://localhost:8087/api/findLastPoste';
    private resourceCreateUrl = 'http://localhost:8087/api/createPostes';
    private resourceUpdateUrl = 'http://localhost:8087/api/updatePostes';
    private resourceDeleteUrl = 'http://localhost:8087/api/deletePostes';
    
    poste: Poste;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(poste: Poste): Observable<Poste> {
          const copy = this.convert(poste);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(poste: Poste): Observable<Poste> {
          const copy = this.convert(poste);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<Poste> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number): Observable<Poste> {
          return this.http.post(`${this.resourceLastUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLastP(id: number): Observable<Poste> {
          return this.http.post(`${this.resourceLastPUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<Poste> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherPostes?mot =' + motCle);
       }

      private convert(poste: Poste): Poste {
          const copy: Poste = Object.assign({}, poste);
          return copy;
      }

}
