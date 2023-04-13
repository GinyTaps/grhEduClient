import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TypeChaineLoc } from '../type-chaine-loc/type-chaine-loc.model';
import { Subscription, Observable } from 'rxjs';
import { TypeChaineLocService } from './type-chaine-loc.service';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';
import { TypeSecteur } from '../type-secteur/type-secteur.model';
import { TypeSecteurService } from '../type-secteur/type-secteur.service';

@Component({
  selector: 'app-type-chaine-loc',
  templateUrl: './type-chaine-loc.component.html',
  styleUrls: ['./type-chaine-loc.component.css']
})
export class TypeChaineLocComponent implements OnInit {

    typeChaineLoc: TypeChaineLoc = new TypeChaineLoc();
    typeChaineLocs: TypeChaineLoc[] = new Array();
    typeSecteurs: TypeSecteur;
    code: number;
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
            private typeChaineLocService: TypeChaineLocService,
            private typeSecteurService: TypeSecteurService,
            private eventManager: EventManagerService,
            private authService: AuthService,
            private activatedRoute: ActivatedRoute,
            private router: Router
          ) {
        this.code = +atob(this.activatedRoute.snapshot.queryParamMap.get('id'));
    }
    
    ngOnInit() {
        // this.mode = 1;
        this.typeSelected = 'TypeChaineLoc';
        // console.log(this.code.toString());
        if(this.code.toString().match('NaN')) {
            // console.log('Création');
            this.mode = 2;
            this.header = 'Création';
            this.typeChaineLoc = new TypeChaineLoc;
            this.typeSecteurService.getAll().subscribe(data => {
                this.typeSecteurs = data;
                // console.log(this.typeSecteurs);
            });
        } else {
            // console.log('Edition');
            this.mode = 3;
            this.header = 'Edition';
            this.load(this.code);
            this.typeSecteurService.getAll().subscribe(data => {
                this.typeSecteurs = data;
            });
        }
      /*this.loadAll();
      this.loadType();
      this.registerChangeInTypeChaineLocs();*/
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types de Chaine de localité'; 
      this.typeChaineLocService.getAll().subscribe(data => { 
          this.typeChaineLocs = Array(data); 
          });
      this.typeSecteurService.getAll().subscribe(data => {
          this.typeSecteurs = data;
      })
        
    }
    
    selectType() { 
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
    }
    
    registerChangeInTypeChaineLocs() {
      this.eventManager.subscribe( 'typeChaineLocListModification', ( response ) => this.loadAll() );
    }
    
    /******************************* Liste des diplomes ***********************************/
    detailsTypeChaineLoc() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeChaineLocService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeChaineLocListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeChaineLoc() {
      this.mode = 2;
      this.header = 'Création';
      this.typeChaineLoc = new TypeChaineLoc;
    }
    
    save() {
      // this.typeChaineLoc.codeTypeChaineLoc = this.id;
      this.subscribeToSaveResponse(this.typeChaineLocService.create(this.typeChaineLoc));
    }
    
    subscribeToSaveResponse(result: Observable<TypeChaineLoc>) {
      result.subscribe((res: TypeChaineLoc) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
        // this.mode = 1;
        this.router.navigateByUrl('/chaine');
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeChaineLocListModification'} );
      this.router.navigateByUrl('/chaine');
      /*this.mode = 1;
      this.loadType();*/
    }
    
    /****************************** Edition *************************************/
    editTypeChaineLoc(id) {
      this.mode = 3;
      this.header = 'Edition';
      this.load(id);
      /*this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
      });
      this.typeChaineLocService.find(id).subscribe( (typeChaineLoc) => {
          this.typeChaineLoc = typeChaineLoc;
      });*/
      // this.edit();
    }
    
    load(id) {
        this.typeChaineLocService.find(id).subscribe(data => {
            this.typeChaineLoc = data;
            // console.log(this.typeChaineLoc);
        });
    }
    
    edit() {
      /*this.typeChaineLocService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeChaineLocsListModification'});
      });
      this.typeChaineLoc.codeTypeChaineLoc = this.id;*/
      this.subscribeToSaveResponse(this.typeChaineLocService.update(this.typeChaineLoc));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeChaineLocService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeChaineLocListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
