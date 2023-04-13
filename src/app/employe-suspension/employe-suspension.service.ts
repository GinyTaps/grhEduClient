import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeSuspension } from './employe-suspension.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeSuspensionService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeSuspension';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeSuspensions';
    private resourceFindAllUrl = 'http://localhost:8087/api/findSuspensionsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeSuspensions';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeSuspensions';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeSuspensions';
    private resourceLast = 'http://localhost:8087/api/findLastSuspensionOfEmploye';
    
    employeSuspension: EmployeSuspension;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeSuspension: EmployeSuspension): Observable<EmployeSuspension> {
          const copy = this.convert(employeSuspension);
          return this.http.post<EmployeSuspension>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeSuspension: EmployeSuspension): Observable<EmployeSuspension> {
          const copy = this.convert(employeSuspension);
          return this.http.post<EmployeSuspension>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(empS): Observable<EmployeSuspension> {
          const copy = this.convert(empS);
          return this.http.post<EmployeSuspension>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeSuspension> {
          return this.http.post<EmployeSuspension>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeSuspension> {
          return this.http.post<EmployeSuspension>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, d:string) : Observable<EmployeSuspension> {
          let empS = new EmployeSuspension();
          empS.id.codeEmploye = id.toString();
          empS.id.dateDebutSuspension = d;
          const copy = this.convert(empS);
          return this.http.post<EmployeSuspension>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeSuspensions?mot =' + motCle);
       }

      private convert(employeSuspension: EmployeSuspension): EmployeSuspension {
          const copy: EmployeSuspension = Object.assign({}, employeSuspension);
          return copy;
      }

}
