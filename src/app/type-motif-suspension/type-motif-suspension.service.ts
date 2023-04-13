import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeMotifSuspension } from './type-motif-suspension.model';

@Injectable({
  providedIn: 'root'
})
export class TypeMotifSuspensionService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeMotifSuspensions';
    private resourceUrl = 'http://localhost:8087/api/findTypeMotifSuspension';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeMotifSuspensions';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeMotifSuspensions';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeMotifSuspensions';
    
    typeMotifSuspension: TypeMotifSuspension;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeMotifSuspension: TypeMotifSuspension): Observable<TypeMotifSuspension> {
          const copy = this.convert(typeMotifSuspension);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeMotifSuspension: TypeMotifSuspension): Observable<TypeMotifSuspension> {
          const copy = this.convert(typeMotifSuspension);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeMotifSuspension> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeMotifSuspension> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeMotifSuspensions?mot =' + motCle);
       }

      private convert(typeMotifSuspension: TypeMotifSuspension): TypeMotifSuspension {
          const copy: TypeMotifSuspension = Object.assign({}, typeMotifSuspension);
          return copy;
      }

}
