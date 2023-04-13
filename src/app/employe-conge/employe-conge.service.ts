
import {map} from 'rxjs/operators';
import { Injectable, OnInit, ElementRef } from '@angular/core';
import { EmployeConge } from './employe-conge.model';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeCongeService implements OnInit {

 employeConge: EmployeConge;

    private resourceUrl = 'http://localhost:8087/api/findEmployeConge';
    private resourceAllUrl = 'http://localhost:8087/api/findEmployeConges';
    private resourceCreateUrl = 'http://localhost:8087/api/createEmployeConges';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateEmployeConges';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteEmployeConges';
    private resourceFindAllUrl = 'http://localhost:8087/api/findCongesOfEmploye';
    private congeBDUrl = 'http://localhost:8087/api/congesBd';
    private verifCongeDatesUrl = 'http://localhost:8087/api/verifDatesEmployeConges';
    private verifDureeCongeUrl = 'http://localhost:8087/api/verifDureeConge';
    private resourceLast = 'http://localhost:8087/api/findLastConge';
    private searchUrl = '';
    conge: String = null;
    validDates: String;
    validDuree: String;
    
        constructor(
          private datePipe: DatePipe,
          private authService: AuthService,
          private http: HttpClient) {}
    
        ngOnInit() {
      }
    
      create(employeConge: EmployeConge) : Observable<EmployeConge> {
          const copy = this.convert(employeConge);
          // console.log(copy);
          return this.http.post<EmployeConge>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
    
          }
    
      find(empC: EmployeConge) : Observable<EmployeConge> {
          const copy = this.convert(empC);  
          return this.http.post<EmployeConge>(`${this.resourceUrl}`, copy, {headers:this.authService.getHeader()});
       } 
      
      findLast(id: number) : Observable<EmployeConge> {
          return this.http.post<EmployeConge>(`${this.resourceLast}`, +id, {headers:this.authService.getHeader()});
     }
      
      findAll(id: number) : Observable<EmployeConge> {
          return this.http.post<EmployeConge>(`${this.resourceFindAllUrl}`, +id, {headers:this.authService.getHeader()});
     }
      
      getBetweenDates(empC: EmployeConge) {
          const copy = this.convert(empC);  
          return this.http.post(`${this.congeBDUrl}`, copy, {headers:this.authService.getHeader()}).pipe(map( (res: Response) => {
              this.conge = res.toString();
              // console.log('*********** Réponse du serveur des dates se chevauchant: ' +this.conge);
              return this.conge; // res.text().toString(); // retourne le contenu de la réponse(du corps) 
            }));
          
      }
      verifDates(empC: EmployeConge) {
          const copy = this.convert(empC);  
          return this.http.post(`${this.verifCongeDatesUrl}`, copy, {headers:this.authService.getHeader()}).pipe(map( (res: Response) => {
              // this.validDates = null;
              // this.validDates = res.text().toString();
              this.validDates = res.toString();
              // console.log(this.validDates);
              return this.validDates; // res.text().toString();
          }));
      }
      
      verifDureeConge(empC: EmployeConge) {
          const copy = this.convert(empC);  
          return this.http.post(`${this.verifDureeCongeUrl}`, copy, {headers:this.authService.getHeader()}).pipe(map( (res: Response) => {
              // this.validDates = null;
              // this.validDuree = res.text().toString();
              this.validDuree = res.toString();
              // console.log('*********** Réponse du serveur de la validité de la durée: ' +this.validDates);
              return this.validDuree; // res.text().toString();
          }));
      }
      
      update(employeConge: EmployeConge): Observable<EmployeConge> {
            const copy = this.convert(employeConge);
            // put<EmployeConge> permet d'éviter une erreur à cause de la conversion des objets de type EmployeConge(dates) dans la fonction convert()
            return this.http.put<EmployeConge>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }
    
      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
    
      }
    
      search(motCle: string, page: number, size: number) {
       console.log(motCle);
       return this.http.get('');
        /*return this.http.get('http://localhost:8087/api/chercherEmployes?mot =' + motCle).pipe( // + '&page=' + page + '&size=' + size)
          map(res => res.json()));*/
      }
    
      delete(id:number, d:string) : Observable<EmployeConge> { // Observable<Response> {
        /*console.log('**************** Dans le service le code du congé supprimé est: ' + id + '**********************');
        console.log('**************** Dans le service la date du congé supprimé est: ' + d + '**********************');*/
          let empC = new EmployeConge();
          empC.id.codeEmploye = id.toString();
          empC.id.dateDebutConge = d;
          const copy = this.convert(empC);  
          return this.http.post<EmployeConge>(`${this.resourceDeleteUrl}`, copy, {headers:this.authService.getHeader()});
      }
    
       private convert(employeConge: EmployeConge): EmployeConge {
            const copy: EmployeConge = Object.assign({}, employeConge);
    
            if ((copy.id.dateDebutConge != null && copy.dateFinConge != null)) { // && (copy.comDebutConge != null && copy.comFinConge != null)) {
              copy.id.dateDebutConge = this.datePipe.transform(employeConge.id.dateDebutConge, 'yyyy-MM-dd');
              copy.dateFinConge = this.datePipe.transform(employeConge.dateFinConge, 'yyyy-MM-dd');
            }
            
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
    
    export  class DataUtils {
        constructor() {};
        abbreviate(text: string, append?: string): any {}
        byteSize(base64String: string): any{}
        openFile(type: string, data: string): void{}
        toBase64(file: File, cb: Function): void{}
        clearInputImage(entity: any, elementRef: ElementRef, field: string, fieldContentType: string, idInput: string): void{}
        private endsWith(suffix, str){}
        private paddingSize(value){}
        private size(value){}
        private formatAsBytes(size){}
        setFileData(event: any, entity: any, field: string, isImage: boolean): void{}
    }
