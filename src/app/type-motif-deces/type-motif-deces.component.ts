import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMotifDeces } from '../type-motif-deces/type-motif-deces.model';
import { TypeMotifDecesService } from '../type-motif-deces/type-motif-deces.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-motif-deces',
  templateUrl: './type-motif-deces.component.html',
  styleUrls: ['./type-motif-deces.component.css']
})
export class TypeMotifDecesComponent implements OnInit {

    typeMotifDeces: TypeMotifDeces = new TypeMotifDeces();
    typeMotifDecess: TypeMotifDeces[] = new Array();
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
          private typeMotifDecesService: TypeMotifDecesService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeMotifDeces";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeMotifDecess();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Type de décès';
        this.typeMotifDecesService.getAll().subscribe(data => { 
          this.typeMotifDecess = Array(data); 
          });
        
    }
    
    registerChangeInTypeMotifDecess() {
      this.eventManager.subscribe( 'typeMotifDecessListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    /************************************* Détails et suppression  ***********************************/
    detailsTypeMotifDeces() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeMotifDecesService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeMotifDecessListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeMotifDeces() {
      this.mode = 2;
      this.header = "Création";
      this.typeMotifDeces = new TypeMotifDeces;
    }
    
    save() {
      // this.typeMotifDeces.codeTypeMotifDeces = this.id;
      this.subscribeToSaveResponse(this.typeMotifDecesService.create(this.typeMotifDeces));
    }
    
    subscribeToSaveResponse(result: Observable<TypeMotifDeces>) {
      result.subscribe((res: TypeMotifDeces) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeMotifDecessListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeMotifDeces(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeMotifDecesService.find(id).subscribe( (typeMotifDeces) => {
            this.typeMotifDeces = typeMotifDeces;
        });
    }
    
    edit() {
      /*this.typeMotifDecesService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeMotifDecessListModification'});
      });
      this.typeMotifDeces.codeTypeMotifDeces = this.id;*/
      this.subscribeToSaveResponse(this.typeMotifDecesService.update(this.typeMotifDeces));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeMotifDecesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeMotifDecessListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
