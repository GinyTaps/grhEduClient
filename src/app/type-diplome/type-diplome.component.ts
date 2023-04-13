import { Component, OnInit } from '@angular/core';
import { TypeDiplomeService } from './type-diplome.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { EventManagerService } from '../event-manager.service';
import { TypeDiplome } from '../type-diplome/type-diplome.model';
import { Observable, Subscription } from 'rxjs';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-type-diplome',
  templateUrl: './type-diplome.component.html',
  styleUrls: ['./type-diplome.component.css']
})
export class TypeDiplomeComponent implements OnInit {

    typeDiplome: TypeDiplome = new TypeDiplome();
    typeDiplomes: TypeDiplome; // [] = new Array();
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
    // hasAuthority: string;
    
  constructor(
          private login: LoginComponent,
          private typeCategorieService: TypeCategorieService,
          private typeDiplomeService: TypeDiplomeService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }

  ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeDiplome";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeDiplomes();
      // this.hasAuthority = this.hasAutho();
    }
  
  hasAuthority() {
      // return this.login.hasAuthority();
  }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {

        this.title = 'Liste des types de diplome';
      this.typeDiplomeService.getAll().subscribe(data => { 
          this.typeDiplomes = data; 
          });
        
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
  
  registerChangeInTypeDiplomes() {
      this.eventManager.subscribe( 'typeDiplomesListModification', ( response ) => this.loadAll() );
  }
  
  /******************************* Liste des diplomes ***********************************/
  detailsType() {
      this.mode = 4;   
  }
  
  
  // Fonction permettant de supprimer la ligne cochée
  deleteCheck(id: number, event: any) {
          this.typeDiplomeService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeDiplomesListModification'});
              this.mode = 1;
              this.loadType();
          });
  }
  
/****************************** Création d'un état civil *************************************/
  createTypeDiplome() {
      this.mode = 2; 
      this.header = "Création";
      this.typeDiplome = new TypeDiplome;
  }
  
  save() {
      // this.typeDiplome.codeTypeDiplome = this.id;
      this.subscribeToSaveResponse(this.typeDiplomeService.create(this.typeDiplome));
  }
  
  subscribeToSaveResponse(result: Observable<TypeDiplome>) {
      result.subscribe((res: TypeDiplome) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
  }
  
  close() {
      this.mode = 1;
  }
  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeDiplomesListModification'} );
      this.ngOnInit();
  }
  
/****************************** Edition *************************************/
  editTypeDiplome(id) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
  }
  
  load(id) {
      this.typeDiplomeService.find(id).subscribe( (typeDiplome) => {
          this.typeDiplome = typeDiplome;
          console.log(this.typeDiplome);
      });
  }
  
  edit() {
      /*this.typeDiplomeService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeDiplomesListModification'});
      });
      this.typeDiplome.codeTypeDiplome = this.id;*/
      this.subscribeToSaveResponse(this.typeDiplomeService.update(this.typeDiplome));
  }
  
  /************************************ Delete **********************************/

  deleteType(id: number) {
      this.typeDiplomeService.delete(id).subscribe((response) => {
          this.eventManager.broadcast({name: 'typeDiplomesListModification'});
          this.mode = 1;
          this.loadType();
      });
  }

}
