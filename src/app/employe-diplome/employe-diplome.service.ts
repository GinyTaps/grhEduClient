import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeDiplome } from './employe-diplome.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeDiplomeService {

    private resourceUrl = 'http://localhost:8087/api/findEmployeDiplome';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeDiplomes';
    private resourceFindAllUrl = 'http://localhost:8087/api/findDiplomesOfEmploye';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeDiplomes';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeDiplomes';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeDiplomes';
    private resourceLast = 'http://localhost:8087/api/findLastDiplome';
    
    employeDiplome: EmployeDiplome;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(employeDiplome: EmployeDiplome): Observable<EmployeDiplome> {
        const copy = this.convert(employeDiplome);
        return this.http.post<EmployeDiplome>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(employeDiplome: EmployeDiplome): Observable<EmployeDiplome> {
        const copy = this.convert(employeDiplome);
        return this.http.post<EmployeDiplome>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(empD): Observable<EmployeDiplome> {
        const copy = this.convert(empD);
        return this.http.post<EmployeDiplome>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number) : Observable<EmployeDiplome> {
        return this.http.post<EmployeDiplome>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
    }
    
    findAll(id: number) : Observable<EmployeDiplome> {
        return this.http.post<EmployeDiplome>(`${this.resourceAllUrl}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id:number, d:string) : Observable<EmployeDiplome> {
        let empD = new EmployeDiplome();
        empD.id.codeEmploye = id.toString();
        empD.id.dateEmployeDiplome = d;
        const copy = this.convert(empD);
        return this.http.post<EmployeDiplome>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherEmployeDiplomes?mot =' + motCle);
     }

    private convert(employeDiplome: EmployeDiplome): EmployeDiplome {
        const copy: EmployeDiplome = Object.assign({}, employeDiplome);
        return copy;
    }

}
