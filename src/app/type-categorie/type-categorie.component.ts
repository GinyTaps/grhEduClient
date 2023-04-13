import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { TypeCategorie } from './type-categorie.model';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-categorie',
  templateUrl: './type-categorie.component.html',
  styleUrls: ['./type-categorie.component.css']
})
export class TypeCategorieComponent implements OnInit {

    tableTypes = ['TypeCategorie', 'TypeChaineLoc', 'TypeDiplome', 'TypeEchelon', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'TypeTitre'];

    mode: number;
    id: number;
    title: string;
    header: string;
    objectArray: Array<object>; // Array<{code: number, libelle: string, ordre: number}>; // = TypeCategorie;
    typeObject: object;
    objectService: any;
    routerName: string;
    typeSelected: string;
    codeObjectArray: number;
    libelleObjectArray: string;
    ordreObjectArray: number;
    codeTypeObject: number;
    libelleTypeObject: string;
    ordreTypeObject: number;
    typesTable: string[]; // = this.tableTypes;
    typeCategorie: TypeCategorie = new TypeCategorie();
    typeCategories: TypeCategorie; // [] = new Array();
    subscription: Subscription;
    eventSubscriber: Subscription;
    routeData: any;
    p: number = 1; //pour la pagination


  constructor(
          // private objectService: any,
          private typeCategorieService: TypeCategorieService,
          private eventManager: EventManagerService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }

