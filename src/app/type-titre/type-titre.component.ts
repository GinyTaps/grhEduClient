import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeTitre } from '../type-titre/type-titre.model';
import { TypeTitreService } from '../type-titre/type-titre.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-titre',
  templateUrl: './type-titre.component.html',
  styleUrls: ['./type-titre.component.css']
})
export class TypeTitreComponent implements OnInit {

    typeTitre: TypeTitre = new TypeTitre();
    typeTitres: TypeTitre[] = new Array();
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
          private typeTitreService: TypeTitreService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeTitre";
      this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeTitres();
    }
  
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
  }
  
  loadType() {
      this.title = 'Liste des types de titre';
      this.typeTitreService.getAll().subscribe(data => { 
        this.typeTitres = Array(data); 
        });
  }
  
  selectType() {  
      this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    registerChangeInTypeTitres() {
      this.eventManager.subscribe( 'typeTitresListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeTitre() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeTitreService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeTitresListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeTitre() {
      this.mode = 2; 
      this.header = "Création";
      this.typeTitre = new TypeTitre;
    }
    
    save() {
      // this.typeTitre.codeTypeTitre = this.id;
      this.subscribeToSaveResponse(this.typeTitreService.create(this.typeTitre));
    }
    
    subscribeToSaveResponse(result: Observable<TypeTitre>) {
      result.subscribe((res: TypeTitre) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeTitresListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeTitre(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeTitreService.find(id).subscribe( (typeTitre) => {
            this.typeTitre = typeTitre;
        });
    }
    
    edit() {
      /*this.typeTitreService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeTitresListModification'});
      });
      this.typeTitre.codeTypeTitre = this.id;*/
      this.subscribeToSaveResponse(this.typeTitreService.update(this.typeTitre));
    }
    
 /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeTitreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeTitresListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
