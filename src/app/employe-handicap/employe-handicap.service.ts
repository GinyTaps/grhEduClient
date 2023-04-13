import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeHandicap } from './employe-handicap.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeHandicapService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeHandicap';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeHandicaps';
    private resourceFindAllUrl = 'http://localhost:8087/api/findHandicapsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeHandicaps';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeHandicaps';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeHandicaps';
    private resourceLast = 'http://localhost:8087/api/findLastHandicapOfEmploye';
    
    employeHandicap: EmployeHandicap;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeHandicap: EmployeHandicap): Observable<EmployeHandicap> {
        const copy = this.convert(employeHandicap);
        return this.http.post<EmployeHandicap>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeHandicap: EmployeHandicap): Observable<EmployeHandicap> {
        const copy = this.convert(employeHandicap);
        return this.http.post<EmployeHandicap>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empH): Observable<EmployeHandicap> {
        return this.http.post<EmployeHandicap>(`${this.resourceUrl}`, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeHandicap> {
        return this.http.post<EmployeHandicap>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployeHandicap> {
        return this.http.post<EmployeHandicap>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeHandicap> {
        let empH = new EmployeHandicap();
        empH.id.codeEmploye = id.toString();
        empH.id.dateEmployeHandicap = d;
        const copy = this.convert(empH);
        return this.http.post<EmployeHandicap>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeHandicaps?mot =' + motCle);
     }

    private convert(employeHandicap: EmployeHandicap): EmployeHandicap {
        const copy: EmployeHandicap = Object.assign({}, employeHandicap);
        return copy;
    }

}
