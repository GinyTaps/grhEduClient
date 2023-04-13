import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeDeces } from './employe-deces.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeDecesService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeDece';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeDeces';
    private resourceFindAllUrl = 'http://localhost:8087/api/findDecesOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeDeces';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeDeces';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeDeces';
    private resourceLast = 'http://localhost:8087/api/findDecesOfEmploye';
    
    employeDeces: EmployeDeces;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeDeces: EmployeDeces): Observable<EmployeDeces> {
        const copy = this.convert(employeDeces);
        return this.http.post<EmployeDeces>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeDeces: EmployeDeces): Observable<EmployeDeces> {
        const copy = this.convert(employeDeces);
        return this.http.put<EmployeDeces>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empD: EmployeDeces): Observable<EmployeDeces> {
        const copy = this.convert(empD);
        return this.http.post<EmployeDeces>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeDeces> {
        return this.http.post<EmployeDeces>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number): Observable<EmployeDeces> {
        return this.http.post<EmployeDeces>(this.resourceLast, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeDeces> {
        let empD = new EmployeDeces();
        empD.id.codeEmploye = id.toString();
        empD.id.dateDeces = d;
        const copy = this.convert(empD);
        return this.http.post<EmployeDeces>(`${this.resourceDeleteUrl}`, copy,{headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeDecess?mot =' + motCle);
     }

    private convert(employeDeces: EmployeDeces): EmployeDeces {
        const copy: EmployeDeces = Object.assign({}, employeDeces);
        return copy;
    }

    
}
