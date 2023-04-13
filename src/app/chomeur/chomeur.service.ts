
import {map} from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { Chomeur } from "./chomeur.model";
import { DatePipe } from "@angular/common";

import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../auth.service';

@Injectable()
export class ChomeurService implements OnInit {
    
chomeur: Chomeur;
private resourceUrl = 'http://localhost:8087/api/findChomeur';
private resourceAllUrl = 'http://localhost:8087/api/findChomeurs';
private resourceCreateUrl = 'http://localhost:8087/api/createChomeurs';
private resourceUpdateUrl = 'http://localhost:8087/api/updateChomeurs';
private resourceDeleteUrl = 'http://localhost:8087/api/deleteChomeurs';
private searchViaUrl = 'http://localhost:8087/api/chercherChomeursViaNDN';

  constructor(
          private datePipe: DatePipe,
          private http: HttpClient,
          private authService: AuthService) { }
  
  ngOnInit() {
  }
  
  create(chomeur: Chomeur): Observable<Chomeur> {
      const copy = this.convert(chomeur);
      // console.log(copy);
      /* console.log('**********Contenu de lemail: ' + this.chomeur.emailChomeur + '*******');
      console.log('**********Contenu du type nationalite: ' + this.chomeur.codeTypeNationalite + '*******'); */
    return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    /*.pipe(
    map(res =>  res.json() ));*/

      }
  
  find(id: number): Observable<Chomeur> {
      return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()} ); 
    }
  
  update(chomeur: Chomeur): Observable<Chomeur> {
          const copy = this.convert(chomeur);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()}); 
        }
  
  getAll() {
      return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});

    }
  
  searchVia(nom: string, anneeDip: number, natinalite: number) {
      return this.http.get(`${this.searchViaUrl}/${nom}/${anneeDip}/+${natinalite}`);
  }
  
  search(motCle: string, page: number, size: number) {
      // console.log(motCle);
       return this.http.get('http://localhost:8087/api/chercherChomeurs?mot =' + motCle);
       /*.pipe( // + '&page=' + page + '&size=' + size)
         map(res => res.json()));*/
     }

  delete(id: number): Observable<Chomeur> {
      return this.http.post(`${this.resourceDeleteUrl}`, id, {headers:this.authService.getHeader()});
     }


  private convert(chomeur: Chomeur): Chomeur {
           const copy: Chomeur = Object.assign({}, chomeur);

             copy.dateNaissChomeur = this.datePipe.transform(chomeur.dateNaissChomeur, 'yyyy-MM-dd');
             copy.dateCinChomeur = this.datePipe.transform(chomeur.dateCinChomeur, 'yyyy-MM-dd');
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