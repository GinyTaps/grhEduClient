import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Page } from './page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {

    private resourceAllUrl = 'http://localhost:8080/findPages';
    private resourceUrl = 'http://localhost:8080/findPage';
    private resourceCreateUrl = 'http://localhost:8080/savePage';
    private resourceUpdateUrl = 'http://localhost:8080/updatePage';
    private resourceDeleteUrl = 'http://localhost:8080/deletePage';
    
  constructor(
          private router: Router,
          private http: HttpClient,
          private authService: AuthService
  ) {}
  
  create(page: Page): Observable<Page> {
      // console.log(page);
      const copy = this.convert(page);
      // console.log(copy);
      return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
  }

  update(page: Page): Observable<Page> {
      const copy = this.convert(page);
      return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
  }

  getAll() {
      return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
    }

  find(id: number): Observable<Page> {
      let p = new Page();
      p.idPage = id;
      const copy = this.convert(p);
      return this.http.post(this.resourceUrl, copy, {headers:this.authService.getHeader()});
  }
  

  query(req?: any) {
      return this.http.get(this.resourceUrl);
  }

  delete(page: Page): Observable<Page> {
      const copy = this.convert(page);
      return this.http.post(this.resourceDeleteUrl, copy, {headers:this.authService.getHeader()});
  }
  
  search(motCle: string, page: number, size: number) {
      console.log(motCle);
        return this.http.get('http://localhost:8080/chercherUsers?mot =' + motCle);
   }

  private convert(p: Page): Page {
      const copy: Page = Object.assign({}, p);
      return copy;
  }
}
