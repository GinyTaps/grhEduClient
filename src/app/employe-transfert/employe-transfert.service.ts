import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeTransfert } from './employe-transfert.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeTransfertService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeTransfert';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeTransferts';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeTransferts';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeTransferts';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeTransferts';
    private resourceFindAllUrl = 'http://localhost:8087/api/findTransfertsOfEmploye';
    private resourceLast = 'http://localhost:8087/api/findLastTransfertOfEmploye';
    
    employeTransfert: EmployeTransfert;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeTransfert: EmployeTransfert): Observable<EmployeTransfert> {
          const copy = this.convert(employeTransfert);
          return this.http.post<EmployeTransfert>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeTransfert: EmployeTransfert): Observable<EmployeTransfert> {
          const copy = this.convert(employeTransfert);
          return this.http.post<EmployeTransfert>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      /*find(empT): Observable<EmployeTransfert> {
          const copy = this.convert(empT);
          return this.http.post<EmployeTransfert>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }*/
      find(id:number, d:string) : Observable<EmployeTransfert> {
          let empT = new EmployeTransfert();
          empT.id.codeEmploye = id.toString();
          empT.id.dateTransfert = d;
          const copy = this.convert(empT);
          return this.http.post<EmployeTransfert>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeTransfert> {
          return this.http.post<EmployeTransfert>(`${this.resourceAllUrl}`, id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeTransfert> {
          return this.http.post<EmployeTransfert>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id:number, d:string) : Observable<EmployeTransfert> {
          let empT = new EmployeTransfert();
          empT.id.codeEmploye = id.toString();
          empT.id.dateTransfert = d;
          const copy = this.convert(empT);
          return this.http.post<EmployeTransfert>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeTransferts?mot =' + motCle);
       }

      private convert(employeTransfert: EmployeTransfert): EmployeTransfert {
          const copy: EmployeTransfert = Object.assign({}, employeTransfert);
          return copy;
      }

}
