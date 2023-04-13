import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMotifSuspension } from '../type-motif-suspension/type-motif-suspension.model';
import { TypeMotifSuspensionService } from '../type-motif-suspension/type-motif-suspension.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-motif-suspension',
  templateUrl: './type-motif-suspension.component.html',
  styleUrls: ['./type-motif-suspension.component.css']
})
export class TypeMotifSuspensionComponent implements OnInit {

    typeMotifSuspension: TypeMotifSuspension = new TypeMotifSuspension();
    typeMotifSuspensions: TypeMotifSuspension[] = new Array();
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
          private typeMotifSuspensionService: TypeMotifSuspensionService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeMotifSuspension";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeMotifSuspensions();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types de motif de suspension';
      this.typeMotifSuspensionService.getAll().subscribe(data => { 
          this.typeMotifSuspensions = Array(data); 
          }, err => { 
              console.log(err); 
              });
    }
    
    registerChangeInTypeMotifSuspensions() {
      this.eventManager.subscribe( 'typeMotifSuspensionsListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeMotifSuspension() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeMotifSuspensionService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeMotifSuspensionsListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeMotifSuspension() {
      this.mode = 2;  
      this.header = "Création";
      this.typeMotifSuspension = new TypeMotifSuspension;
    }
    
    save() {
      // this.typeMotifSuspension.codeTypeMotifSuspension = this.id;
      this.subscribeToSaveResponse(this.typeMotifSuspensionService.create(this.typeMotifSuspension));
    }
    
    subscribeToSaveResponse(result: Observable<TypeMotifSuspension>) {
      result.subscribe((res: TypeMotifSuspension) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeMotifSuspensionsListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeMotifSuspension(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeMotifSuspensionService.find(id).subscribe( (typeMotifSuspension) => {
            this.typeMotifSuspension = typeMotifSuspension;
        });
    }
    
    edit() {
      /*this.typeMotifSuspensionService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeMotifSuspensionsListModification'});
      });
      this.typeMotifSuspension.codeTypeMotifSuspension = this.id;*/
      this.subscribeToSaveResponse(this.typeMotifSuspensionService.update(this.typeMotifSuspension));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeMotifSuspensionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeMotifSuspensionsListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
