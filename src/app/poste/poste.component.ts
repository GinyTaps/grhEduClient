import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Poste } from '../poste/poste.model';
import { Administration } from '../administration/administration.model';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';
import { Etablissement } from '../etablissement/etablissement.model';
import { TypeFonction } from '../type-fonction/type-fonction.model';
import { PosteService } from '../poste/poste.service';
import { AdministrationService } from '../administration/administration.service';
import { EtablissementService } from '../etablissement/etablissement.service';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';
import { TypeFonctionService } from '../type-fonction/type-fonction.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.css']
})
export class PosteComponent implements OnInit {

    poste: Poste = new Poste();
    postes: Poste[] = new Array();
    administration: Administration;
    typeStatutEntite: TypeStatutEntite;
    etablissement: Etablissement;
    typeFonction: TypeFonction;
    adminSelected: number;
    routeData: any;
    subscription: Subscription;
    mode: number;
    id: number;
    title: string;
    p: number = 1; //pour la pagination
    
    constructor(
          private posteService: PosteService,
          private administrationService: AdministrationService,
          private etablissementService: EtablissementService,
          private typeStatutEntiteService: TypeStatutEntiteService,
          private typeFonctionService: TypeFonctionService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.title = 'Poste';
      this.adminSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      /*this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
      });*/
      // this.motCle = '';
      this.loadAll();
      this.registerChangeInPostes();
    }
    
    loadAll() {
      this.posteService.getAll().subscribe(data => { 
          this.postes = Array(data); 
          }, err => { 
              console.log(err); 
              });
        this.loadAdministration();
        this.loadEtablissement();
        this.loadTypeStatutEntite();
        this.loadTypeFonction();
    }
    
    loadAdministration() {
        this.administrationService.getAll().subscribe((data) => {
            this.administration = data;
        })
    }
    
    loadEtablissement() {
        this.etablissementService.getAll().subscribe((data) => {
            this.etablissement = data;
        })
    }
    
    loadTypeStatutEntite() {
        this.typeStatutEntiteService.getAll().subscribe((data) => {
            this.typeStatutEntite = data;
        })
    }
    
    loadTypeFonction() {
        this.typeFonctionService.getAll().subscribe((data) => {
            this.typeFonction = data;
        })
    }
    
    registerChangeInPostes() {
      this.eventManager.subscribe( 'postesListModification', ( response ) => this.loadAll() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsPoste() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.posteService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'postesListModification'});
              this.mode = 1;
              this.loadAll();
          });
    }
    
    /****************************** Création *************************************/
    createPoste() {
      this.mode = 2;
      this.poste = new Poste();
    }
    
    save() {
      // this.poste.codePoste = this.id;
      this.subscribeToSaveResponse(this.posteService.create(this.poste));
    }
    
    subscribeToSaveResponse(result: Observable<Poste>) {
      result.subscribe((res: Poste) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'postesListModification'} );
      this.mode = 1;
      this.loadAll();
    }
    
    /****************************** Edition *************************************/
    editPoste(id:number) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
      });
      this.posteService.find(id).subscribe( (poste) => {
          this.poste = poste;
      });
      // this.edit();
    }
    
    edit() {
      /*this.posteService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'postesListModification'});
      });
      this.poste.codePoste = this.id;*/
      this.subscribeToSaveResponse(this.posteService.update(this.poste));
    }
    
    /************************************ Delete **********************************/

    deletePoste(id) {
        this.posteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'administrationsListModification'});
            this.mode = 1;
            this.loadAll();
        });
    }

}
