import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChefHierarchiePoste } from './chef-hierarchie-poste.model';

@Injectable()
export class ChefHierarchiePosteService {

    private resourceUrl = 'http://localhost:8087/api/findChefHierarchiePoste';
    private resourceAllUrl = 'http://localhost:8087/api/findChefHierarchiePostes';
    private resourceCreateUrl = 'http://localhost:8087/api/createChefHierarchiePostes';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateChefHierarchiePostes';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteChefHierarchiePostes';
    
    chefHierarchiePoste: ChefHierarchiePoste;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(chefHierarchiePoste: ChefHierarchiePoste): Observable<ChefHierarchiePoste> {
        const copy = this.convert(chefHierarchiePoste);
        return this.http.post<ChefHierarchiePoste>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(chefHierarchiePoste: ChefHierarchiePoste): Observable<ChefHierarchiePoste> {
        const copy = this.convert(chefHierarchiePoste);
        return this.http.post<ChefHierarchiePoste>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get<ChefHierarchiePoste>(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(chp: ChefHierarchiePoste): Observable<ChefHierarchiePoste> {
        const copy = this.convert(chp);
        return this.http.post<ChefHierarchiePoste>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(chp: ChefHierarchiePoste): Observable<ChefHierarchiePoste> {
        const copy = this.convert(chp);
        return this.http.post<ChefHierarchiePoste>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherChefHierarchiePostes?mot =' + motCle);
     }

    private convert(chefHierarchiePoste: ChefHierarchiePoste): ChefHierarchiePoste {
        const copy: ChefHierarchiePoste = Object.assign({}, chefHierarchiePoste);
        return copy;
    }

}
