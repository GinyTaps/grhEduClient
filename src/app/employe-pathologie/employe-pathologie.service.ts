import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployePathologie } from './employe-pathologie.model';

@Injectable({
  providedIn: 'root'
})
export class EmployePathologieService {

    private resourceUrl = 'http://localhost:8087/api/findEmployePathologie';
    private resourceAllUrl = 'http://localhost:8087/api/findAllEmployePathologies';
    private resourceFindAllUrl = 'http://localhost:8087/api/findEmployePathologies';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployePathologies';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployePathologies';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployePathologies';
    private resourceLast = 'http://localhost:8087/api/findLastPathologieOfEmploye';
    
    employePathologie: EmployePathologie;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employePathologie: EmployePathologie): Observable<EmployePathologie> {
        const copy = this.convert(employePathologie);
        return this.http.post<EmployePathologie>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employePathologie: EmployePathologie): Observable<EmployePathologie> {
        const copy = this.convert(employePathologie);
        return this.http.post<EmployePathologie>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get<EmployePathologie>(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empP): Observable<EmployePathologie> {
        const copy = this.convert(empP);
        return this.http.post<EmployePathologie>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployePathologie> {
        return this.http.post<EmployePathologie>(`${this.resourceFindAllUrl}`, id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployePathologie> {
        return this.http.post<EmployePathologie>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployePathologie> {
        let empP = new EmployePathologie();
        empP.id.codeEmploye = id.toString();
        empP.id.dateEmployePathologie = d;
        const copy = this.convert(empP);
        return this.http.post<EmployePathologie>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployePathologies?mot =' + motCle);
     }

    private convert(employePathologie: EmployePathologie): EmployePathologie {
        const copy: EmployePathologie = Object.assign({}, employePathologie);
        return copy;
    }

}
