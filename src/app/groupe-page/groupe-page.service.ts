import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { GroupePage } from '../groupe-page/groupe-page.model';
import { Profile } from '../profile/profile.model';
import { Page } from '../page/page.model';
import { TypeMethodeAutorise } from '../type-methode-autorise/type-methode-autorise.model';

@Injectable({
  providedIn: 'root'
})
export class GroupePageService {
    
    groupePage: GroupePage;

    private resourcePages = 'http://localhost:8080/findPagesOfGroupe';
    private resourceAllUrl = 'http://localhost:8080/findAllGroupePages'; 
    private resourceAllUrlT = 'http://localhost:8080/findGroupePages';
    private resourceUrl = 'http://localhost:8080/findGroupePage';
    private resourceCreateUrl = 'http://localhost:8080/saveGroupePage';
    private resourceUpdateUrl = 'http://localhost:8080/updateGroupePage';
    private resourceDeleteUrl = 'http://localhost:8080/deleteGroupePage';
    
  constructor(
          private router: Router,
          private http: HttpClient,
          private authService: AuthService
  ) {}
  
  create(groupePage: GroupePage): Observable<GroupePage> {
      const copy = this.convert(groupePage);
      return this.http.post<GroupePage>(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
  }

  update(groupePage: GroupePage): Observable<GroupePage> {
      const copy = this.convert(groupePage);
      return this.http.post<GroupePage>(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
  }

  getAll(): Observable<GroupePage> {
      return this.http.get<GroupePage>(this.resourceAllUrl, {headers:this.authService.getHeader()});
    }
  
  getPages(nomG: string) {
      return this.http.post(this.resourcePages, nomG, {headers:this.authService.getHeader(), observe: 'response'});
  }
  
  getAllT() {
      return this.http.get<any>(this.resourceAllUrlT, {headers:this.authService.getHeader()});
    }

  find(groupePage: GroupePage): Observable<GroupePage> {
      // console.log(groupePage );
      const copy = this.convert(groupePage);
      return this.http.post<GroupePage>(this.resourceUrl, copy, {headers:this.authService.getHeader()});
  }
  
  findByG(nomGroupe: String): Observable<GroupePage> {
      return this.http.post<GroupePage>(this.resourcePages, nomGroupe, {headers:this.authService.getHeader()});
  }
  

  query(req?: any) {
      return this.http.get(this.resourceUrl);
  }

  // Pour faciliter l'édition
  delete(g: Profile, p: Page, t: TypeMethodeAutorise): Observable<GroupePage> {
      /*console.log('********** Dans le service ***********');
      console.log(g);
      console.log(p);
      console.log(t);
      console.log('********** Fin ***********');*/
      let gp = new GroupePage;
      gp.groupe = g;
      gp.page = p;
      gp.typeMethodeAutorise = t;
      this.groupePage = gp;
      /*console.log('********** Dans le service ***********');
      console.log(this.groupePage);*/
      const copy = this.convert(this.groupePage);
      return this.http.post<GroupePage>(this.resourceDeleteUrl, copy, {headers:this.authService.getHeader()});
  }
  
  search(motCle: string, groupePage: number, size: number) {
      console.log(motCle);
        return this.http.get('http://localhost:8080/chercherUsers?mot =' + motCle);
   }

  private convert(p: GroupePage): GroupePage {
      const copy: GroupePage = Object.assign({}, p);
      return copy;
  }
}
