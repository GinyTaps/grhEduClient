import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeSecteurService } from '../type-secteur/type-secteur.service';
import { TypeSecteur } from '../type-secteur/type-secteur.model';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-secteur',
  templateUrl: './type-secteur.component.html',
  styleUrls: ['./type-secteur.component.css']
})
export class TypeSecteurComponent implements OnInit {

    typeSecteur: TypeSecteur = new TypeSecteur();
    typeSecteurs: TypeSecteur[] = new Array();
    code: number;
    routeData: any;
    subscription: Subscription;
    mode: number;
    id: number;
    title: string;
    typesTable: string[];
    header: string;
    p: number = 1; //pour la pagination
    
    
    constructor(
            private typeCategorieService: TypeCategorieService,
          private typeSecteurService: TypeSecteurService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.code = +atob(this.activatedRoute.snapshot.queryParamMap.get('id'));
      // console.log(this.code);
      if(this.code.toString().match('NaN')) {
          // console.log('Création');
          this.mode = 2;
          this.header = "Création";
          this.typeSecteur = new TypeSecteur;
      } else {
          // console.log('Edition');
          this.mode = 3;
          this.header = "Edition";
          this.load(this.code);
      }
  
  }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeSecteur() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeSecteurService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeSecteursListModification'});
              this.mode = 1;
              // this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeSecteur() {
      this.mode = 2;   
      this.header = "Création";
      this.typeSecteur = new TypeSecteur;
    }
    
    save() {
      this.subscribeToSaveResponse(this.typeSecteurService.create(this.typeSecteur));
    }
    
    subscribeToSaveResponse(result: Observable<TypeSecteur>) {
      result.subscribe((res: TypeSecteur) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
        this.router.navigateByUrl('/chaine');
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeSecteursListModification'} );
      this.router.navigateByUrl('/chaine');
    }
    
    /****************************** Edition *************************************/
    editTypeSecteur(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeSecteurService.find(id).subscribe( (typeSecteur) => {
            this.typeSecteur = typeSecteur;
            // console.log(this.typeSecteur)
        });
    }
    
    edit() {
      /*this.typeSecteurService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeSecteursListModification'});
      });
      this.typeSecteur.codeTypeSecteur = this.id;*/
      this.subscribeToSaveResponse(this.typeSecteurService.update(this.typeSecteur));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeSecteurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeSecteursListModification'});
            this.mode = 1;
            // this.loadType();
        });
    }

}
