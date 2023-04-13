import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { BaseRequestOptions, URLSearchParams, Headers } from '@angular/http';
import { User } from './user.model';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { ResponseWrapper } from '../employe/employe.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
    

    private resourceAllUrl = 'http://localhost:8080/findUsers';
    private resourceUrl = 'http://localhost:8080/findUser';
    private resourceCreateUrl = 'http://localhost:8080/register';
    private resourceUpdateUrl = 'http://localhost:8080/updateUser';
    private resourceDeleteUrl = 'http://localhost:8080/deleteUser';
    private resourceUsernameUrl = 'http://localhost:8080/findUserByUsername';
    
    user: User;

      constructor(
              private authService: AuthService,
              private http: HttpClient
              ) { }

      ngOnInit() {
      }
      
      create(user: User): Observable<User> {
          const copy = this.convert(user);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(user: User): Observable<User> {
          const copy = this.convert(user);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get<any>(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }

      find(user: User): Observable<User> {
          const copy = this.convert(user);
          return this.http.post(this.resourceUrl, copy, {headers:this.authService.getHeader()});
      }
      /*find(id: number): Observable<User> {
          return this.http.get(`${this.resourceUrl}/${Number(id)}`, {headers:this.authService.getHeader()});
      }*/
      
      findByusername(name: string): Observable<User> {
          return this.http.post(`${this.resourceUsernameUrl}`, name, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(user): Observable<User> {
          const copy = this.convert(user);
          return this.http.post(this.resourceDeleteUrl, copy, {headers:this.authService.getHeader()});
      }
      /*delete(id: number): Observable<User> {
          return this.http.delete(`${this.resourceDeleteUrl}/${Number(id)}`,{headers:this.authService.getHeader()});
      }*/
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8080/chercherUsers?mot =' + motCle);
       }

      private convert(user: User): User {
          const copy: User = Object.assign({}, user);
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
