
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TypeNationalite } from './type-nationalite.model';
import { AuthService } from "../auth.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeNationaliteService {

  private resourceAllUrl = 'http://localhost:8087/api/findTypeNationalites';
  private resourceUrl = 'http://localhost:8087/api/findTypeNationalite';
  private resourceCreateUrl = 'http://localhost:8087/api/createTypeNationalites';
  private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeNationalites';
  private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeNationalites';

    constructor(
            private http: HttpClient,
            private authService: AuthService
            ) { }

    create(typeNationalite: TypeNationalite) : Observable<TypeNationalite> {
        const copy = this.convert(typeNationalite);
        return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()}); /*.pipe(map((res: Response) => {
            return res.json();
        }));*/
    }

    update(typeNationalite: TypeNationalite) : Observable<TypeNationalite> {
        const copy = this.convert(typeNationalite);
        return this.http.post(this.resourceUpdateUrl, copy , {headers:this.authService.getHeader()}); /*).pipe(map((res: Response) => {
            return res.json();
        }));*/
    }


    find(id: number) { // : Observable<TypeNationalite> {
        return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()}); /*.pipe(map((res: Response) => {
            // console.log('*##############Dans le service, la réponse: ' + res + '############');
            return res.json();
        }));*/
    }

    /*query(req?: any): Observable<ResponseWrapper> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options).pipe(
            map((res: Response) => this.convertResponse(res)
            ));
    }*/

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }
    
    /*search(motCle: string, page: number, size: number) {
        console.log(motCle);
         return this.http.get('http://localhost:8087/api/chercherTypeNationalites?mot =' + motCle).pipe( // + '&page=' + page + '&size=' + size)
           map(res => res.json()));
     }*/
    /* getAll() {
    return this.http.get(this.resourceUrl)
        .map((res: Response) => {
            this.convertResponse(res);
            console.log('###### Type nationalité ' + res + '#######');
        });
    } */

    /* getType(): Observable<TypeNationalite> {
            return this.http.get(this.resourceUrl)
                .do(data => console.log(JSON.stringify(data)))
                .catch(this.onError);
        } */

    onError(error) {
        console.log(error.message);
        return (error.message); // error(error.message, null, null);
    }

    delete(id: number) : Observable<TypeNationalite> {
        console.log('****************dans le service ' + id + '**********************');
        return this.http.post(this.resourceDeleteUrl, +id, {headers:this.authService.getHeader()});
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(typeNationalite: TypeNationalite): TypeNationalite {
        const copy: TypeNationalite = Object.assign({}, typeNationalite);
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
