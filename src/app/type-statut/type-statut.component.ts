import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeStatut } from '../type-statut/type-statut.model';
import { TypeStatutService } from '../type-statut/type-statut.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-statut',
  templateUrl: './type-statut.component.html',
  styleUrls: ['./type-statut.component.css']
})
export class TypeStatutComponent implements OnInit {

    typeStatut: TypeStatut = new TypeStatut();
    typeStatuts: TypeStatut[] = new Array();
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
          private typeStatutService: TypeStatutService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeStatut";
      this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeStatuts();
    }
  
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de statut';
      this.typeStatutService.getAll().subscribe(data => { 
        this.typeStatuts = Array(data); 
        });
  }
    
    registerChangeInTypeStatuts() {
      this.eventManager.subscribe( 'typeStatutsListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {  
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeStatut() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeStatutService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeStatutsListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeStatut() {
      this.mode = 2;
      this.header = "Création";
      this.typeStatut = new TypeStatut;
    }
    
    save() {
      // this.typeStatut.codeTypeStatut = this.id;
      this.subscribeToSaveResponse(this.typeStatutService.create(this.typeStatut));
    }
    
    subscribeToSaveResponse(result: Observable<TypeStatut>) {
      result.subscribe((res: TypeStatut) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeStatutsListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeStatut(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeStatutService.find(id).subscribe( (typeStatut) => {
            this.typeStatut = typeStatut;
        });
    }
    
    edit() {
      /*this.typeStatutService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeStatutsListModification'});
      });
      this.typeStatut.codeTypeStatut = this.id;*/
      this.subscribeToSaveResponse(this.typeStatutService.update(this.typeStatut));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeStatutService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeStatutsListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
