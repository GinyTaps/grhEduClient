import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-statut-entite',
  templateUrl: './type-statut-entite.component.html',
  styleUrls: ['./type-statut-entite.component.css']
})
export class TypeStatutEntiteComponent implements OnInit {

    typeStatutEntite: TypeStatutEntite = new TypeStatutEntite();
    typeStatutEntites: TypeStatutEntite[] = new Array();
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
          private typeStatutEntiteService: TypeStatutEntiteService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeStatutEntite";
      this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeStatutEntites();
    }
  
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de statut de lEntité';
      this.typeStatutEntiteService.getAll().subscribe(data => { 
        this.typeStatutEntites = Array(data); 
        });
  }
    
    registerChangeInTypeStatutEntites() {
      this.eventManager.subscribe( 'typeStatutEntiteEntitesListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {  
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeStatutEntite() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeStatutEntiteService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeStatutEntitesListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeStatutEntite() {
      this.mode = 2; 
      this.header = "Création";
      this.typeStatutEntite = new TypeStatutEntite;
    }
    
    save() {
      // this.typeStatutEntite.codeTypeStatutEntite = this.id;
      this.subscribeToSaveResponse(this.typeStatutEntiteService.create(this.typeStatutEntite));
    }
    
    subscribeToSaveResponse(result: Observable<TypeStatutEntite>) {
      result.subscribe((res: TypeStatutEntite) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeStatutEntitesListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeStatutEntite(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
      
    }
    
    load(id) {
        this.typeStatutEntiteService.find(id).subscribe( (typeStatutEntite) => {
            this.typeStatutEntite = typeStatutEntite;
        });
    }
    
    edit() {
      /*this.typeStatutEntiteEntiteService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeStatutEntiteEntitesListModification'});
      });
      this.typeStatutEntiteEntite.codeTypeStatutEntiteEntite = this.id;*/
      this.subscribeToSaveResponse(this.typeStatutEntiteService.update(this.typeStatutEntite));
    }
    
  /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeStatutEntiteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeStatutEntitesListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
