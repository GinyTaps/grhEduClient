import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeQualification } from './employe-qualification.model';

@Injectable({
  providedIn: 'root'
}) // permet d'éviter de déclarer le service dans le service de routage (app.route.ts)
export class EmployeQualificationService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeQualification';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeQualifications';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeQualifications';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeQualifications';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeQualifications';
    private resourceLast = 'http://localhost:8087/api/findLastQualificationOfEmploye';
    
    employeQualification: EmployeQualification;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeQualification: EmployeQualification): Observable<EmployeQualification> {
          const copy = this.convert(employeQualification);
          return this.http.post<EmployeQualification>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeQualification: EmployeQualification): Observable<EmployeQualification> {
          const copy = this.convert(employeQualification);
          return this.http.post<EmployeQualification>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(empQ): Observable<EmployeQualification> {
          const copy = this.convert(empQ);
          return this.http.post<EmployeQualification>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeQualification> {
          return this.http.post<EmployeQualification>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeQualification> {
          return this.http.post<EmployeQualification>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, idC: number, idD: number, idE: number, idG: number, idT: number) : Observable<EmployeQualification> {
          let empQ = new EmployeQualification();
          empQ.id.codeEmploye = id.toString();
          empQ.id.codeTypeCategorie = idC.toString();
          empQ.id.codeTypeDiplome = idD.toString();
          empQ.id.codeTypeEchelon = idE.toString();
          empQ.id.codeTypeGrade = idG.toString();
          empQ.id.codeTypeTitre = idT.toString();
          const copy = this.convert(empQ);
          return this.http.post<EmployeQualification>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeQualifications?mot =' + motCle);
       }

      private convert(employeQualification: EmployeQualification): EmployeQualification {
          const copy: EmployeQualification = Object.assign({}, employeQualification);
          return copy;
      }

}
