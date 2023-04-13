import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeRegroupementService } from './type-regroupement.service';
import { TypeRegroupement } from './type-regroupement.model';
import { Subscription, Observable } from 'rxjs';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-regroupement',
  templateUrl: './type-regroupement.component.html',
  styleUrls: ['./type-regroupement.component.css']
})
export class TypeRegroupementComponent implements OnInit, OnDestroy {

    pageTypeRegroupements: any;
    motCle: any;
    currentPage = 0;
    size = 5;
    pages: Array<number>;
    typeRegroupements: TypeRegroupement[] = new Array();
    typeRegroupement: TypeRegroupement = new TypeRegroupement();
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
      public activeModal: NgbActiveModal,
      private typeRegroupementService: TypeRegroupementService,
      private eventManager: EventManagerService,
      private activatedRoute: ActivatedRoute,
      private router: Router
      ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
    }
    
    ngOnInit() {
        this.mode = 1;
        this.typeSelected = "TypeRegroupement";
        this.loadAll();
        this.loadType();
        this.registerChangeInTypeRegroupements();
  }
  
  loadAll() {
      this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de regroupement';
      this.typeRegroupementService.getAll().subscribe(data => { 
        this.typeRegroupements = Array(data); 
        });
  }
     
    registerChangeInTypeRegroupements() {
          this.eventManager.subscribe( 'typeRegroupementListModification', ( response ) => this.loadAll() );
      }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    private onSuccess( data, headers ) {
          this.typeRegroupements = data;
      }
    
    onError(error) {
          error(error.message, null, null);
      }
    
    ngOnDestroy() {
          this.routeData.unsubscribe();
      }
    
    
    onSearch() {
     if (this.motCle) {
        this.typeRegroupementService.search(this.motCle, this.currentPage, this.size)
        .subscribe(data => {
          console.log(data);
          // this.typeRegroupements = data;
          // this.pages = new Array(data.totalPages); 
          }, err => {
            console.log(JSON.parse(err._body).message); // pour vérifier les détails de l'erreur
          });
        }
    }
    
      trackId( index: number, item: TypeRegroupement ) {
          return item.codeTypeRegroupement;
      }
    
    goToPage(i: number) {
      this.currentPage = i;
      this.onSearch();
    }
    
     clear() {
          this.activeModal.dismiss('cancel');
      }
     /************************************* Détais et suppression  ***********************************/
     detailsTypeRegroupement() {
       this.mode = 4;   
     }
     
     
     // Fonction permettant de supprimer la ligne cochée
     deleteCheck(id: number, event: any) {
           this.typeRegroupementService.delete(id).subscribe((response) => {
               this.eventManager.broadcast({name: 'typeRegroupementsListModification'});
               this.mode = 1;
               this.loadType();
           });
     }
     
     /****************************** Création *************************************/
     createTypeRegroupement() {
       this.mode = 2; 
       this.header = "Création";
       this.typeRegroupement = new TypeRegroupement;
     }
     
     save() {
       // this.typeRegroupement.codeTypeRegroupement = this.id;
       this.subscribeToSaveResponse(this.typeRegroupementService.create(this.typeRegroupement));
     }
     
     subscribeToSaveResponse(result: Observable<TypeRegroupement>) {
       result.subscribe((res: TypeRegroupement) => {
           // console.log(res);
           this.onSaveSuccess(res);
           }); 
     }
     
     close() {
       this.mode = 1;
     }
     
     private onSaveSuccess( result ) {
       this.eventManager.broadcast( { name: 'typeRegroupementsListModification'} );
       this.ngOnInit();
     }
     
     /****************************** Edition *************************************/
     editTypeRegroupement(id:number) {
       this.mode = 3;
       this.header = "Edition";
       this.load(id);
     }
     
     load(id) {
         this.typeRegroupementService.find(id).subscribe( (typeRegroupement) => {
             this.typeRegroupement = typeRegroupement;
         });
     }
     
     edit() {
       /*this.typeRegroupementService.delete(this.id).subscribe( (response) => {
           this.eventManager.broadcast({name: 'typeRegroupementsListModification'});
       });
       this.typeRegroupement.codeTypeRegroupement = this.id;*/
       this.subscribeToSaveResponse(this.typeRegroupementService.update(this.typeRegroupement));
     }
     
   /************************************ Delete **********************************/

     deleteType(id: number) {
         this.typeRegroupementService.delete(id).subscribe((response) => {
             this.eventManager.broadcast({name: 'typeRegroupementsListModification'});
             this.mode = 1;
             this.loadType();
         });
     }

}
