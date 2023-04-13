import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeRenvoi } from './employe-renvoi.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeRenvoiService {

    private resourceUrl = 'http://localhost:8087/api/api/findEmployeRenvoi';
    private resourceAllUrl = 'http://localhost:8087/api/api/findEmployeRenvois';
    private resourceFindAllUrl = 'http://localhost:8087/api/findRenvoisOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeRenvois';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeRenvois';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeRenvois';
    private resourceLast = 'http://localhost:8087/api/findLastRenvoiOfEmploye';
    
    employeRenvoi: EmployeRenvoi;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeRenvoi: EmployeRenvoi): Observable<EmployeRenvoi> {
          const copy = this.convert(employeRenvoi);
          return this.http.post<EmployeRenvoi>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeRenvoi: EmployeRenvoi): Observable<EmployeRenvoi> {
          const copy = this.convert(employeRenvoi);
          return this.http.post<EmployeRenvoi>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(empR): Observable<EmployeRenvoi> {
          const copy = this.convert(empR);
          return this.http.post<EmployeRenvoi>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeRenvoi> {
          return this.http.post<EmployeRenvoi>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeRenvoi> {
          return this.http.post<EmployeRenvoi>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, d:string) : Observable<Response> {
          let empR = new EmployeRenvoi();
          empR.id.codeEmploye = id.toString();
          empR.id.dateRenvoi = d;
          const copy = this.convert(empR);
          return this.http.post<Response>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeRenvois?mot =' + motCle);
       }

      private convert(employeRenvoi: EmployeRenvoi): EmployeRenvoi {
          const copy: EmployeRenvoi = Object.assign({}, employeRenvoi);
          return copy;
      }

}
