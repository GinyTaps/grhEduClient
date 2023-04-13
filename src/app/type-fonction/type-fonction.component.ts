import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeFonction } from './type-fonction.model';
import { TypeFonctionService } from './type-fonction.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-fonction',
  templateUrl: './type-fonction.component.html',
  styleUrls: ['./type-fonction.component.css']
})
export class TypeFonctionComponent implements OnInit {

    typeFonction: TypeFonction = new TypeFonction();
    typeFonctions: TypeFonction[] = new Array();
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
          private typeFonctionService: TypeFonctionService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeFonction";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeFonctions();
  }
  
  loadAll() {
      this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de fonction';
      this.typeFonctionService.getAll().subscribe(data => { 
        this.typeFonctions = Array(data); 
        }, err => { 
            console.log(err); 
            });
      
  }
  
  selectType() {
      this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
}
    
    registerChangeInTypeFonctions() {
      this.eventManager.subscribe( 'typeFonctionsListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeFonction() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeFonctionService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeFonctionsListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeFonction() {
      this.mode = 2;   
      this.header = "Création";
      this.typeFonction = new TypeFonction;
    }
    
    save() {
      // this.typeFonction.codeTypeFonction = this.id;
      this.subscribeToSaveResponse(this.typeFonctionService.create(this.typeFonction));
    }
    
    subscribeToSaveResponse(result: Observable<TypeFonction>) {
      result.subscribe((res: TypeFonction) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeFonctionsListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeFonction(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeFonctionService.find(id).subscribe( (typeFonction) => {
            this.typeFonction = typeFonction;
        });
    }
    
    edit() {
      /*this.typeFonctionService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeFonctionsListModification'});
      });
      this.typeFonction.codeTypeFonction = this.id;*/
      this.subscribeToSaveResponse(this.typeFonctionService.update(this.typeFonction));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeFonctionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeFonctionsListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
