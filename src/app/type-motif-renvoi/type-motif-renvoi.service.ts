import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeMotifRenvoi } from './type-motif-renvoi.model';

@Injectable({
  providedIn: 'root'
})
export class TypeMotifRenvoiService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeMotifRenvois';
    private resourceUrl = 'http://localhost:8087/api/findTypeMotifRenvoi';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeMotifRenvois';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeMotifRenvois';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeMotifRenvois';
    
    typeMotifRenvoi: TypeMotifRenvoi;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      
      create(typeMotifRenvoi: TypeMotifRenvoi): Observable<TypeMotifRenvoi> {
          const copy = this.convert(typeMotifRenvoi);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeMotifRenvoi: TypeMotifRenvoi): Observable<TypeMotifRenvoi> {
          const copy = this.convert(typeMotifRenvoi);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeMotifRenvoi> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeMotifRenvoi> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeMotifRenvois?mot =' + motCle);
       }

      private convert(typeMotifRenvoi: TypeMotifRenvoi): TypeMotifRenvoi {
          const copy: TypeMotifRenvoi = Object.assign({}, typeMotifRenvoi);
          return copy;
      }

}
