import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeGrade } from './type-grade.model';

@Injectable({
  providedIn: 'root'
})
export class TypeGradeService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeGrades';
    private resourceUrl = 'http://localhost:8087/api/findTypeGrade';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeGrades';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeGrades';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeGrades';
    
    typeGrade: TypeGrade;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeGrade: TypeGrade): Observable<TypeGrade> {
          const copy = this.convert(typeGrade);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeGrade: TypeGrade): Observable<TypeGrade> {
          const copy = this.convert(typeGrade);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeGrade> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeGrade> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeGrades?mot =' + motCle);
       }

      private convert(typeGrade: TypeGrade): TypeGrade {
          const copy: TypeGrade = Object.assign({}, typeGrade);
          return copy;
      }

}
