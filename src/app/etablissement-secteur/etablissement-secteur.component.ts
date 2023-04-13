import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EtablissementSecteur } from '../etablissement-secteur/etablissement-secteur.model';
import { EtablissementSecteurService } from '../etablissement-secteur/etablissement-secteur.service';

@Component({
  selector: 'app-etablissement-secteur',
  templateUrl: './etablissement-secteur.component.html',
  styleUrls: ['./etablissement-secteur.component.css']
})
export class EtablissementSecteurComponent implements OnInit {

    etablissementSecteur: EtablissementSecteur = new EtablissementSecteur();
    subscription: Subscription;
    id:number;
    c: number;
    mode: number;
    
    // typeSecteurs: TypeSecteur;
    
    constructor(
          private etablissementSecteurService: EtablissementSecteurService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          // private typeSecteurService: TypeSecteurService,
          ) { }
    
    ngOnInit() {
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = +params['id'];
          this.c = params['c'];
      });
      
    }
    
    load(etabS) {
        this.etablissementSecteurService.find(etabS).subscribe((etablissementSecteur) => {
        this.etablissementSecteur = etablissementSecteur;
        });
    }
    
    /**************************** Création **************************/
    
    createEtablissementSecteur() {
        this.mode = 2;
    }
    
    save() {
        this.subscribeToSaveResponse(this.etablissementSecteurService.create(this.etablissementSecteur));
    }
    
    subscribeToSaveResponse(result: Observable<EtablissementSecteur>) {
        result.subscribe((res: EtablissementSecteur) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'etablissementSecteurListModification'} );
        this.ngOnInit();
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsEtablissementSecteur(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editEtablissementSecteur(etabS: EtablissementSecteur) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.c = params['c'];
        });
        this.etablissementSecteurService.find(etabS).subscribe( (etablissementSecteur) => {
            this.etablissementSecteur = etablissementSecteur;
        });
    }
    
    edit() {
        this.etablissementSecteurService.delete(this.id, this.c).subscribe( (response) => {
            this.eventManager.broadcast({name: 'etablissementSecteurListModification'});
            
            this.etablissementSecteur.id.codeEtablissement = this.id.toString();
            this.subscribeToSaveResponse(this.etablissementSecteurService.create(this.etablissementSecteur));
        });
        
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(etabS: EtablissementSecteur, event: any) {
        this.etablissementSecteurService.delete(+etabS.id.codeEtablissement, +etabS.id.codeTypeSecteur).subscribe((response) => {
            this.eventManager.broadcast({name: 'etablissementSecteurListModification'});
            this.ngOnInit();
        });
    }

}
