
import {map,  filter, share } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
// import { Http, Response, BaseRequestOptions, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Employe } from './employe.model';

import { Observable, Observer, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { $ } from 'protractor';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { isNull } from 'util';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Injectable()

export class EmployeService implements OnInit {


 employes = [
  {CODE_EMPLOYE: 1, Matricule: 'BN233', Nom: 'Tapsoba', Prenom: 'Armande', enseigne_Y_N: 'Oui', confirme_Y_N: 'Oui',
  Date_Naissance: '10/10/70', Cin: 'BN4535', Date_Cin: '', Tel: '', Adresse: '', Email: '',
  Date_Eng: '', Date_Tit: '', Employe_Affectation: ''}
];

employe: Employe; /* = {code_EMPLOYE: null , matricule_EMPLOYE: '', nom_EMPLOYE: '', prenom_EMPLOYE: '', enseigne_Y_N: '', confirme_Y_N: '',
  date_NAISS_EMPLOYE: '', cin_EMPLOYE: '', date_Cin_EMPLOYE: '', tel_EMPLOYE: '', adresse_EMPLOYE: '', email_EMPLOYE: '',
  date_Eng_EMPLOYE: '', date_Tit_EMPLOYE: '', employe_AFFECTATION_EMPLOYE: ''}; */

listEmp = [ ];
private resourceUrl = 'http://localhost:8087/api/findEmploye';
private resourceAllUrl = 'http://localhost:8087/api/findEmployes';
private resourceCreateUrl = 'http://localhost:8087/api/createEmployes';
private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployes';
private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployes';
/*****************=========== Urls de la recherche avec les regroupements pris en compte(Employé, Administration, Etablissement, Avec/sans poste) ============************************/
private resourceSearchRUrl = 'http://localhost:8087/api/chercherEmpReg';
private resourceSearchRAUrl = 'http://localhost:8087/api/chercherEmpRegAdm';
private resourceSearchREUrl = 'http://localhost:8087/api/chercherEmpRegEtab';
private resourceSearchRWPUrl = 'http://localhost:8087/api/chercherEmpRegWP';
private resourceSearchRWPAUrl = 'http://localhost:8087/api/chercherEmpRegWPAdm';
private resourceSearchRWPEUrl = 'http://localhost:8087/api/chercherEmpRegWPEtab';
private resourceSearchRWOPUrl = 'http://localhost:8087/api/chercherEmpRegWOP';
private resourceSearchRWOPAUrl = 'http://localhost:8087/api/chercherEmpRegWOPAdm';
private resourceSearchRWOPEUrl = 'http://localhost:8087/api/chercherEmpRegWOPEtab';
/*****************=========== Urls de la recherche sur les employés uniquement(Employé, Administration, Etablissement, Avec/sans poste) ============************************/
private resourceSearchUrl = 'http://localhost:8087/api/chercherEmployes';
private resourceSearchAUrl = 'http://localhost:8087/api/chercherEmpAdm';
private resourceSearchEUrl = 'http://localhost:8087/api/chercherEmpEtab';
private resourceSearchWPUrl = 'http://localhost:8087/api/chercherEmpWP';
private resourceSearchWPAUrl = 'http://localhost:8087/api/chercherEmpWPAdm';
private resourceSearchWPEUrl = 'http://localhost:8087/api/chercherEmpWPEtab';
private resourceSearchWOPUrl = 'http://localhost:8087/api/chercherEmpWOP';
private resourceSearchWOPAUrl = 'http://localhost:8087/api/chercherEmpWOPAdm';
private resourceSearchWOPEUrl = 'http://localhost:8087/api/chercherEmpWOPEtab';
/*****************=========== Urls de la recherche globale(Employé, Administration, Etablissement, Avec/sans poste) ============************************/
private resourceSearchRAGUrl = 'http://localhost:8087/api/chercherEmpRegAdmGlob';
private resourceSearchRATSGUrl = 'http://localhost:8087/api/chercherEmpRegAdmGlobTS';
private resourceSearchREGUrl = 'http://localhost:8087/api/chercherEmpRegEtabGlob';
private resourceSearchRWPAGUrl = 'http://localhost:8087/api/chercherEmpRegWPAdmGlob';
private resourceSearchRWPATSGUrl = 'http://localhost:8087/api/chercherEmpRegWPAdmGlobTS';
private resourceSearchRWPEGUrl = 'http://localhost:8087/api/chercherEmpRegWPEtabGlob';
private resourceSearchRWOPAGUrl = 'http://localhost:8087/api/chercherEmpRegWOPAdmGlob';
private resourceSearchRWOPATSGUrl = 'http://localhost:8087/api/chercherEmpRegWOPAdmGlobTS';
private resourceSearchRWOPEGUrl = 'http://localhost:8087/api/chercherEmpRegWOPEtabGlob';
/*****************=========== Urls de la recherche prédéfinie(Employé, Administration, Etablissement, Avec/sans poste) ========************************/
private resourceSearchRAPUrl = 'http://localhost:8087/api/chercherEmpRegAdmPred';
private resourceSearchREPUrl = 'http://localhost:8087/api/chercherEmpRegEtabPed';
private resourceSearchRWPAPUrl = 'http://localhost:8087/api/chercherEmpRegWPAdmPred';
private resourceSearchRWPEPUrl = 'http://localhost:8087/api/chercherEmpRegWPEtabPred';
private resourceSearchRWOPAPUrl = 'http://localhost:8087/api/chercherEmpRegWOPAdmPred';
private resourceSearchRWOPEPUrl = 'http://localhost:8087/api/chercherEmpRegWOPEtabPred';

// private resourceUrl = 'http://192.168.43.241:8087/api/employes';
private searchUrl = '';
private host: string;
private authToken: string;
// private options: RequestOptions = null;
private headers: HttpHeaders;

private httpOption = { headers: new HttpHeaders({
          'Access-Control-Allow-Origin': 'http://localhost:8087',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
          'Access-Control-Allow-Headers': 'X-Requested-With, content-type'}) };

    constructor(
      private datePipe: DatePipe,
      private authService: AuthService,
      // private http: Http,
      private http: HttpClient,
      private router: Router
      ) {}

    ngOnInit() {
  }

  create(employe: Employe): Observable<Employe> {
      const copy = this.convert(employe);
      // console.log(copy);
      /*console.log('********** Contenu de lenregistrement: ');
      console.log(copy);
      console.log(' *******');*/
      /* console.log('**********Contenu de lemail: ' + this.employe.emailEmploye + '*******');
      console.log('**********Contenu du type nationalite: ' + this.employe.codeTypeNationalite + '*******'); */
    return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    // return this.http.post(btoa(this.resourceCreateUrl), copy, {headers:this.authService.getHeader()}); // permet de crypter l'url
    // .map(res =>  res.json() );

      }
    // return this.http.post(this.resourceUrl, employe)


  /* create( employe: Employe ): Observable<ResponseWrapper> {
      const copy = this.convert(employe);
      console.log(copy);
        return this.http.post( this.resourceUrl, employe )
            .map(( res: Response ) => this.convertResponse( res ) );
    }
   */

      find(id: number): Observable<Employe> {
          return this.http.post(this.resourceUrl, +id, {headers:this.authService.getHeader()});
      }
      

      /*createAuthorizationHeader(): RequestOptions {
      // Just checking is this._options is null using lodash
      if (isNull(this.options)) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        headers.append('Authorization', this.authService.jwtToken);
        this.options = new RequestOptions({headers: headers});
      }
      return this.options;
   }*/

   /* createAuthorizationHeader(): HttpHeaders {
      // Just checking is this._options is null using lodash
      if (isNull(this.headers)) {
        const headers = new HttpHeaders()
           .set('Content-Type', 'application/json; charset=utf-8')
           .set('Authorization', this.authToken || '');
        this.headers = new RequestOptions({headers: headers});
      }

      return this.headers;
   } */

      update(employe: Employe) : Observable<Employe> {
        const copy = this.convert(employe);
        const headers = new Headers();
        // const options = this.createAuthorizationHeader();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        headers.append('Access-Control-Allow-Origin', '*');
        return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
        // return this.http.put(btoa(this.resourceUpdateUrl), copy, {headers:this.authService.getHeader()});
        
        // return this.http.patch(this.resourceUrl, copy, {headers:this.authService.getHeader()}); // permet de mettre à jour que les données envoyées par l'utilisateur
        /*.pipe( // ..., options) // {headers: this.createAuthorizationHeader()})  // {headers: headers})
        // return this.http.post(this.resourceUpdateUrl, copy)
        map((res: Response) => {
            const jsonResponse = res.json();
            // this.convertItemFromServer(jsonResponse);
            return jsonResponse;
          }));*/
      }

       /* update(employe: Employe): Observable<ResponseWrapper> {
        return this.http.put(this.resourceUrl, employe)
        .map((res: Response) => this.convertResponse(res));
      } */

      getAll() {
        return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
          // .map(res => res.json());
      }
/*****************=========== fonctions de la recherche sur les employés uniquement(Employé, Administration, Etablissement, Avec/sans poste) ============************************/

      search(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number) { // , page: number, size: number) {
          return this.http.get(`${this.resourceSearchUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}`, {headers:this.authService.getHeader()});
      }
      
      searchA(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number, x: number) { // , page: number, size: number) {
          return this.http.get(`${this.resourceSearchAUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}`, {headers:this.authService.getHeader()});
      }
      
      
      searchE(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number, x: number, y: string) { // , page: number, size: number) {
          return this.http.get(`${this.resourceSearchEUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}/${y}`, {headers:this.authService.getHeader()});
      }
      
      searchWithP(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number) { // , page: number, size: number) {
          return this.http.get(`${this.resourceSearchWPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}`, {headers:this.authService.getHeader()});
      }
      
      searchWithPAdm(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number, x: number) { 
          return this.http.get(`${this.resourceSearchWPAUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}`, {headers:this.authService.getHeader()});
      }
      
      searchWithPEtab(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number, x: number, y: string) { 
          return this.http.get(`${this.resourceSearchWPEUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}/${y}`, {headers:this.authService.getHeader()});
      }
      
      searchWithOP(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number) { // , page: number, size: number) {
          return this.http.get(`${this.resourceSearchWOPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}`, {headers:this.authService.getHeader()});
      }
      
      searchWithOPAdm(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number, v: number, 
              w: number, x: number) { 
          return this.http.get(`${this.resourceSearchWOPAUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}`, {headers:this.authService.getHeader()});
      }

      searchWithOPEtab(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number, v: number, 
              w: number, x: number, y: string) { 
          return this.http.get(`${this.resourceSearchWOPEUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}/${y}`, {headers:this.authService.getHeader()});
      }

/*****************=========== fonctions de la recherche avec les regroupements pris en compte(Employé, Administration, Etablissement, Avec/sans poste) ============************************/

      searchR(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number) { 
          return this.http.get(`${this.resourceSearchRUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}`, {headers:this.authService.getHeader()});
      }
      
      searchRA(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number, x: number) { // , y: number) { 
          return this.http.get(`${this.resourceSearchRAUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}`, {headers:this.authService.getHeader()}); // /${y}`);
      }
      
      searchRE(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number, y: number, z: string) { //  , x: number 
          return this.http.get(`${this.resourceSearchREUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${y}/${z}`, {headers:this.authService.getHeader()}); // /${x}
      }
      
      searchRWithP(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number) { // , page: number, size: number) {
          return this.http.get(`${this.resourceSearchRWPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}`, {headers:this.authService.getHeader()});
      }
          
      searchRWithPAdm(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number, x: number) { // , y: number) { 
          return this.http.get(`${this.resourceSearchRWPAUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}`, {headers:this.authService.getHeader()}); // /${y}`);
      }
      
      searchRWithPEtab(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number, y: number, z: string) {  // , x: number
         return this.http.get(`${this.resourceSearchRWPEUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${y}/${z}`, {headers:this.authService.getHeader()}); // /${x}
      }
      
      searchRWithOP(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number,
              v: number, w: number) { // , page: number, size: number) {
          return this.http.get(`${this.resourceSearchRWOPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}`, {headers:this.authService.getHeader()});
      }
      
      searchRWithOPAdm(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number, v: number, 
              w: number, x: number) { // , y: number) { 
          return this.http.get(`${this.resourceSearchRWOPAUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${x}`, {headers:this.authService.getHeader()}); // /${y}`);
      }
      
      searchRWithOPEtab(m: string, n: string, o: string, p: number, q: number, r:number, s: number, u: number, v: number, 
              w: number, y: number, z: string) { // , x: number
          return this.http.get(`${this.resourceSearchRWOPEUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${u}/${v}/${w}/${y}/${z}`, {headers:this.authService.getHeader()}); // /${x}
      }

/*****************=========== fonctions de la recherche globale(Employé, Administration, Etablissement, Avec/sans poste) ============************************/

      searchRAG(m: string, n: string, o: string, p: number, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: string) { 
          return this.http.get(`${this.resourceSearchRAGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}`, {headers:this.authService.getHeader()});
      }
      
      searchRATSG(m: string, n: string, o: string, p: number, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: string) { 
          return this.http.get(`${this.resourceSearchRATSGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}`, {headers:this.authService.getHeader()});
      }
      
      searchREG(m: string, n: string, o: string, p: string, q: string, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: number, a: string) {
          return this.http.get(`${this.resourceSearchREGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }
        
      searchRWithPAdmG(m: string, n: string, o: string, p: number, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: string) { 
          return this.http.get(`${this.resourceSearchRWPAGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}`, {headers:this.authService.getHeader()});
      }
      
      searchRWithPAdmTSG(m: string, n: string, o: string, p: number, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: string) { 
          return this.http.get(`${this.resourceSearchRWPATSGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}`, {headers:this.authService.getHeader()});
      }
      
      searchRWithPEtabG(m: string, n: string, o: string, p: string, q: string, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: number, a: string) {
         return this.http.get(`${this.resourceSearchRWPEGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }
      
      searchRWithOPAdmG(m: string, n: string, o: string, p: number, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: string) { 
          return this.http.get(`${this.resourceSearchRWOPAGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}`, {headers:this.authService.getHeader()});
      }
      
      searchRWithOPAdmTSG(m: string, n: string, o: string, p: number, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: string) { 
          return this.http.get(`${this.resourceSearchRWOPATSGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}`, {headers:this.authService.getHeader()});
      }
      
      searchRWithOPEtabG(m: string, n: string, o: string, p: string, q: string, r:number, s: number, t: number, u: number, v: number, 
              w: number, x: number, y: string, z: number, a: string) {
          return this.http.get(`${this.resourceSearchRWOPEGUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }

/*****************=========== fonctions de la recherche prédéfinie(Employé, Administration, Etablissement, Avec/sans poste) ============************************/

      searchRAP(m: string, n: string, o: string, p: string, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: number, z: string, a: string) { 
          return this.http.get(`${this.resourceSearchRAPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }
      
      searchREP(m: string, n: string, o: string, p: string, q: string, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: number, a: string) {
          return this.http.get(`${this.resourceSearchREPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }
        
      searchRWithPAdmP(m: string, n: string, o: string, p: string, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: number, z: string, a: string) { 
          return this.http.get(`${this.resourceSearchRWPAPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }
      
      searchRWithPEtabP(m: string, n: string, o: string, p: string, q: string, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: number, a: string) {
         return this.http.get(`${this.resourceSearchRWPEPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }
      
      searchRWithOPAdmP(m: string, n: string, o: string, p: string, q: number, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: number, z: string, a: string) {
          return this.http.get(`${this.resourceSearchRWOPAPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${s}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }
      searchRWithOPEtabP(m: string, n: string, o: string, p: string, q: string, r:number, s: number, t: number, u: number,
              v: number, w: number, x: number, y: string, z: number, a: string) {
          return this.http.get(`${this.resourceSearchRWOPEPUrl}/${m}/${n}/${o}/${p}/${q}/${r}/${t}/${u}/${v}/${w}/${x}/${y}/${z}/${a}`, {headers:this.authService.getHeader()});
      }

/*****************=========== Fin des fonctions de recherche (Employé, Administration, Etablissement, Avec/sans poste) ============************************/

      
      searchBy(mot1: string, mot2: string, mot3: string){ //, page: number, size: number) {
          console.log(mot1);
            return this.http.get('http://localhost:8087/api/chercherEmployesBy?mot1 =' + mot1+'?mot2 =' + mot2+'?mot3 =' + mot3);
      }

  /* getEmployeByFirstNameOrLastName( name: string ): Promise<Employe[]> {
        const url = `http://localhost:8080/api/chercherEmployes/${name}`;
        return this.http.get( url )
            .toPromise()
            .then(( response ) => response.json() as Employe )
            .catch( this.handleError );
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'Error', error ); // for demo purposes only
        return Promise.reject( error.message || error );
    } */

  delete(id): Observable<Employe> {
    return this.http.post(`${this.resourceDeleteUrl}`, id, {headers:this.authService.getHeader()});
    }

private convert(employe: Employe): Employe {
        const copy: Employe = Object.assign({}, employe);

        if (copy.enseigneYN !== null) {
          copy.enseigneYN = 1;
        } else {
          copy.enseigneYN = 0;
        }
        if (copy.confirmeYN !== null) {
          copy.confirmeYN = 1;
        } else {
          copy.confirmeYN = 0;
        }
        if(copy.dateNaissEmploye !== null && copy.dateCinEmploye != null && copy.dateEngEmploye !== null && copy.dateTitEmploye != null) {
            copy.dateNaissEmploye = this.datePipe.transform(employe.dateNaissEmploye, 'yyyy-MM-dd');
            copy.dateCinEmploye = this.datePipe.transform(employe.dateCinEmploye, 'yyyy-MM-dd');
            copy.dateEngEmploye = this.datePipe.transform(employe.dateEngEmploye, 'yyyy-MM-dd');
            copy.dateTitEmploye = this.datePipe.transform(employe.dateTitEmploye, 'yyyy-MM-dd');
        } 

        return copy;
    }
  private convertResponse( res: Response ): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper( res.headers, jsonResponse, res.status );
    }
  
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 5) {
      // calculate total pages
      let totalPages = Math.ceil(totalItems / pageSize);

      // ensure current page isn't out of range
      if (currentPage < 1) { 
          currentPage = 1; 
      } else if (currentPage > totalPages) { 
          currentPage = totalPages; 
      }
      
      let startPage: number, endPage: number;
      if (totalPages <= 10) {
          // less than 10 total pages so show all
          startPage = 1;
          endPage = totalPages;
      } else {
          // more than 10 total pages so calculate start and end pages
          if (currentPage <= 6) {
              startPage = 1;
              endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
              startPage = totalPages - 9;
              endPage = totalPages;
          } else {
              startPage = currentPage - 5;
              endPage = currentPage + 4;
          }
      }

      // calculate start and end item indexes
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

      // return object with all pager properties required by the view
      return {
          totalItems, // : totalItems,
          currentPage, // : currentPage,
          pageSize, // : pageSize,
          totalPages, // : totalPages,
          startPage, // : startPage,
          endPage, // : endPage,
          startIndex, // : startIndex,
          endIndex, // : endIndex,
          pages // : pages
      };
  }
  
  getRouteEmp( code: number, codeEmp: number, dateEmp: string) {
      
      switch (code) {
      case (code = 1): {
          this.router.navigate(['/employe-affectation'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          } 
      case (code = 2): {
          this.router.navigate(['/employe-conge'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 3): {
          this.router.navigate(['/employe-deces'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 4): {
          this.router.navigate(['/employe-demission'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 5): {
          this.router.navigate(['/employe-detachement'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 6): {
          this.router.navigate(['/employe-disponibilite'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 7): {
          this.router.navigate(['/employe-mutation'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 8): {
          this.router.navigate(['/employe-retraite'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 9): {
          this.router.navigate(['/employe-renvoi'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 10): {
          this.router.navigate(['/employe-revocation'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 11): {
          this.router.navigate(['/employe-suspension'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      case (code = 12): {
          this.router.navigate(['/employe-transfert'], {queryParams: { id: codeEmp, d: dateEmp}});
          break;
          }
      default: {
              break;
          }
      }
      
      
  }

}

export class ResponseWrapper {
    constructor(
        public headers: Headers,
        public json: any,
        public status: number
    ) { }
}


