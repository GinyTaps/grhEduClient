import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMotifCongeService } from './type-motif-conge.service';
import { TypeMotifConge } from './type-motif-conge.model';
import { Subscription, Observable } from 'rxjs';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-motif-conge',
  templateUrl: './type-motif-conge.component.html',
  styleUrls: ['./type-motif-conge.component.css']
})
export class TypeMotifCongeComponent implements OnInit, OnDestroy {

    pageTypeMotifConges: any;
    motCle: any;
    currentPage = 0;
    size = 5;
    pages: Array<number>;
    typeMotifConges: TypeMotifConge[] = new Array();
    typeMotifConge: TypeMotifConge = new TypeMotifConge();
    subscription: Subscription;
    empSelected: number;
    routeData: any;
    id: number;
    mode: number;
    title: string;
    typesTable: string[];
    typeSelected: string;
    header: string;
    p: number = 1; //pour la pagination
    
    constructor(
            private typeCategorieService: TypeCategorieService,
      public activeModal: NgbActiveModal,
      private typeMotifCongeService: TypeMotifCongeService,
      private eventManager: EventManagerService,
      private activatedRoute: ActivatedRoute,
      private router: Router
      ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
    }
    
    ngOnInit() {
        this.mode = 1;
        this.typeSelected = "TypeMotifConge";
        this.loadAll();
        this.loadType();
        this.registerChangeInTypeMotifConges();
  }
  
  loadAll() {
      this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de motif de conge';
      this.typeMotifCongeService.getAll().subscribe(data => { 
        this.typeMotifConges = Array(data); 
        });
      
  }
    registerChangeInTypeMotifConges() {
          this.eventManager.subscribe( 'typeMotifCongeListModification', ( response ) => this.loadAll() );
      }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    private onSuccess( data, headers ) {
          this.typeMotifConges = data;
      }
    
    onError(error) {
          error(error.message, null, null);
      }
    
    ngOnDestroy() {
          this.routeData.unsubscribe();
      }
    
    
    /*onSearch() {
     if (this.motCle) {
        this.typeMotifCongeService.search(this.motCle, this.currentPage, this.size)
        .subscribe(data => {
          console.log(data);
          this.typeMotifConges = data;
          this.pages = new Array(data.totalPages); }, err => {
            console.log(JSON.parse(err._body).message); // pour vérifier les détails de l'erreur
          });
        }
    }*/
    
      trackId( index: number, item: TypeMotifConge ) {
          return item.codeTypeMotifConge;
      }
    
    goToPage(i: number) {
      this.currentPage = i;
      // this.onSearch();
    }
    
     clear() {
          this.activeModal.dismiss('cancel');
      }
     
     /************************************* Détais et suppression  ***********************************/
     detailsTypeMotifConge() {
       this.mode = 4;   
     }
     
     
     // Fonction permettant de supprimer la ligne cochée
     deleteCheck(id: number, event: any) {
           this.typeMotifCongeService.delete(id).subscribe((response) => {
               this.eventManager.broadcast({name: 'typeMotifCongesListModification'});
               this.mode = 1;
               this.loadType();
           });
     }
     
     /****************************** Création *************************************/
     createTypeMotifConge() {
       this.mode = 2;
       this.header = "Création";
       this.typeMotifConge = new TypeMotifConge;
     }
     
     save() {
       // this.typeMotifConge.codeTypeMotifConge = this.id;
       this.subscribeToSaveResponse(this.typeMotifCongeService.create(this.typeMotifConge));
     }
     
     subscribeToSaveResponse(result: Observable<TypeMotifConge>) {
       result.subscribe((res: TypeMotifConge) => {
           // console.log(res);
           this.onSaveSuccess(res);
           }); 
     }
     
     close() {
       this.mode = 1;
     }
     
     private onSaveSuccess( result ) {
       this.eventManager.broadcast( { name: 'typeMotifCongesListModification'} );
       this.ngOnInit();
     }
     
     /****************************** Edition *************************************/
     editTypeMotifConge(id:number) {
       this.mode = 3;
       this.header = "Edition";
       this.load(id);
     }
     
     load(id) {
         this.typeMotifCongeService.find(id).subscribe( (typeMotifConge) => {
             this.typeMotifConge = typeMotifConge;
         });
     }
     
     edit() {
       /*this.typeMotifCongeService.delete(this.id).subscribe( (response) => {
           this.eventManager.broadcast({name: 'typeMotifCongesListModification'});
       });
       this.typeMotifConge.codeTypeMotifConge = this.id;*/
       this.subscribeToSaveResponse(this.typeMotifCongeService.update(this.typeMotifConge));
     }
     
     /************************************ Delete **********************************/

     deleteType(id: number) {
         this.typeMotifCongeService.delete(id).subscribe((response) => {
             this.eventManager.broadcast({name: 'typeMotifCongesListModification'});
             this.mode = 1;
             this.loadType();
         });
     }

}