  ngOnInit() {
      this.typeSelected = null;
      // this. mode = 1;
      /*this.objectArray = null;
      this.typeObject = null;
      this.objectService = null;
      this.typesTable = null;*/
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          if(this.subscription) {
              this.loadAll();
              this.loadType();
          }
          // this.load(params['id']);
          this.id = +params['id'];
          // console.log(params['id']);
      });
      /*if(this.subscription) {
          this.typeSelected = "TypeCategorie";
          this.loadAll();
      } else {
          this.typeSelected = "";
      }*/ 
      this.loadAll();
      this.loadType();
      
      this.registerChangeInTypes();
  }
  
  loadAll() {
      this.typeCategorieService.getTables().subscribe( (data: string[]) => {
          this.typesTable = data;
      })
      /*this.objectService.getAll().subscribe((data) => {
          this.typeObject = data;
      });*/
  }
  
  loadType() {
      this.title = 'Liste des types de Catégorie';
      this.typeCategorieService.getAll().subscribe( (data) => {
          this.typeCategories = data;
          // this.typeCategories = Array(data);
      })
  }
  
  registerChangeInTypes() {
      this.eventSubscriber = this.eventManager.subscribe(
          'typeCategorieListModification', ( response ) => 
      this.loadAll()    
      /*this.load(this.id)*/ );
  }
  
  selectType(t) {
      console.log(t);
      if(t.match('TypeCategorie')) {
          this.mode = 1; 
          this.title = 'Liste des types de Catégorie';
          this.typeCategorieService.getAll().subscribe( (data) => {
              this.typeCategories = data;
          });
      } /*else if(t != 'Liste des types de Catégorie') {
          this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
          
      }*/ else {
          console.log('******* Appel de la fonction ********');
          this.typeCategorieService.selectType(this.typesTable, t, this.mode);
      }
      /*if(this.typeSelected = "TypeCategorie") {
          console.log(this.typeSelected);
          this.mode = 1; 
          this.title = 'Liste des types de Catégorie';
          this.typeCategorieService.getAll().subscribe( (data) => {
              this.typeCategories = data;
          });
      } else {
          console.log(this.typeSelected);
       this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
      }*/
      /*switch (this.typesTable, this.typeSelected) {
      case (this.typeSelected = "TypeCategorie"): {
          this.mode = 1; 
          // this.title = 'Liste des types de Catégorie';
          this.router.navigateByUrl('/typeCategorie');
          // this.router.navigateByUrl('/conge-employe/'+this.id);
          this.objectArray = Array<TypeCategorie>();
          console.log(this.objectArray);
          this.typeObject = new TypeCategorie();
          this.objectService = this.typeCategorieService;
          this.typeCategorieService.getAll().subscribe((data) => {
              this.typeCategories = Array.of(data);
              this.objectArray = this.typeCategories;
              this.codeObjectArray = this.typeCategorie.codeTypeCategorie;
              this.libelleObjectArray = this.typeCategorie.libelleTypeCategorie;
              this.ordreObjectArray = this.typeCategorie.ordreTypeCategorie;
              this.typeCategorie = data;
              this.typeObject = this.typeCategorie;
              this.codeTypeObject = this.typeCategorie.codeTypeCategorie;
              this.libelleTypeObject = this.typeCategorie.libelleTypeCategorie;
              this.ordreTypeObject = this.typeCategorie.ordreTypeCategorie;
              
          })
          break;
      } case (this.typeSelected = "TypeChaineLoc"): {
          this.mode = 1; 
          // this.title = 'Liste des types de Chaine de localité';
          this.router.navigateByUrl('/typeChaineLoc');
          break;
      } case (this.typeSelected = "TypeDiplome"): {
          this.mode = 1; 
          // this.title = 'Liste des types de diplome';
          this.router.navigateByUrl('/typeDiplome');
          break;
      } case (this.typeSelected = "TypeEchelon"): {
          this.mode = 1; 
          // this.title = 'Liste des types déchelon';
          this.router.navigateByUrl('/typeEchelon');
          break;
      } case (this.typeSelected = "TypeEtablissement"): {
          this.mode = 1;
          // this.title = 'Liste des types dEtablissement';
          this.router.navigateByUrl('/typeEtablissement');
          break;
      } case (this.typeSelected = "TypeEtatCivil"): {
          this.mode = 1;
          // this.title = 'Liste des types dEtat-civil';
          this.router.navigateByUrl('/typeEtatCivil');
          break;
      } case (this.typeSelected = "TypeFonction"): {
          this.mode = 1;
          // this.title = 'Liste des types de fonction';
          this.router.navigateByUrl('/typeFonction');
          break; 
      } case (this.typeSelected = "TypeGrade"): {
          this.mode = 1;
          // this.title = 'Liste des types de grade';
          this.router.navigateByUrl('/typeGrade');
          break; 
      } case (this.typeSelected = "TypeHandicap"): {
          this.mode = 1;
          // this.title = 'Liste des types dHandicap';
          this.router.navigateByUrl('/typeHandicap');
          break;
      } case (this.typeSelected = "TypeMilieu"): {
          this.mode = 1;
          // this.title = 'Liste des types de milieu';
          this.router.navigateByUrl('/typeMilieu');
          break; 
      } case (this.typeSelected = "TypeMotifConge"): {
          this.mode = 1;
          // this.title = 'Liste des types de motif de conge';
          this.router.navigateByUrl('/typeMotifConge');
          break; 
      } case (this.typeSelected = "TypeMotifDeces"): {
          this.mode = 1;
          // this.title = 'Type de décès';
          this.router.navigateByUrl('/typeMotifDeces');
          break;
      } case (this.typeSelected = "TypeMotifRenvoi"): {
          this.mode = 1;
          // this.title = 'Liste des types de motif de renvoi';
          this.router.navigateByUrl('/typeMotifRenvoi');
          break; 
      } case (this.typeSelected = "TypeMotifRetraite"): {
          this.mode = 1;
          // this.title = 'Liste des types de motif retraite';
          this.router.navigateByUrl('/typeMotifRetraite');
          break; 
      } case (this.typeSelected = "TypeMotifSuspension"): {
          this.mode = 1;
          // this.title = 'Liste des types de motif de suspension';
          this.router.navigateByUrl('/typeMotifSuspension');
          break;
      } case (this.typeSelected = "TypeNationalite"): {
          this.mode = 1;
          // this.title = 'Liste des types de nationalité';
          this.router.navigateByUrl('/typeNationalite');
          break; 
      } case (this.typeSelected = "TypePathologie"): {
          this.mode = 1;
          // this.title = 'Liste des types de pathologie';
          this.router.navigateByUrl('/typePathologie');
          break; 
      } case (this.typeSelected = "TypeRegroupement"): {
          this.mode = 1;
          // this.title = 'Liste des types de regroupement';
          this.router.navigateByUrl('/typeRegroupement');
          break; 
      } case (this.typeSelected = "TypeSecteur"): {
          this.mode = 1;
          // this.title = 'Liste des types de secteur';
          this.router.navigateByUrl('/typeSecteur');
          break; 
      } case (this.typeSelected = "TypeSexe"): {
          this.mode = 1;
          // this.title = 'Liste des types de sexe';
          this.router.navigateByUrl('/typeSexe');
          break; 
      } case (this.typeSelected = "TypeStatut"): {
          this.mode = 1;
          // this.title = 'Liste des types de statut';
          this.router.navigateByUrl('/typeStatut');
          break; 
      } case (this.typeSelected = "TypeStatutEntite"): {
          this.mode = 1;
          // this.title = 'Liste des types de statut de lEntité';
          this.router.navigateByUrl('/typeStatutEntite');
          break; 
      } case (this.typeSelected = "TypeStatutEtablissement"): {
          this.mode = 1;
          // this.title = 'Liste des types de statut de lEtablissement';
          this.router.navigateByUrl('/typeStatutEtablissement');
          break;
      } case (this.typeSelected = "TypeStructureEdu"): {
          this.mode = 1;
          // this.title = 'Liste des types de structure éducation';
          this.router.navigateByUrl('/typeStructureEdu');
          break;
      } case (this.typeSelected = "TypeTitre"): {
          this.mode = 1;
          // this.title = 'Liste des types de titre';
          this.router.navigateByUrl('/typeTitre');
      } default: {
          break;
      }
    }*/
      
  }
  
  /************************************ Create **********************************/
  
  createTypeCategorie() {
      this.mode = 2;
      this.typeCategorie = new TypeCategorie;
      this.header = 'Création';
  }
  save() {
      this.subscribeToSaveResponse(this.typeCategorieService.create(this.typeCategorie));
  }
  
  subscribeToSaveResponse(result: Observable<TypeCategorie>) {
      result.subscribe((res: TypeCategorie) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
  }
  
  trackId(index: number, item: TypeCategorie) {
      return item.codeTypeCategorie;
  }
  
  clear() {
      this.mode = 1;
  }
  
  close() {
      this.mode = 1;
  }
  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeCategorieListModification'} );
      this.ngOnInit();
  }
  
  /************************************ Détails **********************************/
  
  detailsTypeCategorie(id: number) {
      
  }
  
  
  /************************************ Edit **********************************/
  
  editTypeCategorie(id) {
      this.mode = 3;
      this.header = 'Edition';
      this.load(id);
  }
  
  load(id) {
      this.typeCategorieService.find(id).subscribe((data) => {
          this.typeCategorie = data;
      });
  }
  
  edit() {
      this.subscribeToSaveResponse(this.typeCategorieService.update(this.typeCategorie));
  }
  
  /************************************ Delete **********************************/

  deleteType(id: number) {
      // if(confirm("Are you sure to delete "+name)) {
      // if(confirm("Are you sure to delete this type?")) {
          this.typeCategorieService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeCategorieListModification'});
              this.mode = 1;
              this.loadType();
          });
      // }
  }
  
//Fonction permettant de supprimer la ligne cochée
  deleteCheck(id: number, event: any) {
          this.typeCategorieService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeCategorieListModification'});
              this.mode = 1;
              this.loadType();
          });
  }
  

}
