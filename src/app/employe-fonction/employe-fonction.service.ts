import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeFonction } from './employe-fonction.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeFonctionService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeFonction';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeFonctions';
    private resourceFindAllUrl = 'http://localhost:8087/api/findFonctionsOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeFonctions';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeFonctions';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeFonctions';
    private resourceLast = 'http://localhost:8087/api/findLastFonctionOfEmploye';
    
    employeFonction: EmployeFonction;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeFonction: EmployeFonction): Observable<EmployeFonction> {
        const copy = this.convert(employeFonction);
        return this.http.post<EmployeFonction>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeFonction: EmployeFonction): Observable<EmployeFonction> {
        const copy = this.convert(employeFonction);
        return this.http.post<EmployeFonction>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empF): Observable<EmployeFonction> {
        const copy = this.convert(empF);
        return this.http.post<EmployeFonction>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeFonction> {
        return this.http.post<EmployeFonction>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployeFonction> {
        return this.http.post<EmployeFonction>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeFonction> {
        let empF = new EmployeFonction();
        empF.id.codeEmploye = id.toString();
        empF.id.dateEmployeFonction = d;
        const copy = this.convert(empF);
        return this.http.post<EmployeFonction>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeFonctions?mot =' + motCle);
     }

    private convert(employeFonction: EmployeFonction): EmployeFonction {
        const copy: EmployeFonction = Object.assign({}, employeFonction);
        return copy;
    }

}
