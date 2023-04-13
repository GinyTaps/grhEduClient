import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LiaisonsRegroupement } from './liaisons-regroupement.model';

@Injectable({
  providedIn: 'root'
})
export class LiaisonsRegroupementService {

    private resourceUrl = 'http://localhost:8087/api/findLiaisonsRegroupement';
    private resourceAllUrl = 'http://localhost:8087/api/findLiaisonsRegroupements';
    private resourceCreateUrl = 'http://localhost:8087/api/createLiaisonsRegroupements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateLiaisonsRegroupements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteLiaisonsRegroupements';
    
    liaisonsRegroupement: LiaisonsRegroupement;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(liaisonsRegroupement: LiaisonsRegroupement) { // : Observable<LiaisonsRegroupement> {
          const copy = this.convert(liaisonsRegroupement);
          return this.http.post<LiaisonsRegroupement>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader(), observe: 'response'});
      }

      update(liaisonsRegroupement: LiaisonsRegroupement): Observable<LiaisonsRegroupement> {
          const copy = this.convert(liaisonsRegroupement);
          return this.http.post<LiaisonsRegroupement>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get<LiaisonsRegroupement>(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(lR): Observable<LiaisonsRegroupement> {
          const copy = this.convert(lR);
          return this.http.post<LiaisonsRegroupement>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<LiaisonsRegroupement> {
          return this.http.post<LiaisonsRegroupement>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, c:number): Observable<LiaisonsRegroupement> {
          let lR = new LiaisonsRegroupement();
          lR.id.codeRegroupement = id.toString();
          lR.id.codeRegroupementParent = c.toString();
          const copy = this.convert(lR);
          return this.http.post<LiaisonsRegroupement>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherLiaisonsRegroupements?mot =' + motCle);
       }

      private convert(liaisonsRegroupement: LiaisonsRegroupement): LiaisonsRegroupement {
          const copy: LiaisonsRegroupement = Object.assign({}, liaisonsRegroupement);
          return copy;
      }

}
