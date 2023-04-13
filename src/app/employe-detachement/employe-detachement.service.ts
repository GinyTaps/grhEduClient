import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeDetachement } from './employe-detachement.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeDetachementService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeDetachement';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeDetachements';
    private resourceFindAllUrl = 'http://localhost:8087/api/findDetachementsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeDetachements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeDetachements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeDetachements';
    private resourceLast = 'http://localhost:8087/api/findLastDetachement';
    
    employeDetachement: EmployeDetachement;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeDetachement: EmployeDetachement): Observable<EmployeDetachement> {
        const copy = this.convert(employeDetachement);
        return this.http.post<EmployeDetachement>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeDetachement: EmployeDetachement): Observable<EmployeDetachement> {
        const copy = this.convert(employeDetachement);
        return this.http.post<EmployeDetachement>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empD): Observable<EmployeDetachement> {
        const copy = this.convert(empD);
        return this.http.post<EmployeDetachement>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeDetachement> {
        return this.http.post<EmployeDetachement>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployeDetachement> {
        return this.http.post<EmployeDetachement>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeDetachement> {
        let empD = new EmployeDetachement();
        empD.id.codeEmploye = id.toString();
        empD.id.dateDebutDetachement = d;
        const copy = this.convert(empD);
        return this.http.post<EmployeDetachement>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeDetachements?mot =' + motCle);
     }

    private convert(employeDetachement: EmployeDetachement): EmployeDetachement {
        const copy: EmployeDetachement = Object.assign({}, employeDetachement);
        return copy;
    }

}
