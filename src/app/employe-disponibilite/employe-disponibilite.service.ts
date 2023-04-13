import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeDisponibilite } from './employe-disponibilite.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeDisponibiliteService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeDisponibilite';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeDisponibilites';
    private resourceFindAllUrl = 'http://localhost:8087/api/findDisponibilitesOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeDisponibilites';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeDisponibilites';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeDisponibilites';
    private resourceLast = 'http://localhost:8087/api/findLastEmployeDisponibilite';
    
    employeDisponibilite: EmployeDisponibilite;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeDisponibilite: EmployeDisponibilite): Observable<EmployeDisponibilite> {
        const copy = this.convert(employeDisponibilite);
        return this.http.post<EmployeDisponibilite>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeDisponibilite: EmployeDisponibilite): Observable<EmployeDisponibilite> {
        const copy = this.convert(employeDisponibilite);
        return this.http.put<EmployeDisponibilite>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    /*find(empD): Observable<EmployeDisponibilite> {
        const copy = this.convert(empD);
        return this.http.post<EmployeDisponibilite>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }*/
    
    find(id:number, d:string) : Observable<EmployeDisponibilite> {
        let empD = new EmployeDisponibilite();
        empD.id.codeEmploye = id.toString();
        empD.id.dateDebutDisponibilite = d;
        const copy = this.convert(empD);
        return this.http.post<EmployeDisponibilite>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployeDisponibilite> {
        return this.http.post<EmployeDisponibilite>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeDisponibilite> {
        return this.http.post<EmployeDisponibilite>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeDisponibilite> {
        let empD = new EmployeDisponibilite();
        empD.id.codeEmploye = id.toString();
        empD.id.dateDebutDisponibilite = d;
        const copy = this.convert(empD);
        return this.http.post<EmployeDisponibilite>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeDisponibilites?mot =' + motCle);
     }

    private convert(employeDisponibilite: EmployeDisponibilite): EmployeDisponibilite {
        const copy: EmployeDisponibilite = Object.assign({}, employeDisponibilite);
        return copy;
    }

}
