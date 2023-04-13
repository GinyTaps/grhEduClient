import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';
import { TypeStatutEtablissement } from './type-statut-etablissement.model';
import { TypeStatutEtablissementService } from './type-statut-etablissement.service';

@Component({
  selector: 'app-type-statut-etablissement',
  templateUrl: './type-statut-etablissement.component.html',
  styleUrls: ['./type-statut-etablissement.component.css']
})
export class TypeStatutEtablissementComponent implements OnInit {

    typeStatutEtablissement: TypeStatutEtablissement = new TypeStatutEtablissement();
    typeStatutEtablissements: TypeStatutEtablissement[] = new Array();
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
          private typeStatutEtablissementService: TypeStatutEtablissementService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeStatutEtablissement";
      this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeStatutEtablissements();
    }
  
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de statut de lEtablissement';
      this.typeStatutEtablissementService.getAll().subscribe(data => { 
        this.typeStatutEtablissements = Array(data); 
         });
  }
    
    registerChangeInTypeStatutEtablissements() {
      this.eventManager.subscribe( 'typeStatutEtablissementsListModification', ( response ) => this.loadAll() );
    }
    
    
    selectType() {  
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeStatutEtablissement() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeStatutEtablissementService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeStatutEtablissementsListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeStatutEtablissement() {
      this.mode = 2; 
      this.header = "Création";
      this.typeStatutEtablissement = new TypeStatutEtablissement;
    }
    
    save() {
      // this.typeStatutEtablissement.codeTypeStatutEtablissement = this.id;
      this.subscribeToSaveResponse(this.typeStatutEtablissementService.create(this.typeStatutEtablissement));
    }
    
    subscribeToSaveResponse(result: Observable<TypeStatutEtablissement>) {
      result.subscribe((res: TypeStatutEtablissement) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeStatutEtablissementsListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeStatutEtablissement(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
      
    }
    
    load(id) {
        this.typeStatutEtablissementService.find(id).subscribe( (typeStatutEtablissement) => {
            this.typeStatutEtablissement = typeStatutEtablissement;
        });
    }
    
    edit() {
      /*this.typeStatutEtablissementService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeStatutEtablissementsListModification'});
      });
      this.typeStatutEtablissement.codeTypeStatutEtablissement = this.id;*/
      this.subscribeToSaveResponse(this.typeStatutEtablissementService.update(this.typeStatutEtablissement));
    }
    
  /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeStatutEtablissementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeStatutEtablissementsListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
