import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Administration } from '../administration/administration.model';
import { AdministrationService } from '../administration/administration.service';
import { TypeStructureEdu } from '../type-structure-edu/type-structure-edu.model';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';
import { TypeStructureEduService } from '../type-structure-edu/type-structure-edu.service';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';
import { StructureEdu } from '../structure-education/structure-education.model';
import { StructureEduService } from '../structure-education/structure-education.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

    administration: Administration = new Administration();
    administrations: Administration; // [] = new Array();
    structureEdus: StructureEdu;
    typeStatutEntite: TypeStatutEntite;
    adminSelected: number;
    routeData: any;
    subscription: Subscription;
    mode: number;
    id: number;
    title: string;
    p: number = 1; //pour la pagination
    
    constructor(
          private administrationService: AdministrationService,
          private structureEduService: StructureEduService,
          private typeStatutEntiteService: TypeStatutEntiteService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.adminSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.title = "Administration";
      /*this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
      });*/
      // this.motCle = '';
      this.loadAll();
      this.registerChangeInAdministrations();
    }
    
    loadAll() {
      this.administrationService.getAll().subscribe(data => { 
          this.administrations = data; 
          }, err => { 
              console.log(err); 
              });
        this.loadTypeStatutentite();
        this.loadStuctureEdu();
    }
    
    loadTypeStatutentite() {
        this.typeStatutEntiteService.getAll().subscribe((data) => {
            this.typeStatutEntite = data;
        })
    }
    
    loadStuctureEdu() {
        this.structureEduService.getAll().subscribe((data) => {
            this.structureEdus = data;
        })
    }
    
    registerChangeInAdministrations() {
      this.eventManager.subscribe( 'administrationsListModification', ( response ) => this.loadAll() );
    }
    
    trackTypeStructureEduById(index: number, item: TypeStructureEdu) {
        return item.codeTypeStructureEdu;
    }
    
    /*trackTypeStatutEntiteById(index: number, item: TypeStatutEntite) {
        return item.codeTypeStatutEntite;
    }*/
    
    /************************************* Détais et suppression  ***********************************/
    detailsAdministration() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.administrationService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'administrationsListModification'});
              this.mode = 1;
              this.loadAll();
          });
    }
    
    /****************************** Création *************************************/
    createAdministration() {
      this.mode = 2;  
      this.administration = new Administration();
    }
    
    save() {
      // this.administration.codeAdministration = this.id;
      this.subscribeToSaveResponse(this.administrationService.create(this.administration));
    }
    
    subscribeToSaveResponse(result: Observable<Administration>) {
      result.subscribe((res: Administration) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'administrationsListModification'} );
      this.mode = 1;
      this.loadAll();
    }
    
    /****************************** Edition *************************************/
    editAdministration(id:number) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
      });
      this.administrationService.find(id).subscribe( (administration) => {
          this.administration = administration;
      });
      // this.edit();
    }
    
    edit() {
      /*this.administrationService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'administrationsListModification'});
      });
      this.administration.codeAdministration = this.id;*/
      this.subscribeToSaveResponse(this.administrationService.update(this.administration));
    }
    
  /************************************ Delete **********************************/

    deleteAdministration(id) {
        this.administrationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'administrationsListModification'});
            this.mode = 1;
            this.loadAll();
        });
    }

}
