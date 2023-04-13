import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeEtablissement } from './employe-etablissement.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeEtablissementService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeEtablissement';
    private resourceAllUrl = 'http://localhost:8087/api/findAllEmployeEtablissements';
    private resourceFindUrl = 'http://localhost:8087/api/findEmployeEtablissements';
    private resourceFindAllUrl = 'http://localhost:8087/api/findEtablissementsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeEtablissements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeEtablissements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeEtablissements';
    private resourceLast = 'http://localhost:8087/api/findLastEtablissementOfEmploye';
    private resourceSearchWUrl = 'http://localhost:8087/api/chercherEmployeEtabWithPoste';
    private resourceSearchWOUrl ='http://localhost:8087/api/chercherEmployeEtabWithoutPoste';
    
    employeEtablissement: EmployeEtablissement;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeEtablissement: EmployeEtablissement): Observable<EmployeEtablissement> {
        const copy = this.convert(employeEtablissement);
        return this.http.post<EmployeEtablissement>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeEtablissement: EmployeEtablissement): Observable<EmployeEtablissement> {
        const copy = this.convert(employeEtablissement);
        return this.http.post<EmployeEtablissement>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get<EmployeEtablissement>(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empE): Observable<EmployeEtablissement> {
        const copy = this.convert(empE);
        return this.http.post<EmployeEtablissement>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeEtablissement> {
        return this.http.post<EmployeEtablissement>(`${this.resourceFindUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployeEtablissement> {
        return this.http.post<EmployeEtablissement>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeEtablissement> {
        let empE = new EmployeEtablissement();
        empE.id.codeEmploye = id.toString();
        empE.id.dateEmployeEtab = d;
        const copy = this.convert(empE);
        return this.http.post<EmployeEtablissement>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    searchWithP(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number, v: number) { // , page: number, size: number) {
        return this.http.get(`${this.resourceSearchWUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}`);
    }
    
    searchWithOP(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number, v: number) { // , page: number, size: number) {
        return this.http.get(`${this.resourceSearchWOUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}`);
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeEtablissements?mot =' + motCle);
     }

    private convert(employeEtablissement: EmployeEtablissement): EmployeEtablissement {
        const copy: EmployeEtablissement = Object.assign({}, employeEtablissement);
        return copy;
    }

}
