import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeSituationService } from '../type-situation/type-situation.service';
import { TypeSituation } from '../type-situation/type-situation.model';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-situation',
  templateUrl: './type-situation.component.html',
  styleUrls: ['./type-situation.component.css']
})
export class TypeSituationComponent implements OnInit {

    typeSituation: TypeSituation = new TypeSituation();
    typeSituations: TypeSituation[] = new Array();
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
          private typeSituationService: TypeSituationService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
        this.mode = 1;
        this.typeSelected = "TypeSituation";
        this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
        this.loadAll();
        this.loadType();
        this.registerChangeInTypeSituations();
      }
    
      loadAll() {
          this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types de situation';
        this.typeSituationService.getAll().subscribe(data => { 
          this.typeSituations = Array(data); 
          });
    }
    
    registerChangeInTypeSituations() {
      this.eventManager.subscribe( 'typeSituationsListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {  
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeSituation() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeSituationService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeSituationsListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeSituation() {
      this.mode = 2;
      this.header = "Création";
      this.typeSituation = new TypeSituation;
    }
    
    save() {
      // this.typeSituation.codeTypeSituation = this.id;
      this.subscribeToSaveResponse(this.typeSituationService.create(this.typeSituation));
    }
    
    subscribeToSaveResponse(result: Observable<TypeSituation>) {
      result.subscribe((res: TypeSituation) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeSituationsListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeSituation(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeSituationService.find(id).subscribe( (typeSituation) => {
            this.typeSituation = typeSituation;
        });
    }
    
    edit() {
      /*this.typeSituationService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeSituationsListModification'});
      });
      this.typeSituation.codeTypeSituation = this.id;*/
      this.subscribeToSaveResponse(this.typeSituationService.update(this.typeSituation));
    }
    
  /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeSituationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeSituationsListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
