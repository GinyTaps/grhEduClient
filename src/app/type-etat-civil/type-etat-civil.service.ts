
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TypeEtatCivil } from './type-etat-civil.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class TypeEtatCivilService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeEtatCivils';
    private resourceUrl = 'http://localhost:8087/api/findTypeEtatCivil';
    private resourceLastUrl = 'http://localhost:8087/api/findLastEtatCivil';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeEtatCivils';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeEtatCivils';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeEtatCivils';

    constructor(
            private authService: AuthService,
            private http: HttpClient) 
            { }

    create(typeMotifConge: TypeEtatCivil): Observable<TypeEtatCivil> {
        const copy = this.convert(typeMotifConge);
        return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(typeMotifConge: TypeEtatCivil): Observable<TypeEtatCivil> {
        const copy = this.convert(typeMotifConge);
        return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
    return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});

  }
    find(id: number): Observable<TypeEtatCivil> {
        return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    findLast(id: number): Observable<TypeEtatCivil> {
        return this.http.post(`${this.resourceLastUrl}`, +id, {headers:this.authService.getHeader()});
    }

    /*query(req?: any): Observable<ResponseWrapper> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options).pipe(
            map((res: Response) => this.convertResponse(res)));
    }*/

    delete(id: number): Observable<TypeEtatCivil> {
        return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    /*search(motCle: string, page: number, size: number) {
        console.log(motCle);
         return this.http.get('http://localhost:8087/api/chercherTypeEtatCivils?mot =' + motCle).pipe( // + '&page=' + page + '&size=' + size)
           map(res => res.json()));
     }*/

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(typeEtatCivil: TypeEtatCivil): TypeEtatCivil {
        const copy: TypeEtatCivil = Object.assign({}, typeEtatCivil);
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
