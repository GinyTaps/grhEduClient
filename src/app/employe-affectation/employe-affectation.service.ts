import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeAffectation } from './employe-affectation.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeAffectationService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeAffectation';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeAffectations';
    private resourceUrlLast = 'http://localhost:8087/api/findLastAffectationOfEmploye';
    private resourceFindAllUrl = 'http://localhost:8087/api/findAffectationsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeAffectations';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeAffectations';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeAffectations';
    
    employeAffectation: EmployeAffectation;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeAffectation: EmployeAffectation): Observable<EmployeAffectation> {
        const copy = this.convert(employeAffectation);
        return this.http.post<EmployeAffectation>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeAffectation: EmployeAffectation): Observable<EmployeAffectation> {
        const copy = this.convert(employeAffectation);
        return this.http.post<EmployeAffectation>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(id, d): Observable<EmployeAffectation> {
        let empA = new EmployeAffectation();
        empA.id.codeEmploye = id.toString();
        empA.id.dateEmployeAffectation = d.toString();
        const copy = this.convert(empA);
        return this.http.post<EmployeAffectation>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeAffectation> {
        return this.http.post<EmployeAffectation>(`${this.resourceAllUrl}`, id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployeAffectation> {
        return this.http.post<EmployeAffectation>(`${this.resourceUrlLast}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeAffectation> {
        let empA =new EmployeAffectation();
        empA.id.codeEmploye = id.toString();
        empA.id.dateEmployeAffectation = d;
        const copy = this.convert(empA);
        return this.http.post<EmployeAffectation>(`${this.resourceDeleteUrl}`, copy,{headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeAffectations?mot =' + motCle);
     }

    private convert(employeAffectation: EmployeAffectation): EmployeAffectation {
        const copy: EmployeAffectation = Object.assign({}, employeAffectation);
        return copy;
    }

}
