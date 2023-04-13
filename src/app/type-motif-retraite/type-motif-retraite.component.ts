import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMotifRetraite } from '../type-motif-retraite/type-motif-retraite.model';
import { TypeMotifRetraiteService } from '../type-motif-retraite/type-motif-retraite.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-motif-retraite',
  templateUrl: './type-motif-retraite.component.html',
  styleUrls: ['./type-motif-retraite.component.css']
})
export class TypeMotifRetraiteComponent implements OnInit {

    typeMotifRetraite: TypeMotifRetraite = new TypeMotifRetraite();
    typeMotifRetraites: TypeMotifRetraite[] = new Array();
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
          private typeMotifRetraiteService: TypeMotifRetraiteService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeMotifRetraite";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeMotifRetraites();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types de motif retraite';
      this.typeMotifRetraiteService.getAll().subscribe(data => { 
          this.typeMotifRetraites = Array(data); 
          }, err => { 
              console.log(err); 
              });
    }
    
    registerChangeInTypeMotifRetraites() {
      this.eventManager.subscribe( 'typeMotifRetraitesListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeMotifRetraite() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeMotifRetraiteService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeMotifRetraitesListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeMotifRetraite() {
      this.mode = 2;   
      this.header = "Création";
      this.typeMotifRetraite = new TypeMotifRetraite;
    }
    
    save() {
      // this.typeMotifRetraite.codeTypeMotifRetraite = this.id;
      this.subscribeToSaveResponse(this.typeMotifRetraiteService.create(this.typeMotifRetraite));
    }
    
    subscribeToSaveResponse(result: Observable<TypeMotifRetraite>) {
      result.subscribe((res: TypeMotifRetraite) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeMotifRetraitesListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeMotifRetraite(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeMotifRetraiteService.find(id).subscribe( (typeMotifRetraite) => {
            this.typeMotifRetraite = typeMotifRetraite;
        });
    }
    
    edit() {
      /*this.typeMotifRetraiteService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeMotifRetraitesListModification'});
      });
      this.typeMotifRetraite.codeTypeMotifRetraite = this.id;*/
      this.subscribeToSaveResponse(this.typeMotifRetraiteService.update(this.typeMotifRetraite));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeMotifRetraiteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeMotifRetraitesListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
