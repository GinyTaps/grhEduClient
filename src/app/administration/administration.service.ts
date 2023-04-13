import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { BaseRequestOptions, URLSearchParams, Headers } from '@angular/http';
import { Administration } from './administration.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

    private resourceUrl = 'http://localhost:8087/api/findAdministration';
    private resourceAllUrl = 'http://localhost:8087/api/findAdministrations';
    private resourceCreateUrl = 'http://localhost:8087/api/createAdministrations';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateAdministrations';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteAdministrations';
    private searchListUrl = 'http://localhost:8087/api/chercherListAdm';
    
    administration: Administration;

    constructor(
            private authService: AuthService,
            private http: HttpClient
            ) { }

    
    create(administration: Administration): Observable<Administration> {
        const copy = this.convert(administration);
        return this.http.post<Administration>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    }

    update(administration: Administration): Observable<Administration> {
        const copy = this.convert(administration);
        return this.http.post<Administration>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
    }

    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
      }

    find(id: number): Observable<Administration> {
        return this.http.post<Administration>(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
    }

    query(req?: any) {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number) : Observable<Administration> {
        return this.http.post(`${this.resourceDeleteUrl}`, +id,{headers:this.authService.getHeader()});
    }
    /*delete(id: number, d: String) : Observable<Response> {
        return this.http.delete<Response>(`${this.resourceDeleteUrl}/${id}/${d}`,{headers:this.authService.getHeader()});
    }*/
    
    searchList(id: number) {
        return this.http.post(`${this.searchListUrl}`, +id, {headers:this.authService.getHeader()});
      }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
          return this.http.get('http://localhost:8087/api/chercherAdministrations?mot =' + motCle);
     }

    private convert(administration: Administration): Administration {
        const copy: Administration = Object.assign({}, administration);
        return copy;
    }

    /*createRequestOption = (req?: any): BaseRequestOptions => {
    const options: BaseRequestOptions = new BaseRequestOptions();
    if (req) {
        const params: URLSearchParams = new URLSearchParams();
        params.set('page', req.page);
        params.set('size', req.size);
        if (req.sort) {
            params.paramsMap.set('sort', req.sort);
        }
        params.set('query', req.query);

        options.params = params;
    }
    return options;
  }*/
}
