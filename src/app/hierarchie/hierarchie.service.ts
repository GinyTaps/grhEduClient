import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hierarchie } from './hierarchie.model';

@Injectable({
  providedIn: 'root'
})
export class HierarchieService {

    private resourceUrl = 'http://localhost:8087/api/findHierarchie';
    private resourceAllUrl = 'http://localhost:8087/api/findHierarchies';
    private resourceCreateUrl = 'http://localhost:8087/api/createHierarchies';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateHierarchies';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteHierarchies';
    
    hierarchie: Hierarchie;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(hierarchie: Hierarchie): Observable<Hierarchie> {
          const copy = this.convert(hierarchie);
          return this.http.post<Hierarchie>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(hierarchie: Hierarchie): Observable<Hierarchie> {
          const copy = this.convert(hierarchie);
          return this.http.post<Hierarchie>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get<Hierarchie> (this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(h): Observable<Hierarchie> {
          const copy = this.convert(h);
          return this.http.post<Hierarchie>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id, c): Observable<Hierarchie> {
          let h = new Hierarchie();
          h.id.codeTypeRegroupement = id.toString();
          h.id.codeTypeChaineLoc = c.toString();
          const copy = this.convert(h);
          return this.http.post<Hierarchie>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherHierarchies?mot =' + motCle);
       }

      private convert(hierarchie: Hierarchie): Hierarchie {
          const copy: Hierarchie = Object.assign({}, hierarchie);
          return copy;
      }

}
