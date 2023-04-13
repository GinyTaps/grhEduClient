import { Injectable, OnInit } from '@angular/core';
import { EmployeEtatCivil } from '../employe-etat-civil/employe-etat-civil.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ResponseWrapper } from '../type-etat-civil/type-etat-civil.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeEtatCivilService {
    
    
    private resourceUrl = 'http://localhost:8087/api/findEmployeEtatCivil';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeEtatCivils';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeEtatCivils';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeEtatCivils';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeEtatCivils';
    private resourceLast = 'http://localhost:8087/api/findLastEtatCivilOfEmploye';
    
    employeEtatCivil: EmployeEtatCivil;
    
    
      constructor(
              private datePipe: DatePipe,
              private authService: AuthService,
              private http: HttpClient
              ) { }
      
      ngOnInit() {
      }
      
      create(employeEtatCivil: EmployeEtatCivil) : Observable<EmployeEtatCivil> {
          const copy = this.convert(employeEtatCivil);
          return this.http.post<EmployeEtatCivil>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    
          }
    
      find(empE) : Observable<EmployeEtatCivil> {
          const copy = this.convert(empE);  
          return this.http.post<EmployeEtatCivil>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
       }
      
      findAll(id: number) : Observable<EmployeEtatCivil> {
          return this.http.post<EmployeEtatCivil>(`${this.resourceAllUrl}`, id, {headers:this.authService.getHeader()});
      }
      
      findLast(id: number) : Observable<EmployeEtatCivil> {
          return this.http.post<EmployeEtatCivil>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
      }
      
      update(employeEtatCivil: EmployeEtatCivil): Observable<EmployeEtatCivil> {
          const copy = this.convert(employeEtatCivil);
          return this.http.post<EmployeEtatCivil>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
        }
        
        getAll() {
            return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        
        }
        
        search(motCle: string, page: number, size: number) {
         console.log(motCle);
         return this.http.get('');
        }
        
        searchVia(m: number) { 
              return this.http.get('http://localhost:8087/api/chercherEmployeEtatCivils/'+m);
        }
        
        delete(id:number, d:string) : Observable<EmployeEtatCivil> { 
            let empE = new EmployeEtatCivil();
            empE.id.codeEmploye = id.toString();
            empE.id.dateEmployeEtatCivil = d;
            const copy = this.convert(empE);
            return this.http.post<EmployeEtatCivil>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
        }
      
         private convert(employeEtatCivil: EmployeEtatCivil): EmployeEtatCivil {
              const copy: EmployeEtatCivil = Object.assign({}, employeEtatCivil);
        
              if ((copy.id.dateEmployeEtatCivil != null)) {
                  copy.id.dateEmployeEtatCivil = this.datePipe.transform(employeEtatCivil.id.dateEmployeEtatCivil, 'yyyy-MM-dd');
                
              }
              
              return copy;
          }
         private convertResponse( res: Response ): ResponseWrapper {
              const jsonResponse = res.json();
              return new ResponseWrapper( res.headers, jsonResponse, res.status );
          }
  
}
