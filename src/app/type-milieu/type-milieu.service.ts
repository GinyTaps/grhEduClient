import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeMilieu } from './type-milieu.model';

@Injectable({
  providedIn: 'root'
})
export class TypeMilieuService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeMilieus';
    private resourceUrl = 'http://localhost:8087/api/findTypeMilieu';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeMilieus';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeMilieus';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeMilieus';
    
    typeMilieu: TypeMilieu;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeMilieu: TypeMilieu): Observable<TypeMilieu> {
          const copy = this.convert(typeMilieu);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeMilieu: TypeMilieu): Observable<TypeMilieu> {
          const copy = this.convert(typeMilieu);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeMilieu> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeMilieu> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeMilieus?mot =' + motCle);
       }

      private convert(typeMilieu: TypeMilieu): TypeMilieu {
          const copy: TypeMilieu = Object.assign({}, typeMilieu);
          return copy;
      }

}
