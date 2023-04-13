import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hierarchie } from '../hierarchie/hierarchie.model';
import { HierarchieService } from '../hierarchie/hierarchie.service';
import { TypeChaineLocService } from '../type-chaine-loc/type-chaine-loc.service';
import { TypeRegroupementService } from '../type-regroupement/type-regroupement.service';
import { TypeChaineLoc } from '../type-chaine-loc/type-chaine-loc.model';
import { TypeRegroupement } from '../type-regroupement/type-regroupement.model';
import { TypeSecteur } from '../type-secteur/type-secteur.model';
import { TypeSecteurService } from '../type-secteur/type-secteur.service';

@Component({
  selector: 'app-hierarchie',
  templateUrl: './hierarchie.component.html',
  styleUrls: ['./hierarchie.component.css']
})
export class HierarchieComponent implements OnInit {

    hierarchie: Hierarchie = new Hierarchie();
    hierarchieT: Hierarchie;
    hierarchies: Hierarchie;
    typeChaineLocs: TypeChaineLoc;
    typeSecteurs: TypeSecteur;
    typeSecteur: TypeSecteur;
    typeRegroupements: TypeRegroupement;
    typeChaineLocT: TypeChaineLoc;
    typeRegroupementT: TypeRegroupement;
    typeChaineLoc: TypeChaineLoc[];
    typeRegroupement: TypeRegroupement[];
    subscription: Subscription;
    typeChaineLocId: number; 
    typeSecteurId: number;
    typeRegroupementId: number;
    hierarchieFilter: any = {id: {codeTypeChaineLoc:''}};
    id:number;
    c: number;
    code = null;
    mode: number;
    p: number = 1; //pour la pagination
    p1: number = 1; //pour la pagination
    
    // typeSecteurs: TypeSecteur;
    
    constructor(
          private hierarchieService: HierarchieService,
          private typeChaineLocService: TypeChaineLocService,
          private typeRegroupementService: TypeRegroupementService,
          private typeSecteurService: TypeSecteurService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          // private typeSecteurService: TypeSecteurService,
          ) { }
    
    ngOnInit() {
        this.mode = 1;
        this.loadAll();
      
    }
    
    loadAll() {
        this.hierarchieService.getAll().subscribe(data => {
            this.hierarchies = data;
                });
        
        this.typeChaineLocService.getAll().subscribe(data => {
            this.typeChaineLocs = data;
        })
        
        this.typeSecteurService.getAll().subscribe(data => {
            this.typeSecteurs = data;
        })
        
        this.typeRegroupementService.getAll().subscribe(data => {
            this.typeRegroupements = data;
        })
    }
    
    load(h: Hierarchie) {
        this.hierarchieService.find(h).subscribe(data => {
        this.hierarchie = data;
        });
    }
    
    /**************************** Création **************************/
    
    createHierarchie() {
        this.mode = 2;
        this.hierarchie = new Hierarchie();
    }
    
    save() {
        this.subscribeToSaveResponse(this.hierarchieService.create(this.hierarchie));
    }
    
    subscribeToSaveResponse(result: Observable<Hierarchie>) {
        result.subscribe((res: Hierarchie) => {
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'hierarchieListModification'} );
        this.ngOnInit();
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsHierarchie(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editHierarchie(h: Hierarchie) {
        this.mode = 3;
        this.id = +h.id.codeTypeRegroupement;
        this.c = +h.id.codeTypeChaineLoc;
        this.load(h);
    }
    
    edit() {
        this.hierarchieService.delete(this.id, this.c).subscribe( (response) => {
            this.eventManager.broadcast({name: 'hierarchieListModification'});
            this.subscribeToSaveResponse(this.hierarchieService.create(this.hierarchie));
        });
    }
    
    /**************************** Suppression **************************/
    
    deleteHierarchie(h: Hierarchie) {
        this.hierarchieService.delete(h.id.codeTypeRegroupement, h.id.codeTypeChaineLoc).subscribe((response) => {
            this.eventManager.broadcast({name: 'hierarchieListModification'});
            this.ngOnInit();
        });
    }
    
    /************************************* Type chaineLoc et Type secteur **********************************/

    getRouteTypeChaineLoc() {
        this.router.navigateByUrl('/typeChaineLoc');
    }
    
    getRouteTypeSecteur() {
        this.router.navigateByUrl('/typeSecteur');
    }
    
    getEditTypeChaineLoc(t: TypeChaineLoc) {
        this.code = btoa(t.codeTypeChaineLoc.toString()); //permet de coder la valeur dans l'url
            this.router.navigate(['/typeChaineLoc'], {queryParams: { id:this.code}});
    }
    
    getEditTypeSecteur(t: TypeSecteur) {
        this.code = btoa(t.codeTypeSecteur.toString()); //permet de coder la valeur dans l'url
            this.router.navigate(['/typeSecteur'], {queryParams: { id:this.code}});
    }
    
    deleteTypeChaineLoc(t: TypeChaineLoc) {
        this.typeChaineLocService.delete(t.codeTypeChaineLoc).subscribe((response) => {
            this.eventManager.broadcast({name: 'hierarchieListModification'});
            this.ngOnInit();
        });
    }
    
    deleteTypeSecteur(t: TypeSecteur) {
        this.typeSecteurService.delete(t.codeTypeSecteur).subscribe((response) => {
            this.eventManager.broadcast({name: 'hierarchieListModification'});
            this.ngOnInit();
        });
    }
    
}
