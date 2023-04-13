
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TypeMotifConge } from './type-motif-conge.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TypeMotifCongeService {

  private resourceAllUrl = 'http://localhost:8087/api/findTypeMotifConges';
  private resourceUrl = 'http://localhost:8087/api/findTypeMotifConge';
  private resourceCreateUrl = 'http://localhost:8087/api/createTypeMotifConges';
  private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeMotifConges';
  private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeMotifConges';

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    create(typeMotifConge: TypeMotifConge): Observable<TypeMotifConge> {
        const copy = this.convert(typeMotifConge);
        return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(typeMotifConge: TypeMotifConge): Observable<TypeMotifConge> {
        const copy = this.convert(typeMotifConge);
        return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
    return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});

  }
    find(id: number): Observable<TypeMotifConge> {
        return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
    }

    /*query(req?: any): Observable<ResponseWrapper> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options).pipe(
            map((res: Response) => this.convertResponse(res)));
    }*/

    delete(id: number): Observable<TypeMotifConge> {
        return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    /*search(motCle: string, page: number, size: number) {
        console.log(motCle);
         return this.http.get('http://localhost:8087/api/chercherTypeMotifConges?mot =' + motCle).pipe( // + '&page=' + page + '&size=' + size)
           map(res => res.json()));
     }*/

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(typeMotifConge: TypeMotifConge): TypeMotifConge {
        const copy: TypeMotifConge = Object.assign({}, typeMotifConge);
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
