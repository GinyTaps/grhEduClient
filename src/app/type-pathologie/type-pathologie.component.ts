import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypePathologie } from './type-pathologie.model';
import { TypePathologieService } from './type-pathologie.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-pathologie',
  templateUrl: './type-pathologie.component.html',
  styleUrls: ['./type-pathologie.component.css']
})
export class TypePathologieComponent implements OnInit {

    typePathologie: TypePathologie = new TypePathologie();
    typePathologies: TypePathologie[] = new Array();
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
          private typePathologieService: TypePathologieService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypePathologie";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypePathologies();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types de pathologie';
        this.typePathologieService.getAll().subscribe(data => { 
          this.typePathologies = Array(data); 
          });
      /*if (! this.motCle) {
          this.typePathologieService.getAll()
          .subscribe(data => { this.pageTypePathologies = data; }, err => { console.log(err); });
        } else {
          this.typePathologieService.getAll()
          .subscribe(data => { this.pageTypePathologies = data; }, err => { console.log(err); });
        }*/
    }
    
    registerChangeInTypePathologies() {
      this.eventManager.subscribe( 'typePathologiesListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypePathologie() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typePathologieService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typePathologiesListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypePathologie() {
      this.mode = 2;
      this.header = "Création";
      this.typePathologie = new TypePathologie;
    }
    
    save() {
      // this.typePathologie.codeTypePathologie = this.id;
      this.subscribeToSaveResponse(this.typePathologieService.create(this.typePathologie));
    }
    
    subscribeToSaveResponse(result: Observable<TypePathologie>) {
      result.subscribe((res: TypePathologie) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typePathologiesListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypePathologie(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typePathologieService.find(id).subscribe( (typePathologie) => {
            this.typePathologie = typePathologie;
        });
    }
    
    edit() {
      /*this.typePathologieService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typePathologiesListModification'});
      });
      this.typePathologie.codeTypePathologie = this.id;*/
      this.subscribeToSaveResponse(this.typePathologieService.update(this.typePathologie));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typePathologieService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typePathologiesListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
