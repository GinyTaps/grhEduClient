import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeCategorie } from './type-categorie.model';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TypeCategorieService {

    private resourceAllUrl = 'http://localhost:8087/api/findTypeCategories';
    private resourceUrl = 'http://localhost:8087/api/findTypeCategorie';
    private resourceUrlTables = 'http://localhost:8087/api/showTables';
    private resourceCreateUrl = 'http://localhost:8087/api/createTypeCategories';
    private resourceUpdateUrl = 'http://localhost:8087/api/updateTypeCategories';
    private resourceDeleteUrl = 'http://localhost:8087/api/deleteTypeCategories';
    
    typeCategorie: TypeCategorie;
    /*mode: number = 0;
    title: string;
    typeSelected: string;*/
    typesTable: string[];
    
      constructor(
              private authService: AuthService,
              private http: HttpClient,
              private router: Router
              ) { }

      
      create(typeCategorie: TypeCategorie): Observable<TypeCategorie> {
          const copy = this.convert(typeCategorie);
          return this.http.post(this.resourceCreateUrl, copy, {headers:this.authService.getHeader()});
      }

      update(typeCategorie: TypeCategorie): Observable<TypeCategorie> {
          const copy = this.convert(typeCategorie);
          return this.http.post(this.resourceUpdateUrl, copy, {headers:this.authService.getHeader()});
      }

      getAll() {
          return this.http.get(this.resourceAllUrl, {headers:this.authService.getHeader()});
        }
      
      getTables() {
          return this.http.get<string[]>(this.resourceUrlTables, {headers:this.authService.getHeader()});
        }

      find(id: number): Observable<TypeCategorie> {
          return this.http.post(`${this.resourceUrl}`, +id, {headers:this.authService.getHeader()});
      }

      query(req?: any) {
          return this.http.get(this.resourceUrl);
      }

      delete(id: number): Observable<TypeCategorie> {
          return this.http.post(`${this.resourceDeleteUrl}`, +id, {headers:this.authService.getHeader()});
      }
      
      search(motCle: string, page: number, size: number) {
          console.log(motCle);
            return this.http.get('http://localhost:8087/api/chercherTypeCategories?mot =' + motCle);
       }

      private convert(typeCategorie: TypeCategorie): TypeCategorie {
          const copy: TypeCategorie = Object.assign({}, typeCategorie);
          return copy;
      }

      
      selectType(typesTable: string[], typeSelected: string, mode: number) { // , title: string) {
          switch (typesTable && typeSelected) {
          case (typeSelected = "TypeCategorie"): {
              mode = 1; 
              this.router.navigateByUrl('/typeCategorie');
              break;
          } case (typeSelected = "TypeDiplome"): {
              mode = 1; 
              this.router.navigateByUrl('/typeDiplome');
              break;
          } case (typeSelected = "TypeEchelon"): {
              mode = 1; 
              this.router.navigateByUrl('/typeEchelon');
              break;
          } case (typeSelected = "TypeEtablissement"): {
              mode = 1;
              this.router.navigateByUrl('/typeEtablissement');
              break;
          } case (typeSelected = "TypeEtatCivil"): {
              mode = 1;
              this.router.navigateByUrl('/typeEtatCivil');
              break;
          } case (typeSelected = "TypeFonction"): {
              mode = 1;
              this.router.navigateByUrl('/typeFonction');
              break; 
          } case (typeSelected = "TypeGrade"): {
              mode = 1;
              this.router.navigateByUrl('/typeGrade');
              break; 
          } case (typeSelected = "TypeHandicap"): {
              mode = 1;
              this.router.navigateByUrl('/typeHandicap');
              break;
          } case (typeSelected = "TypeMilieu"): {
              mode = 1;
              this.router.navigateByUrl('/typeMilieu');
              break; 
          } case (typeSelected = "TypeMotifConge"): {
              mode = 1;
              this.router.navigateByUrl('/typeMotifConge');
              break; 
          } case (typeSelected = "TypeMotifDeces"): {
              mode = 1;
              this.router.navigateByUrl('/typeMotifDeces');
              break;
          } case (typeSelected = "TypeMotifRenvoi"): {
              mode = 1;
              this.router.navigateByUrl('/typeMotifRenvoi');
              break; 
          } case (typeSelected = "TypeMotifRetraite"): {
              mode = 1;
              this.router.navigateByUrl('/typeMotifRetraite');
              break; 
          } case (typeSelected = "TypeMotifSuspension"): {
              mode = 1;
              this.router.navigateByUrl('/typeMotifSuspension');
              break;
          } case (typeSelected = "TypeNationalite"): {
              mode = 1;
              this.router.navigateByUrl('/typeNationalite');
              break; 
          } case (typeSelected = "TypePathologie"): {
              mode = 1;
              this.router.navigateByUrl('/typePathologie');
              break; 
          } case (typeSelected = "TypeRegroupement"): {
              mode = 1;
              this.router.navigateByUrl('/typeRegroupement');
              break; 
          } case (typeSelected = "TypeSexe"): {
              mode = 1;
              this.router.navigateByUrl('/typeSexe');
              break; 
          } case (typeSelected = "TypeStatut"): {
              mode = 1;
              this.router.navigateByUrl('/typeStatut');
              break; 
          } case (typeSelected = "TypeStatutEntite"): {
              mode = 1;
              this.router.navigateByUrl('/typeStatutEntite');
              break; 
          } case (typeSelected = "TypeStatutEtablissement"): {
              mode = 1;
              this.router.navigateByUrl('/typeStatutEtablissement');
              break;
          } case (typeSelected = "TypeTitre"): {
              mode = 1;
              this.router.navigateByUrl('/typeTitre');
          } default: {
              break;
          }
         }
          
      }
}
