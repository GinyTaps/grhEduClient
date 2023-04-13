
import {map} from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { Regroupement } from "./regroupement.model";
import { DatePipe } from "@angular/common";

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegroupementService implements OnInit {

    regroupement: Regroupement;
    
    private resourceChaineRegUrl = 'http://localhost:8087/api/findRegByChaine';
    private resourceChaineRegFilsUrl = 'http://localhost:8087/api/findSonsRegByChaine';
    public resourceChaineUrl = 'http://localhost:8087/api/findChaineRegroupements/';
    public resourceChaineNUrl = 'http://localhost:8087/api/findChaineRegroupementsN';
    private resourceLastUrl = 'http://localhost:8087/api/findLastRegroupement';
    private resourceAllUrl = 'http://localhost:8087/api/findRegroupements';
    private resourceTRUrl = 'http://localhost:8087/api/findRegroupementTR';
    private resourceUrl = 'http://localhost:8087/api/findRegroupement';
    private resourceCreateUrl = 'http://localhost:8087/api/createRegroupements';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateRegroupements';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteRegroupements';
    private resourceAllbyTRUrl = 'http://localhost:8087/api/findAllByTypeRegroupement';
    private searchUrl = '';

    constructor(
          private datePipe: DatePipe,
          private authService: AuthService,
          // private http: Http,
          private http: HttpClient ) { }
  
    ngOnInit() {
    }
  
    create(regroupement: Regroupement): Observable<Regroupement> {
        const copy = this.convert(regroupement);
        // console.log(copy);
        /* console.log('**********Contenu de lemail: ' + this.regroupement.emailChomeur + '*******');
        console.log('**********Contenu du type nationalite: ' + this.chomeur.codeTypeNationalite + '*******'); */
      return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      /*.pipe(
      map(res =>  res.json() ));*/

        }
    
    find(id: number): Observable<Regroupement> {
        let r = new Regroupement();
        r.codeRegroupement = id;
        return this.http.post(`${this.resourceUrl}`, r, {headers:this.authService.getHeader()});
      }
    
    findAllByTReg(id: number): Observable<Regroupement> {
        return this.http.post(`${this.resourceAllbyTRUrl}`, +id, {headers:this.authService.getHeader()});
      }
    
    findLast(id: number): Observable<Regroupement> {
        return this.http.post(`${this.resourceLastUrl}`, id, {headers:this.authService.getHeader()});
      }
    
    findTR(id: number): Observable<Regroupement> {
        return this.http.post(`${this.resourceTRUrl}`, id, {headers:this.authService.getHeader()});
      }
    
    findChaine(id): Observable<any> {
        return this.http.post<any>(`${this.resourceChaineNUrl}`, id, {headers:this.authService.getHeader()});
        
      }
    
    getChaineReg(id: number) {
        return this.http.post<Regroupement[]>(`${this.resourceChaineRegUrl}`, +id, {headers:this.authService.getHeader()});       
    }
    
    getChaineRegFils(id: number) {
        return this.http.post<Regroupement[]>(`${this.resourceChaineRegFilsUrl}`, +id, {headers:this.authService.getHeader()});       
    }
    
    update(regroupement: Regroupement): Observable<Regroupement> {
            const copy = this.convert(regroupement);
            return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
            /*.pipe(
            map((res: Response) => {
                const jsonResponse = res.json();
                // this.convertItemFromServer(jsonResponse);
                return jsonResponse;
              }));*/
          }
    
    getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        /*.pipe(
        map(res => res.json()));*/

      }
    
    search(motCle: string, page: number, size: number) {
        console.log(motCle);
         return this.http.get('http://localhost:8087/api/chercherRegroupements?mot =' + motCle);
         /*.pipe( // + '&page=' + page + '&size=' + size)
           map(res => res.json()));*/
       }

    delete(id: number){ // : Observable<Regroupement> {
         // console.log('**************** Dans le service, le chomeur supprimé est: ' + id + '**********************');
             return this.http.post(`${this.resourceDeleteUrl}`, id, {headers:this.authService.getHeader(), observe: 'response'}); // });
       }


    private convert(regroupement: Regroupement): Regroupement {
             const copy: Regroupement = Object.assign({}, regroupement);
             return copy;
         }
    private convertResponse( res: Response ): ResponseWrapper {
             const jsonResponse = res.json();
             return new ResponseWrapper( res.headers, jsonResponse, res.status );
         }
}

export class ResponseWrapper {
    constructor(
        public headers: Headers,
        public json: any,
        public status: number
    ) { }
}
