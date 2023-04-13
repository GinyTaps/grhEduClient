import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeMutation } from './employe-mutation.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeMutationService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeMutation';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeMutations';
    private resourceFindAllUrl = 'http://localhost:8087/api/findMutationsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeMutations';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeMutations';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeMutations';
    private resourceLast = 'http://localhost:8087/api/findLastMutationOfEmploye';
    
    employeMutation: EmployeMutation;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeMutation: EmployeMutation): Observable<EmployeMutation> {
        const copy = this.convert(employeMutation);
        return this.http.post<EmployeMutation>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeMutation: EmployeMutation): Observable<EmployeMutation> {
        const copy = this.convert(employeMutation);
        return this.http.post<EmployeMutation>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empM): Observable<EmployeMutation> {
        const copy = this.convert(empM);
        return this.http.post<EmployeMutation>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeMutation> {
        return this.http.post<EmployeMutation>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployeMutation> {
        return this.http.post<EmployeMutation>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeMutation> {
        let empM = new EmployeMutation();
        empM.id.codeEmploye = id.toString();
        empM.id.dateMutation = d;
        const copy = this.convert(empM);
        return this.http.post<EmployeMutation>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeMutations?mot =' + motCle);
     }

    private convert(employeMutation: EmployeMutation): EmployeMutation {
        const copy: EmployeMutation = Object.assign({}, employeMutation);
        return copy;
    }

}
