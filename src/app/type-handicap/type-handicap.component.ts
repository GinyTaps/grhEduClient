import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeHandicap } from './type-handicap.model';
import { TypeHandicapService } from './type-handicap.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-handicap',
  templateUrl: './type-handicap.component.html',
  styleUrls: ['./type-handicap.component.css']
})
export class TypeHandicapComponent implements OnInit {

    typeHandicap: TypeHandicap = new TypeHandicap();
    typeHandicaps: TypeHandicap[] = new Array();
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
          private typeHandicapService: TypeHandicapService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeHandicap";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeHandicaps();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types dHandicap';
        this.typeHandicapService.getAll().subscribe(data => { 
          this.typeHandicaps = Array(data); 
          });
        
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    registerChangeInTypeHandicaps() {
      this.eventManager.subscribe( 'typeHandicapsListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeHandicap() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeHandicapService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeHandicapsListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeHandicap() {
      this.mode = 2;   
      this.header = "Création";
      this.typeHandicap = new TypeHandicap;
    }
    
    save() {
      // this.typeHandicap.codeTypeHandicap = this.id;
      this.subscribeToSaveResponse(this.typeHandicapService.create(this.typeHandicap));
    }
    
    subscribeToSaveResponse(result: Observable<TypeHandicap>) {
      result.subscribe((res: TypeHandicap) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeHandicapsListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeHandicap(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeHandicapService.find(id).subscribe( (typeHandicap) => {
            this.typeHandicap = typeHandicap;
        });
    }
    
    edit() {
      /*this.typeHandicapService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeHandicapsListModification'});
      });
      this.typeHandicap.codeTypeHandicap = this.id;*/
      this.subscribeToSaveResponse(this.typeHandicapService.update(this.typeHandicap));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeHandicapService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeHandicapsListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
