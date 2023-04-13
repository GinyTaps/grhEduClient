import { Component, OnInit } from '@angular/core';
import { TypeMethodeAutorise } from '../type-methode-autorise/type-methode-autorise.model';
import { Subscription, Observable } from 'rxjs';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';
import { TypeMethodeAutoriseService } from '../type-methode-autorise/type-methode-autorise.service';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-type-methode-autorise',
  templateUrl: './type-methode-autorise.component.html',
  styleUrls: ['./type-methode-autorise.component.css']
})
export class TypeMethodeAutoriseComponent implements OnInit {

    typeMethodeAutorise: TypeMethodeAutorise = new TypeMethodeAutorise();
    typeMethodeAutorises: TypeMethodeAutorise[] = new Array();
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
          private typeMethodeAutoriseService: TypeMethodeAutoriseService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = 'TypeMethodeAutorise';
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeMethodeAutorises();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types dMethodeAutorise';
        this.typeMethodeAutoriseService.getAll().subscribe(data => { 
          this.typeMethodeAutorises = Array(data); 
          });
        
    }
    
    selectType() {
        switch (this.typesTable, this.typeSelected) {
        case (this.typeSelected = 'TypeCategorie'): {
            this.mode = 1; 
            this.router.navigateByUrl('/typeCategorie');
            break;
        } case (this.typeSelected = 'TypeChaineLoc'): {
            this.mode = 1; 
            this.router.navigateByUrl('/typeChaineLoc');
            break;
        } case (this.typeSelected = 'TypeEchelon'): {
            this.mode = 1; 
            this.router.navigateByUrl('/typeDiplome');
            break;
        } case (this.typeSelected = 'TypeEchelon'): {
            this.mode = 1; 
            this.router.navigateByUrl('/typeEchelon');
            break;
        } case (this.typeSelected = 'TypeFonction'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeFonction');
            break;
        } case (this.typeSelected = 'TypeEtatCivil'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeEtatCivil');
            break;
        } case (this.typeSelected = 'TypeFonction'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeFonction');
            break; 
        } case (this.typeSelected = 'TypeGrade'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeGrade');
            break; 
        } case (this.typeSelected = 'TypeMethodeAutorise'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeMethodeAutorise');
            break;
        } case (this.typeSelected = 'TypeMilieu'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeMilieu');
            break; 
        } case (this.typeSelected = 'TypeMotifConge'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeMotifConge');
            break; 
        } case (this.typeSelected = 'TypeMotifDeces'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeMotifDeces');
            break;
        } case (this.typeSelected = 'TypeMotifRenvoi'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeMotifRenvoi');
            break; 
        } case (this.typeSelected = 'TypeMotifRetraite'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeMotifRetraite');
            break; 
        } case (this.typeSelected = 'TypeMotifSuspension'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeMotifSuspension');
            break;
        } case (this.typeSelected = 'TypeNationalite'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeNationalite');
            break; 
        } case (this.typeSelected = 'TypePathologie'): {
            this.mode = 1;
            this.router.navigateByUrl('/typePathologie');
            break; 
        } case (this.typeSelected = 'TypeRegroupement'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeRegroupement');
            break; 
        } case (this.typeSelected = 'TypeSecteur'): {
            this.mode = 1;
            this.title = 'Liste des types de secteur';
            this.router.navigateByUrl('/typeSecteur');
            break; 
        } case (this.typeSelected = 'TypeSexe'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeSexe');
            break; 
        } case (this.typeSelected = 'TypeSituation'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeSituation');
            break;
        } case (this.typeSelected = 'TypeStatut'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeStatut');
            break; 
        } case (this.typeSelected = 'TypeStatutEntite'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeStatutEntite');
            break; 
        } case (this.typeSelected = 'TypeStatutEtablissement'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeStatutEtablissement');
            break;
        } case (this.typeSelected = 'TypeStructureEdu'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeStructureEdu');
            break;
        } case (this.typeSelected = 'TypeTitre'): {
            this.mode = 1;
            this.router.navigateByUrl('/typeTitre');
        } default: {
            break;
        }
     }
    }
    
    registerChangeInTypeMethodeAutorises() {
      this.eventManager.subscribe( 'typeMethodeAutorisesListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeMethodeAutorise() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeMethodeAutoriseService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeMethodeAutorisesListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeMethodeAutorise() {
      this.mode = 2;   
      this.header = 'Création';
      this.typeMethodeAutorise = new TypeMethodeAutorise;
    }
    
    save() {
      // this.typeMethodeAutorise.codeTypeMethodeAutorise = this.id;
      this.subscribeToSaveResponse(this.typeMethodeAutoriseService.create(this.typeMethodeAutorise));
    }
    
    subscribeToSaveResponse(result: Observable<TypeMethodeAutorise>) {
      result.subscribe((res: TypeMethodeAutorise) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeMethodeAutorisesListModification'} );
      this.mode = 1;
      this.loadType();
    }
    
    /****************************** Edition *************************************/
    editTypeMethodeAutorise(id:number) {
      this.mode = 3;
      this.header = 'Edition';
      this.load(id);
    }
    
    load(id) {
        this.typeMethodeAutoriseService.find(id).subscribe( (typeMethodeAutorise) => {
            this.typeMethodeAutorise = typeMethodeAutorise;
        });
    }
    
    edit() {
      /*this.typeMethodeAutoriseService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeMethodeAutorisesListModification'});
      });
      this.typeMethodeAutorise.codeTypeMethodeAutorise = this.id;*/
      this.subscribeToSaveResponse(this.typeMethodeAutoriseService.update(this.typeMethodeAutorise));
    }
    
    /************************************ Delete **********************************/
    
    deleteType(id: number) {
        this.typeMethodeAutoriseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeMethodeAutorisesListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
