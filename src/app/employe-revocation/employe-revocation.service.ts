import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeRevocation } from './employe-revocation.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeRevocationService {

    private resourceUrl = 'http://localhost:8087/api/api/findEmployeRevocation';
    private resourceAllUrl = 'http://localhost:8087/api/api/findEmployeRevocations';
    private resourceFindAllUrl = 'http://localhost:8087/api/findRevocationsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeRevocations';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeRevocations';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeRevocations';
    private resourceLast = 'http://localhost:8087/api/findLastRevocationOfEmploye';
    
    employeRevocation: EmployeRevocation;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeRevocation: EmployeRevocation): Observable<EmployeRevocation> {
          const copy = this.convert(employeRevocation);
          return this.http.post<EmployeRevocation>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeRevocation: EmployeRevocation): Observable<EmployeRevocation> {
          const copy = this.convert(employeRevocation);
          return this.http.post<EmployeRevocation>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl), {headers:this.authService.getHeader()};
        }

      find(empR): Observable<EmployeRevocation> {
          const copy = this.convert(empR);
          return this.http.post<EmployeRevocation>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeRevocation> {
          return this.http.post<EmployeRevocation>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeRevocation> {
          return this.http.post<EmployeRevocation>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, d:string) : Observable<EmployeRevocation> {
          let empR = new EmployeRevocation();
          empR.id.codeEmploye = id.toString();
          empR.id.dateRevocation = d;
          const copy = this.convert(empR);
          return this.http.post<EmployeRevocation>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeRevocations?mot =' + motCle);
       }

      private convert(employeRevocation: EmployeRevocation): EmployeRevocation {
          const copy: EmployeRevocation = Object.assign({}, employeRevocation);
          return copy;
      }

}
