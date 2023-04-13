import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployePoste } from '../employe-poste/employe-poste.model';

@Injectable({
  providedIn: 'root'
})
export class EmployePosteService {
    
    private resourceUrl = 'http://localhost:8087/api/findEmployePoste';
    private resourceAllUrl = 'http://localhost:8087/api/findAllEmployePostes';
    private resourceAllOneUrl = 'http://localhost:8087/api/findEmployePostes';
    private resourceUrlLast = 'http://localhost:8087/api/findLastPosteOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployePostes';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployePostes';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployePostes';
    
    employePoste: EmployePoste;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employePoste: EmployePoste): Observable<EmployePoste> {
        const copy = this.convert(employePoste);
        return this.http.post<EmployePoste>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employePoste: EmployePoste): Observable<EmployePoste> {
        const copy = this.convert(employePoste);
        return this.http.post<EmployePoste>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get<EmployePoste>(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(id: number, d: string): Observable<EmployePoste> {
        let empP = new EmployePoste();
        empP.id.codeEmploye = id.toString();
        empP.id.dateDebutEmployePoste = d.toString();
        const copy = this.convert(empP);
        return this.http.post<EmployePoste>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployePoste> {
        return this.http.post<EmployePoste>(`${this.resourceAllOneUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployePoste> {
        return this.http.post<EmployePoste>(`${this.resourceUrlLast}`, +id, {headers:this.authService.getHeader()});
    }
    
    //pour gérer la mise à jour du poste de l'employé
    getLast(id: number) { // : Observable<EmployePoste> {
        return this.http.post<EmployePoste>(`${this.resourceUrlLast}`, +id, {headers:this.authService.getHeader(), observe: 'response'});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployePoste> {
        let empP = new EmployePoste();
        empP.id.codeEmploye = id.toString();
        empP.id.dateDebutEmployePoste = d;
        const copy = this.convert(empP);
        return this.http.post<EmployePoste>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployePostes?mot =' + motCle);
     }

    private convert(employePoste: EmployePoste): EmployePoste {
        const copy: EmployePoste = Object.assign({}, employePoste);
        return copy;
    }

}
