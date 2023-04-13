import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEtablissement } from './type-etablissement.model';
import { TypeEtablissementService } from './type-etablissement.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-etablissement',
  templateUrl: './type-etablissement.component.html',
  styleUrls: ['./type-etablissement.component.css']
})
export class TypeEtablissementComponent implements OnInit {

    typeEtablissement: TypeEtablissement = new TypeEtablissement();
    typeEtablissements: TypeEtablissement[] = new Array();
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
          private typeEtablissementService: TypeEtablissementService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
        this.mode = 1;
        this.typeSelected = "TypeEtablissement";
        this.loadAll();
        this.loadType();
        this.registerChangeInTypeEtablissements();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types dEtablissement';
      this.typeEtablissementService.getAll().subscribe(data => { 
      this.typeEtablissements = Array(data); 
          });
        
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    registerChangeInTypeEtablissements() {
      this.eventManager.subscribe( 'typeEtablissementsListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeEtablissement() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeEtablissementService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeEtablissementsListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeEtablissement() {
      this.mode = 2; 
      this.header = "Création";
      this.typeEtablissement = new TypeEtablissement;
    }
    
    save() {
      // this.typeEtablissement.codeTypeEtablissement = this.id;
      this.subscribeToSaveResponse(this.typeEtablissementService.create(this.typeEtablissement));
    }
    
    subscribeToSaveResponse(result: Observable<TypeEtablissement>) {
      result.subscribe((res: TypeEtablissement) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeEtablissementsListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeEtablissement(id) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
      
    }
    
    load(id) {
        this.typeEtablissementService.find(id).subscribe( (typeEtablissement) => {
            this.typeEtablissement = typeEtablissement;
        });
    }
    
    edit() {
      /*this.typeEtablissementService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeEtablissementsListModification'});
      });
      this.typeEtablissement.codeTypeEtablissement = this.id;*/
      this.subscribeToSaveResponse(this.typeEtablissementService.update(this.typeEtablissement));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeEtablissementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeEtablissementsListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
