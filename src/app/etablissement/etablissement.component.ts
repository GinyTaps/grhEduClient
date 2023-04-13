import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Etablissement } from '../etablissement/etablissement.model';
import { TypeStatutEtablissement } from '../type-statut-etablissement/type-statut-etablissement.model';
import { TypeEtablissement } from '../type-etablissement/type-etablissement.model';
import { TypeMilieu } from '../type-milieu/type-milieu.model';
import { EtablissementService } from '../etablissement/etablissement.service';
import { TypeMilieuService } from '../type-milieu/type-milieu.service';
import { TypeStatutEtablissementService } from '../type-statut-etablissement/type-statut-etablissement.service';
import { TypeEtablissementService } from '../type-etablissement/type-etablissement.service';

@Component({
  selector: 'app-etablissement',
  templateUrl: './etablissement.component.html',
  styleUrls: ['./etablissement.component.css']
})
export class EtablissementComponent implements OnInit {

    etablissement: Etablissement = new Etablissement();
    etablissements: Etablissement; // [] = new Array();
    typeMilieu: TypeMilieu;
    typeStatutEtablissements: TypeStatutEtablissement;
    typeEtablissements: TypeEtablissement;
    adminSelected: number;
    routeData: any;
    subscription: Subscription;
    mode: number;
    id: number;
    title: string;
    p: number = 1; //pour la pagination

    constructor(
          private etablissementService: EtablissementService,
          private typeMilieuService: TypeMilieuService,
          private typeStatutEtablissementService: TypeStatutEtablissementService,
          private typeEtablissementService: TypeEtablissementService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }

    ngOnInit() {
      this.mode = 1;
      this.title = "Etablissement"
      this.adminSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      /*this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
      });*/
      // this.motCle = '';
      this.loadAll();
      this.registerChangeInEtablissements();
    }

    loadAll() {
      this.etablissementService.getAll().subscribe(data => {
          this.etablissements = data; // Array(data);
          }, err => {
              console.log(err);
              });
      this.loadTypeEtablissement();
      this.loadTypeMilieu();
      this.loadTypeStatutEtablissement();
    }

    loadTypeMilieu() {
        this.typeMilieuService.getAll().subscribe((data) => {
            this.typeMilieu = data;
        })
    }

    loadTypeStatutEtablissement() {
        this.typeStatutEtablissementService.getAll().subscribe((data) => {
            this.typeStatutEtablissements = data;
        })
    }

    loadTypeEtablissement() {
        this.typeEtablissementService.getAll().subscribe((data) => {
            this.typeEtablissements = data;
        })
    }

    registerChangeInEtablissements() {
      this.eventManager.subscribe( 'etablissementsListModification', ( response ) => this.loadAll() );
    }

    /************************************* Détais et suppression  ***********************************/
    detailsEtablissement() {
      this.mode = 4;
    }


    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.etablissementService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'etablissementsListModification'});
              this.mode = 1;
              this.loadAll();
          });
    }

    /****************************** Création *************************************/
    createEtablissement() {
      this.mode = 2;
      this.etablissement = new Etablissement();
    }

    save() {
      // this.etablissement.codeEtablissement = this.id;
      this.subscribeToSaveResponse(this.etablissementService.create(this.etablissement));
    }

    subscribeToSaveResponse(result: Observable<Etablissement>) {
      result.subscribe((res: Etablissement) => {
          // console.log(res);
          this.onSaveSuccess(res);
          });
    }

    close() {
      this.mode = 1;
    }

    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'etablissementListModification'} );
      this.mode = 1;
      this.loadAll();
    }

    /****************************** Edition *************************************/
    editEtablissement(id:number) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
      });
      this.etablissementService.find(id).subscribe( data => {
          this.etablissement = data;
      });
      // this.edit();
    }

    edit() {
      this.subscribeToSaveResponse(this.etablissementService.update(this.etablissement));
    }

    /************************************ Delete **********************************/

    deleteEtablissement(id) {
        this.etablissementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'administrationsListModification'});
            this.mode = 1;
            this.loadAll();
        });
    }

}
