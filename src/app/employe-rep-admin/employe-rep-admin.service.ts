import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeRepAdmin } from './employe-rep-admin.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeRepAdminService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeRepAdmin';
    // private resourceAllUrl = 'http://localhost:8087/api/findEmployeRepAdmins';
    private resourceAllUrl = 'http://localhost:8087/api/findAllEmployeRepAdmins';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeRepAdmins';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeRepAdmins';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeRepAdmins';
    private resourceLast = 'http://localhost:8087/api/findLastRepAdminOfEmploye';
    
    employeRepAdmin: EmployeRepAdmin;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeRepAdmin: EmployeRepAdmin): Observable<EmployeRepAdmin> {
          const copy = this.convert(employeRepAdmin);
          return this.http.post<EmployeRepAdmin>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeRepAdmin: EmployeRepAdmin): Observable<EmployeRepAdmin> {
          const copy = this.convert(employeRepAdmin);
          return this.http.post<EmployeRepAdmin>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get<EmployeRepAdmin>(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number, d: string): Observable<EmployeRepAdmin> {
          let empR = new EmployeRepAdmin();
          empR.id.codeEmploye = id.toString();
          empR.id.dateEmployeRepAdmin = d;
          const copy = this.convert(empR);
          return this.http.post<EmployeRepAdmin>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeRepAdmin> {
          return this.http.post<EmployeRepAdmin>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeRepAdmin> {
          return this.http.post<EmployeRepAdmin>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, d:string) : Observable<EmployeRepAdmin> {
          let empR = new EmployeRepAdmin();
          empR.id.codeEmploye = id.toString();
          empR.id.codeAdministration = d;
          const copy = this.convert(empR);
          return this.http.post<EmployeRepAdmin>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeRepAdmins?mot =' + motCle);
       }

      private convert(employeRepAdmin: EmployeRepAdmin): EmployeRepAdmin {
          const copy: EmployeRepAdmin = Object.assign({}, employeRepAdmin);
          return copy;
      }

}
