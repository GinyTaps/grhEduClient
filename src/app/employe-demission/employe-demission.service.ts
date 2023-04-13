import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeDemission } from './employe-demission.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeDemissionService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeDemission';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeDemissions';
    private resourceFindAllUrl = 'http://localhost:8087/api/findDemissionsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeDemissions';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeDemissions';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeDemissions';
    private resourceLast = 'http://localhost:8087/api/findLastDemissionOfEmploye';
    
    employeDemission: EmployeDemission;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeDemission: EmployeDemission): Observable<EmployeDemission> {
        const copy = this.convert(employeDemission);
        return this.http.post<EmployeDemission>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeDemission: EmployeDemission): Observable<EmployeDemission> {
        const copy = this.convert(employeDemission);
        return this.http.put<EmployeDemission>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empD: EmployeDemission): Observable<EmployeDemission> {
        const copy = this.convert(empD);
        return this.http.post<EmployeDemission>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeDemission> {
        return this.http.post<EmployeDemission>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number): Observable<EmployeDemission> {
        return this.http.post<EmployeDemission>(this.resourceLast, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeDemission> {
        let empD = new EmployeDemission();
        empD.id.codeEmploye = id.toString();
        empD.id.dateDemission = d;
        const copy = this.convert(empD);
        return this.http.post<EmployeDemission>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeDemissions?mot =' + motCle);
     }

    private convert(employeDemission: EmployeDemission): EmployeDemission {
        const copy: EmployeDemission = Object.assign({}, employeDemission);
        return copy;
    }

}
