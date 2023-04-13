
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TypeRegroupement } from './type-regroupement.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Injectable()
export class TypeRegroupementService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeRegroupements';
    private resourceAllByRUrl = 'http://localhost:8087/api/findAllByRegroupement';
    private resourceAllByChaineUrl = 'http://localhost:8087/api/findTypeRegroupementByTypeChaine';
    private resourceUrl = 'http://localhost:8087/api/findTypeRegroupement';
    private resourceLibUrl = 'http://localhost:8087/api/findTypeRegroupementL';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeRegroupements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeRegroupements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeRegroupements';

    constructor(
            private http: HttpClient,
            private authService: AuthService,
            ) { }

    create(typeRegroupement: TypeRegroupement): Observable<TypeRegroupement> {
        const copy = this.convert(typeRegroupement);
        return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
                /*).pipe(map((res: Response) => {
            return res.json();
        }));*/
    }

    update(typeRegroupement: TypeRegroupement): Observable<TypeRegroupement> {
        const copy = this.convert(typeRegroupement);
        return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
        /*).pipe(map((res: Response) => {
            return res.json();
        }));*/
    }

    getAll() {
    return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});/*.pipe(
    map(res => res.json()));*/

    }
    
    findByTypeChaine(id: number) {
        return this.http.post(`${this.resourceAllByChaineUrl}`, +id,  {headers:this.authService.getHeader()});
    }
    
    findByReg(id: number) {
        return this.http.post(`${this.resourceAllByRUrl}`, +id,  {headers:this.authService.getHeader()});
    }
    
    find(id: number): Observable<TypeRegroupement> {
        return this.http.post(`${this.resourceUrl}`, +id,  {headers:this.authService.getHeader()});/*.pipe(map((res: Response) => {
            return res.json();
        }));*/
    }
    
    findByLibel(m: string) {
        return this.http.post(`${this.resourceLibUrl}`, m,  {headers:this.authService.getHeader()});
    }

    /*query(req?: any): Observable<ResponseWrapper> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options).pipe(
            map((res: Response) => this.convertResponse(res)));
    }*/

    delete(id: number): Observable<TypeRegroupement> {
        return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
    }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
         return this.http.get('http://localhost:8087/api/chercherTypeRegroupements?mot =' + motCle); // .pipe( // + '&page=' + page + '&size=' + size)
           // map(res => res.json()));
     }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(typeRegroupement: TypeRegroupement): TypeRegroupement {
        const copy: TypeRegroupement = Object.assign({}, typeRegroupement);
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
