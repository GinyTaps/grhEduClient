import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeStatut } from './employe-statut.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeStatutService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeStatut';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeStatuts';
    private resourceLastUrl = 'http://localhost:8087/api/findLastStatutOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeStatuts';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeStatuts';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeStatuts';
    
    employeStatut: EmployeStatut;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeStatut: EmployeStatut): Observable<EmployeStatut> {
          const copy = this.convert(employeStatut);
          return this.http.post<EmployeStatut>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeStatut: EmployeStatut): Observable<EmployeStatut> {
          const copy = this.convert(employeStatut);
          return this.http.post<EmployeStatut>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number, d: string): Observable<EmployeStatut> {
          let empS = new EmployeStatut();
          empS.id.codeEmploye = id.toString();
          empS.id.dateEmployeStatut = d;
          const copy = this.convert(empS);
          return this.http.post<EmployeStatut>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number): Observable<EmployeStatut> {
          return this.http.post<EmployeStatut>(`${this.resourceLastUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeStatut> {
          return this.http.post<EmployeStatut>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, d:string) : Observable<EmployeStatut> {
          let empS = new EmployeStatut();
          empS.id.codeEmploye = id.toString();
          empS.id.dateEmployeStatut = d;
          const copy = this.convert(empS);
          return this.http.post<EmployeStatut>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeStatuts?mot =' + motCle);
       }

      private convert(employeStatut: EmployeStatut): EmployeStatut {
          const copy: EmployeStatut = Object.assign({}, employeStatut);
          return copy;
      }

}
