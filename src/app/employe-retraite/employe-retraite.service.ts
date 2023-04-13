import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeRetraite } from './employe-retraite.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeRetraiteService {

    private resourceUrl = 'http://localhost:8087/api/api/findEmployeRetraite';
    private resourceAllUrl = 'http://localhost:8087/api/api/findEmployeRetraites';
    private resourceFindAllUrl = 'http://localhost:8087/api/findRetraitesOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeRetraites';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeRetraites';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeRetraites';
    private resourceLast = 'http://localhost:8087/api/findLastRetraiteOfEmploye';
    
    employeRetraite: EmployeRetraite;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeRetraite: EmployeRetraite): Observable<EmployeRetraite> {
          const copy = this.convert(employeRetraite);
          return this.http.post<EmployeRetraite>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeRetraite: EmployeRetraite): Observable<EmployeRetraite> {
          const copy = this.convert(employeRetraite);
          return this.http.post<EmployeRetraite>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(empR): Observable<EmployeRetraite> {
          const copy = this.convert(empR);
          return this.http.post<EmployeRetraite>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeRetraite> {
          return this.http.post<EmployeRetraite>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeRetraite> {
          return this.http.post<EmployeRetraite>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, d:string) : Observable<EmployeRetraite> {
          let empR = new EmployeRetraite();
          empR.id.codeEmploye = id.toString();
          empR.id.dateRetraite = d;
          const copy = this.convert(empR);
          return this.http.post<EmployeRetraite>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeRetraites?mot =' + motCle);
       }

      private convert(employeRetraite: EmployeRetraite): EmployeRetraite {
          const copy: EmployeRetraite = Object.assign({}, employeRetraite);
          return copy;
      }

}
