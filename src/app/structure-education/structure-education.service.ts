import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StructureEdu } from './structure-education.model';

@Injectable({
  providedIn: 'root'
})
export class StructureEduService {

    private resourceUrl = 'http://localhost:8087/api/findStructureEducation';
    private resourceAllUrl = 'http://localhost:8087/api/findStructureEducations';
    private resourceCreateUrl = 'http://localhost:8087/api/createStructureEducations';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateStructureEducations';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteStructureEducations';
    
    structureEducation: StructureEdu;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(structureEducation: StructureEdu) { // : Observable<StructureEdu> {
          const copy = this.convert(structureEducation);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader(), observe: 'response'});
      }

      update(structureEducation: StructureEdu): Observable<StructureEdu> {
          const copy = this.convert(structureEducation);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<StructureEdu> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<StructureEdu> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherStructureEducations?mot =' + motCle);
       }

      private convert(structureEducation: StructureEdu): StructureEdu {
          const copy: StructureEdu = Object.assign({}, structureEducation);
          return copy;
      }

}
