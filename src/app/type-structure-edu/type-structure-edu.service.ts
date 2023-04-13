import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeStructureEdu } from './type-structure-edu.model';

@Injectable({
  providedIn: 'root'
})
export class TypeStructureEduService {

    private resourceUrl = 'http://localhost:8087/api/findTypeStructureEdu';
    private resourceAllUrl = 'http://localhost:8087/api/findTypeStructureEdus';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeStructureEdus';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeStructureEdus';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeStructureEdus';
    
    typeStructureEdu: TypeStructureEdu;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeStructureEdu: TypeStructureEdu): Observable<TypeStructureEdu> {
          const copy = this.convert(typeStructureEdu);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeStructureEdu: TypeStructureEdu): Observable<TypeStructureEdu> {
          const copy = this.convert(typeStructureEdu);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeStructureEdu> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeStructureEdu> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeStructureEdus?mot =' + motCle);
       }

      private convert(typeStructureEdu: TypeStructureEdu): TypeStructureEdu {
          const copy: TypeStructureEdu = Object.assign({}, typeStructureEdu);
          return copy;
      }

}
