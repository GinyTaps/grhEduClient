import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeRegroupement } from './employe-regroupement.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeRegroupementService {

    private resourceUrl = 'http://localhost:8087/api/api/findEmployeRegroupement';
    private resourceAllUrl = 'http://localhost:8087/api/api/findEmployeRegroupements';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeRegroupements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeRegroupements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeRegroupements';
    private resourceLast = 'http://localhost:8087/api/findLastRegroupementOfEmploye';
    
    employeRegroupement: EmployeRegroupement;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeRegroupement: EmployeRegroupement): Observable<EmployeRegroupement> {
          const copy = this.convert(employeRegroupement);
          return this.http.post<EmployeRegroupement>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeRegroupement: EmployeRegroupement): Observable<EmployeRegroupement> {
          const copy = this.convert(employeRegroupement);
          return this.http.post<EmployeRegroupement>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(empR): Observable<EmployeRegroupement> {
          const copy = this.convert(empR);
          return this.http.post<EmployeRegroupement>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeRegroupement> {
          return this.http.post<EmployeRegroupement>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeRegroupement> {
          return this.http.post<EmployeRegroupement>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, d:string) : Observable<EmployeRegroupement> {
          let empR = new EmployeRegroupement();
          empR.id.codeEmploye = id.toString();
          empR.id.dateEmployeRegroupement = d;
          const copy = this.convert(empR);
          return this.http.post<EmployeRegroupement>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeRegroupements?mot =' + motCle);
       }

      private convert(employeRegroupement: EmployeRegroupement): EmployeRegroupement {
          const copy: EmployeRegroupement = Object.assign({}, employeRegroupement);
          return copy;
      }

}
