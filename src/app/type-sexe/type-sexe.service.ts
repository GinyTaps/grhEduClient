
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TypeSexe } from './type-sexe.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class TypeSexeService {


  private resourceUrl = 'http://localhost:8087/api/findTypeSexe';
  private resourceAllUrl = 'http://localhost:8087/api/findTypeSexes';
  private resourceCreateUrl = 'http://localhost:8087/api/createTypeSexes';
  private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeSexes';
  private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeSexes';

    constructor(
            private http: HttpClient,
            private authService: AuthService,
            ) { }

    create(typeSexe: TypeSexe): Observable<TypeSexe> {
        const copy = this.convert(typeSexe);
        return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(typeSexe: TypeSexe): Observable<TypeSexe> {
        const copy = this.convert(typeSexe);
        return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(id: number): Observable<TypeSexe> {
        return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
    }

    /*query(req?: any): Observable<ResponseWrapper> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options).pipe(
            map((res: Response) => this.convertResponse(res)));
    }*/

    delete(id: number): Observable<TypeSexe> {
        return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    /*search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherTypeSexes?mot =' + motCle).pipe( // + '&page=' + page + '&size=' + size)
            map(res => res.json()));
     }*/

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(typeSexe: TypeSexe): TypeSexe {
        const copy: TypeSexe = Object.assign({}, typeSexe);
        return copy;
    }

}

export class ResponseWrapper {
    constructor(
        public headers: Headers,
        public json: any,
        public status: number
    ) { }
}
