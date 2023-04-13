import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeNationalite } from "./type-nationalite.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { TypeNationaliteService } from "./type-nationalite.service";
import { EventManagerService } from "../event-manager.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, Observable } from 'rxjs';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-nationalite',
  templateUrl: './type-nationalite.component.html',
  styleUrls: ['./type-nationalite.component.css']
})
export class TypeNationaliteComponent implements OnInit, OnDestroy {

    pageTypeNationalites: any;
    motCle: any;
    currentPage = 0;
    size = 5;
    pages: Array<number>;
    typeNationalites: TypeNationalite[] = new Array();
    typeNationalite: TypeNationalite = new TypeNationalite();
    natSelected: number;
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
      private typeNationaliteService: TypeNationaliteService,
      private eventManager: EventManagerService,
      private activatedRoute: ActivatedRoute,
      private router: Router
      ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
    }
    
    ngOnInit() {
      this.natSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.mode = 1;
      this.typeSelected = "TypeNationalite";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeNationalites();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types de nationalité';
      this.typeNationaliteService.getAll().subscribe(data => { 
          this.typeNationalites = Array(data); 
          });
    }
    registerChangeInTypeNationalites() {
          this.eventManager.subscribe( 'typeNationaliteListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    private onSuccess( data, headers ) {
          this.typeNationalites = data;
      }
    
    onError(error) {
          error(error.message, null, null);
      }
    
    ngOnDestroy() {
          this.routeData.unsubscribe();
      }
    
    
    /*onSearch() {
     if (this.motCle) {
        this.typeNationaliteService.search(this.motCle, this.currentPage, this.size)
        .subscribe(data => {
          console.log(data);
          this.typeNationalites = data;
          this.pages = new Array(data.totalPages); }, err => {
            console.log(JSON.parse(err._body).message); // pour vérifier les détails de l'erreur
          });
        }
    }*/
    
      trackId( index: number, item: TypeNationalite ) {
          return item.codeTypeNationalite;
      }
    
    goToPage(i: number) {
      this.currentPage = i;
      // this.onSearch();
    }
    
     clear() {
          this.activeModal.dismiss('cancel');
      }
     /************************************* Détais et suppression  ***********************************/
     detailsTypeNationalite() {
       this.mode = 4;   
     }
     
     
     // Fonction permettant de supprimer la ligne cochée
     deleteCheck(id: number, event: any) {
           this.typeNationaliteService.delete(id).subscribe((response) => {
               this.eventManager.broadcast({name: 'typeNationalitesListModification'});
               this.mode = 1;
               this.loadType();
           });
     }
     
     /****************************** Création *************************************/
     createTypeNationalite() {
       this.mode = 2; 
       this.header = "Création";
       this.typeNationalite = new TypeNationalite;
     }
     
     save() {
       // this.typeNationalite.codeTypeNationalite = this.id;
       this.subscribeToSaveResponse(this.typeNationaliteService.create(this.typeNationalite));
     }
     
     subscribeToSaveResponse(result: Observable<TypeNationalite>) {
       result.subscribe((res: TypeNationalite) => {
           // console.log(res);
           this.onSaveSuccess(res);
           }); 
     }
     
     close() {
       this.mode = 1;
     }
     
     private onSaveSuccess( result ) {
       this.eventManager.broadcast( { name: 'typeNationalitesListModification'} );
       this.ngOnInit();
     }
     
     /****************************** Edition *************************************/
     editTypeNationalite(id:number) {
       this.mode = 3;
       this.header = "Edititon";
       this.load(id);
     }
     
     load(id) {
         this.typeNationaliteService.find(id).subscribe( (typeNationalite) => {
             this.typeNationalite = typeNationalite;
         });
     }
     
     edit() {
       /*this.typeNationaliteService.delete(this.id).subscribe( (response) => {
           this.eventManager.broadcast({name: 'typeNationalitesListModification'});
       });
       this.typeNationalite.codeTypeNationalite = this.id;*/
       this.subscribeToSaveResponse(this.typeNationaliteService.update(this.typeNationalite));
     }
     
   /************************************ Delete **********************************/

     deleteType(id: number) {
         this.typeNationaliteService.delete(id).subscribe((response) => {
             this.eventManager.broadcast({name: 'typeNationalitesListModification'});
             this.mode = 1;
             this.loadType();
         });
     }

}
