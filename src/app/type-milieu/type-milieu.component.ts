import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMilieu } from '../type-milieu/type-milieu.model';
import { TypeMilieuService } from '../type-milieu/type-milieu.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-milieu',
  templateUrl: './type-milieu.component.html',
  styleUrls: ['./type-milieu.component.css']
})
export class TypeMilieuComponent implements OnInit {

    typeMilieu: TypeMilieu = new TypeMilieu();
    typeMilieus: TypeMilieu[] = new Array();
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
          private typeMilieuService: TypeMilieuService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeMilieu";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeMilieus();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types de milieu';
        this.typeMilieuService.getAll().subscribe(data => { 
          this.typeMilieus = Array(data); 
          });
        
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    registerChangeInTypeMilieus() {
      this.eventManager.subscribe( 'typeMilieusListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeMilieu() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeMilieuService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeMilieusListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeMilieu() {
      this.mode = 2;
      this.header = "Création";
      this.typeMilieu = new TypeMilieu;
    }
    
    save() {
      // this.typeMilieu.codeTypeMilieu = this.id;
      this.subscribeToSaveResponse(this.typeMilieuService.create(this.typeMilieu));
    }
    
    subscribeToSaveResponse(result: Observable<TypeMilieu>) {
      result.subscribe((res: TypeMilieu) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeMilieusListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeMilieu(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeMilieuService.find(id).subscribe( (typeMilieu) => {
            this.typeMilieu = typeMilieu;
        });
    }
    
    edit() {
      /*this.typeMilieuService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeMilieusListModification'});
      });
      this.typeMilieu.codeTypeMilieu = this.id;*/
      this.subscribeToSaveResponse(this.typeMilieuService.update(this.typeMilieu));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeMilieuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeMilieusListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
