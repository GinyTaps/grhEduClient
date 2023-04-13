import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeChaineLoc } from './type-chaine-loc.model';

@Injectable({
  providedIn: 'root'
})
export class TypeChaineLocService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeChaineLocs';
    private resourceSUrl = 'http://localhost:8087/api/findTypeChainesBySecteur';
    private resourceUrl = 'http://localhost:8087/api/findTypeChaineLoc';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeChaineLocs';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeChaineLocs';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeChaineLocs';
    
    typeChaineLoc: TypeChaineLoc;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeChaineLoc: TypeChaineLoc): Observable<TypeChaineLoc> {
          const copy = this.convert(typeChaineLoc);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeChaineLoc: TypeChaineLoc): Observable<TypeChaineLoc> {
          const copy = this.convert(typeChaineLoc);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeChaineLoc> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      findBySecteur(id: number): Observable<TypeChaineLoc> {
          return this.http.post(`${this.resourceSUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeChaineLoc> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeChaineLocs?mot =' + motCle);
       }

      private convert(typeChaineLoc: TypeChaineLoc): TypeChaineLoc {
          const copy: TypeChaineLoc = Object.assign({}, typeChaineLoc);
          return copy;
      }

}
