import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AuthService } from '../auth.service';
import { Profile } from './profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    private resourceAllUrl = 'http://localhost:8080/findGroupes';
    private resourceUrl = 'http://localhost:8080/findGroupe';
    private resourceUrlOne = 'http://localhost:8080/findGroupeById';
    private resourceCreateUrl = 'http://localhost:8080/saveGroupe';
    private resourceUpdateUrl = 'http://localhost:8080/updateGroupe';
    private resourceDeleteUrl = 'http://localhost:8080/deleteGroupe';
    
  constructor(
          private router: Router,
          private http: HttpClient,
          private authService: AuthService
  ) {}
  
  
  create(profile: Profile): Observable<Profile> {
      const copy = this.convert(profile);
      return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
  }

  update(profile: Profile): Observable<Profile> {
      const copy = this.convert(profile); 
      /*const headers = new Headers();
      headers.append('Access-Control-Allow-Headers', 'Content-Type');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
      headers.append('Access-Control-Allow-Origin', '*');*/
      
      return this.http.post(this.resourceUpdateUrl, profile, {headers:this.authService.getHeader()});
  }

  getAll() {
      return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
    }

  find(profile: Profile): Observable<Profile> {
      const copy = this.convert(profile);
      // return this.http.get(this.resourceUrl, copy, {headers:this.authService.getHeader()});
      return this.http.post(this.resourceUrl, copy, {headers:this.authService.getHeader()});
  }
  
  findOne(id: number): Observable<Profile> {
      return this.http.post(this.resourceUrlOne, id, {headers:this.authService.getHeader()});
  }

  query(req?: any) {
      return this.http.get(this.resourceUrl);
  }

  delete(p): Observable<Profile> {
      const copy = this.convert(p);
      return this.http.post(this.resourceDeleteUrl, copy,{headers:this.authService.getHeader()});
  }
  
  search(motCle: string, page: number, size: number) {
      console.log(motCle);
        return this.http.get('http://localhost:8080/chercherUsers?mot =' + motCle);
   }

  private convert(p: Profile): Profile {
      const copy: Profile = Object.assign({}, p);
      return copy;
  }
  
}
