import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEchelonService } from './type-echelon.service';
import { TypeEchelon } from './type-echelon.model';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-echelon',
  templateUrl: './type-echelon.component.html',
  styleUrls: ['./type-echelon.component.css']
})
export class TypeEchelonComponent implements OnInit {

    typeEchelon: TypeEchelon = new TypeEchelon();
    typeEchelons: TypeEchelon[] = new Array();
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
          private typeEchelonService: TypeEchelonService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
        this.mode = 1;
        this.typeSelected = "TypeEchelon";
        this.loadAll();
        this.loadType();
        this.registerChangeInTypeEchelons();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types déchelon';
      this.typeEchelonService.getAll().subscribe(data => { 
          this.typeEchelons = Array(data); 
          }, err => { 
              console.log(err); 
              });
        
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    registerChangeInTypeEchelons() {
      this.eventManager.subscribe( 'typeEchelonsListModification', ( response ) => this.loadAll() );
    }
    
    /******************************* Détails et suppression ***********************************/
    detailsTypeEchelon() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeEchelonService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeEchelonsListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création  *************************************/
    createTypeEchelon() {
      this.mode = 2;
      this.header = "Création";
      this.typeEchelon = new TypeEchelon;
    }
    
    save() {
      // this.typeEchelon.codeTypeEchelon = this.id;
      this.subscribeToSaveResponse(this.typeEchelonService.create(this.typeEchelon));
    }
    
    subscribeToSaveResponse(result: Observable<TypeEchelon>) {
      result.subscribe((res: TypeEchelon) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeEchelonsListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeEchelon(id) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeEchelonService.find(id).subscribe( (typeEchelon) => {
            this.typeEchelon = typeEchelon;
        });
    }
    
    edit() {
      /*this.typeEchelonService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeEchelonsListModification'});
      });
      this.typeEchelon.codeTypeEchelon = this.id;*/
      this.subscribeToSaveResponse(this.typeEchelonService.update(this.typeEchelon));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeEchelonService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeEchelonsListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
