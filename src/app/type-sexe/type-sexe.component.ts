import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { TypeSexeService, ResponseWrapper } from './type-sexe.service';
import { TypeSexe } from './type-sexe.model';
import { Subscription, Observable } from 'rxjs';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-sexe',
  templateUrl: './type-sexe.component.html',
  styleUrls: ['./type-sexe.component.css']
})
export class TypeSexeComponent implements OnInit, OnDestroy {

    pageTypeSexes: any;
    motCle: any;
    currentPage = 0;
    size = 5;
    pages: Array<number>;
    typeSexes: TypeSexe[] = new Array();
    typeSexe: TypeSexe = new TypeSexe();
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
          private typeSexeService: TypeSexeService,
          private eventManager: EventManagerService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) {
      this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
  }

  ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeSexe";
      this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeSexes();
    }
  
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de sexe';
      this.typeSexeService.getAll().subscribe(data => { 
        this.typeSexes = Array(data); 
        });
  }

  registerChangeInTypeSexes() {
        /* this.eventSubscriber =  */
        this.eventManager.subscribe( 'typeSexeListModification', ( response ) => this.loadAll() );
    }
  
  selectType() {  
      this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }

  private onSuccess( data, headers ) {
        this.typeSexes = data;
    }

  onError(error) {
        error(error.message, null, null);
    }

  ngOnDestroy() {
        this.routeData.unsubscribe();
    }


  /*onSearch() {
   // console.log(dataS);
   if (this.motCle) {
     this.typeSexeService.search(this.motCle, this.currentPage, this.size)
      .subscribe(data => {
        console.log(data);
        this.typeSexes = data;
        this.pages = new Array(data.totalPages); }, err => {
          console.log(JSON.parse(err._body).message); // pour vérifier les détails de l'erreur
        });
      }
  }*/

  trackId(index: number, item: TypeSexe) {
        return item.codeTypeSexe;
    }

  goToPage(i: number) {
    this.currentPage = i;
    // this.onSearch();
  }

   clear() {
        this.activeModal.dismiss('cancel');
    }
   
   /************************************* Détais et suppression  ***********************************/
   detailsTypeSexe() {
     this.mode = 4;   
   }
   
   
   // Fonction permettant de supprimer la ligne cochée
   deleteCheck(id: number, event: any) {
         this.typeSexeService.delete(id).subscribe((response) => {
             this.eventManager.broadcast({name: 'typeSexesListModification'});
             this.mode = 1;
             this.loadType();
         });
   }
   
   /****************************** Création *************************************/
   createTypeSexe() {
     this.mode = 2;
     this.header = "Création";
     this.typeSexe = new TypeSexe;
   }
   
   save() {
     // this.typeSexe.codeTypeSexe = this.id;
     this.subscribeToSaveResponse(this.typeSexeService.create(this.typeSexe));
   }
   
   subscribeToSaveResponse(result: Observable<TypeSexe>) {
     result.subscribe((res: TypeSexe) => {
         // console.log(res);
         this.onSaveSuccess(res);
         }); 
   }
   
   close() {
     this.mode = 1;
   }
   
   private onSaveSuccess( result ) {
     this.eventManager.broadcast( { name: 'typeSexesListModification'} );
     this.ngOnInit();
   }
   
   /****************************** Edition *************************************/
   editTypeSexe(id:number) {
     this.mode = 3;
     this.header = "Edition";
     this.load(id);;
   }
   
   load(id) {
       this.typeSexeService.find(id).subscribe( (typeSexe) => {
           this.typeSexe = typeSexe;
       });
   }
   
   edit() {
     /*this.typeSexeService.delete(this.id).subscribe( (response) => {
         this.eventManager.broadcast({name: 'typeSexesListModification'});
     });
     this.typeSexe.codeTypeSexe = this.id;*/
     this.subscribeToSaveResponse(this.typeSexeService.update(this.typeSexe));
   }
   
  /************************************ Delete **********************************/

   deleteType(id: number) {
       this.typeSexeService.delete(id).subscribe((response) => {
           this.eventManager.broadcast({name: 'typeSexesListModification'});
           this.mode = 1;
           this.loadType();
       });
   }
  
}
