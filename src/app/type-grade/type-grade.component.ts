import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeGrade } from '../type-grade/type-grade.model';
import { TypeGradeService } from '../type-grade/type-grade.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-grade',
  templateUrl: './type-grade.component.html',
  styleUrls: ['./type-grade.component.css']
})
export class TypeGradeComponent implements OnInit {

    typeGrade: TypeGrade = new TypeGrade();
    typeGrades: TypeGrade[] = new Array();
    empSelected: number;
    routeData: any;
    subscription: Subscription;
    mode: number;
    id: number;
    title: string;
    typesTable: string[];
    typeSelected: string;
    header: string;
    p: number = 1; //pour la pagination

    constructor(
            private typeCategorieService: TypeCategorieService,
          private typeGradeService: TypeGradeService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeGrade";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeGrades();
  }
  
  loadAll() {
      this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de grade';   
      this.typeGradeService.getAll().subscribe(data => { 
        this.typeGrades = Array(data); 
        }, err => { 
            console.log(err); 
            });
      
  }
  
  selectType() {
      this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    registerChangeInTypeGrades() {
      this.eventManager.subscribe( 'typeGradesListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeGrade() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeGradeService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeGradesListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeGrade() {
      this.mode = 2;   
      this.header = "Création";
      this.typeGrade = new TypeGrade;
    }
    
    save() {
      // this.typeGrade.codeTypeGrade = this.id;
      this.subscribeToSaveResponse(this.typeGradeService.create(this.typeGrade));
    }
    
    subscribeToSaveResponse(result: Observable<TypeGrade>) {
      result.subscribe((res: TypeGrade) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeGradesListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeGrade(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeGradeService.find(id).subscribe( (typeGrade) => {
            this.typeGrade = typeGrade;
        });
    }
    
    edit() {
      /*this.typeGradeService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeGradesListModification'});
      });
      this.typeGrade.codeTypeGrade = this.id;*/
      this.subscribeToSaveResponse(this.typeGradeService.update(this.typeGrade));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeGradeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeGradesListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
