import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeSituation } from './employe-situation.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeSituationService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeSituation';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeSituations';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeSituations';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeSituations';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeSituations';
    
    employeSituation: EmployeSituation;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(employeSituation: EmployeSituation): Observable<EmployeSituation> {
          const copy = this.convert(employeSituation);
          return this.http.post<EmployeSituation>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(employeSituation: EmployeSituation): Observable<EmployeSituation> {
          const copy = this.convert(employeSituation);
          return this.http.post<EmployeSituation>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(empS: EmployeSituation): Observable<EmployeSituation> {
          const copy = this.convert(empS);
          return this.http.post<EmployeSituation>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
      }
      
      findAll(id: number) : Observable<EmployeSituation> {
          return this.http.post<EmployeSituation>(`${this.resourceAllUrl}`, id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number, d:string) : Observable<EmployeSituation> {
          let empS = new EmployeSituation();
          empS.id.codeEmploye = id.toString();
          empS.id.dateDebutSituation = d;
          const copy = this.convert(empS);
          return this.http.post<EmployeSituation>(`${this.resourceDeleteUrl}`, copy,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherEmployeSituations?mot =' + motCle);
       }

      private convert(employeSituation: EmployeSituation): EmployeSituation {
          const copy: EmployeSituation = Object.assign({}, employeSituation);
          return copy;
      }

}
