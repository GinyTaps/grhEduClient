import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEtatCivilService } from './type-etat-civil.service';
import { TypeEtatCivil } from './type-etat-civil.model';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-etat-civil',
  templateUrl: './type-etat-civil.component.html',
  styleUrls: ['./type-etat-civil.component.css']
})
export class TypeEtatCivilComponent implements OnInit,  OnDestroy {

    pageTypeEtatCivils: any;
    motCle: any;
    currentPage = 0;
    size = 5;
    pages: Array<number>;
    typeEtatCivils: TypeEtatCivil[] = new Array();
    typeEtatCivil: TypeEtatCivil = new TypeEtatCivil();
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
      private typeEtatCivilService: TypeEtatCivilService,
      private eventManager: EventManagerService,
      private authService: AuthService,
      private activatedRoute: ActivatedRoute,
      private router: Router
      ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
    }
    
    ngOnInit() {
        this.mode = 1;
        this.typeSelected = "TypeEtatCivil";
        this.loadAll();
        this.loadType();
        this.motCle = '';
        this.registerChangeInTypeEtatCivils();
    
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    loadType() {
        this.title = 'Liste des types dEtat-civil';
        this.typeEtatCivilService.getAll().subscribe(data => { 
            this.typeEtatCivils = Array(data); 
            });
      }
      
      selectType() {
          this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
    }
    
    isAuthenticated() {
              return this.authService.isAuthenticated();
    }
    
    registerChangeInTypeEtatCivils() {
          this.eventManager.subscribe( 'typeEtatCivilListModification', ( response ) => this.loadAll() );
      }
    
    private onSuccess( data, headers ) {
          this.typeEtatCivils = data;
      }
    
    onError(error) {
          error(error.message, null, null);
      }
    
    ngOnDestroy() {
          this.routeData.unsubscribe();
      }
    
    
    /*onSearch() {
     if (this.motCle) {
        this.typeEtatCivilService.search(this.motCle, this.currentPage, this.size)
        .subscribe(data => {
          console.log(data);
          this.typeEtatCivils = data;
          this.pages = new Array(data.totalPages); }, err => {
            console.log(JSON.parse(err._body).message); // pour vérifier les détails de l'erreur
          });
        }
    }*/
    
      trackId( index: number, item: TypeEtatCivil ) {
          return item.codeTypeEtatCivil;
      }
    
    goToPage(i: number) {
      this.currentPage = i;
      // this.onSearch();
    }
    
     clear() {
          this.activeModal.dismiss('cancel');
      }
     
     /************************************* Détais et suppression  ***********************************/
     detailsTypeEtatCivil() {
       this.mode = 4;   
     }
     
     
     // Fonction permettant de supprimer la ligne cochée
     deleteCheck(id: number, event: any) {
           this.typeEtatCivilService.delete(id).subscribe((response) => {
               this.eventManager.broadcast({name: 'typeEtatCivilsListModification'});
               this.mode = 1;
               this.loadType();
           });
     }
     
     /****************************** Création *************************************/
     createTypeEtatCivil() {
       this.mode = 2;   
       this.header = "Création";
       this.typeEtatCivil = new TypeEtatCivil;
     }
     
     save() {
       // this.typeEtatCivil.codeTypeEtatCivil = this.id;
       this.subscribeToSaveResponse(this.typeEtatCivilService.create(this.typeEtatCivil));
     }
     
     subscribeToSaveResponse(result: Observable<TypeEtatCivil>) {
       result.subscribe((res: TypeEtatCivil) => {
           // console.log(res);
           this.onSaveSuccess(res);
           }); 
     }
     
     close() {
       this.mode = 1;
     }
     
     private onSaveSuccess( result ) {
       this.eventManager.broadcast( { name: 'typeEtatCivilsListModification'} );
       this.ngOnInit();
     }
     
     /****************************** Edition *************************************/
     editTypeEtatCivil(id:number) {
       this.mode = 3;
       this.header = "Edition";
       this.load(id); 
     }
     
     load(id) {
         this.typeEtatCivilService.find(id).subscribe( (typeEtatCivil) => {
         this.typeEtatCivil = typeEtatCivil;
         });
     }
     
     edit() {
       /*this.typeEtatCivilService.delete(this.id).subscribe( (response) => {
           this.eventManager.broadcast({name: 'typeEtatCivilsListModification'});
       });
       this.typeEtatCivil.codeTypeEtatCivil = this.id;*/
       this.subscribeToSaveResponse(this.typeEtatCivilService.update(this.typeEtatCivil));
     }
     
     /************************************ Delete **********************************/

     deleteType(id: number) {
         this.typeEtatCivilService.delete(id).subscribe((response) => {
             this.eventManager.broadcast({name: 'typeEtatCivilsListModification'});
             this.mode = 1;
             this.loadType();
         });
     }

}
