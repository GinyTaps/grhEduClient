import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeStructureEdu } from '../type-structure-edu/type-structure-edu.model';
import { TypeStructureEduService } from '../type-structure-edu/type-structure-edu.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';

@Component({
  selector: 'app-type-structure-edu',
  templateUrl: './type-structure-edu.component.html',
  styleUrls: ['./type-structure-edu.component.css']
})
export class TypeStructureEduComponent implements OnInit {

    typeStructureEdu: TypeStructureEdu = new TypeStructureEdu();
    typeStructureEdus: TypeStructureEdu[] = new Array();
    typeStatutEntite: TypeStatutEntite;
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
          private typeStructureEduService: TypeStructureEduService,
          private typeStatutEntiteService: TypeStatutEntiteService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private http: HttpClient,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeStructureEdus();
    }
  
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
      this.loadTypeStatutentite();
  }
    
    loadTypeStatutentite() {
        this.typeStatutEntiteService.getAll().subscribe((data) => {
            this.typeStatutEntite = data;
        })
    }
  
  loadType() {
      this.title = 'Liste des types de structure éducation';
      this.typeStructureEduService.getAll().subscribe(data => { 
        this.typeStructureEdus = Array(data); 
        });
  }
  

    registerChangeInTypeStructureEdus() {
      this.eventManager.subscribe( 'typeStructureEdusListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeStructureEdu() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeStructureEduService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeStructureEdusListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeStructureEdu() {
      this.mode = 2; 
      this.header = 'Création';
      this.typeStructureEdu = new TypeStructureEdu;
    }
    
    save() {
      // this.typeStructureEdu.codeTypeStructureEdu = this.id;
      this.subscribeToSaveResponse(this.typeStructureEduService.create(this.typeStructureEdu));
    }
    
    subscribeToSaveResponse(result: Observable<TypeStructureEdu>) {
      result.subscribe((res: TypeStructureEdu) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeStructureEdusListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeStructureEdu(id:number) {
      this.mode = 3;
      this.header = 'Edition';
      this.load(id);
    }
    
    load(id) {
        this.typeStructureEduService.find(id).subscribe( (typeStructureEdu) => {
            this.typeStructureEdu = typeStructureEdu;
        });
    }
    
    edit() {
      /*this.typeStructureEduService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeStructureEdusListModification'});
      });
      this.typeStructureEdu.codeTypeStructureEdu = this.id;*/
      this.subscribeToSaveResponse(this.typeStructureEduService.update(this.typeStructureEdu));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeStructureEduService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeStructureEdusListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
