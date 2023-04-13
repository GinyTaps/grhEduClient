import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EtablissementRegroupement } from './etablissement-regroupement.model';
import { EtablissementRegroupementService } from './etablissement-regroupement.service';

@Component({
  selector: 'app-etablissement-regroupement',
  templateUrl: './etablissement-regroupement.component.html',
  styleUrls: ['./etablissement-regroupement.component.css']
})
export class EtablissementRegroupementComponent implements OnInit {

    etablissementRegroupement: EtablissementRegroupement = new EtablissementRegroupement();
    subscription: Subscription;
    id:number;
    c: number;
    mode: number;
    
    // regroupement: Regroupement;
    
    constructor(
          private etablissementRegroupementService: EtablissementRegroupementService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          // private regroupementService: RegroupementService,
          ) { }
    
    ngOnInit() {
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          /*this.etablissementRegroupement.id.codeEtablissement = params['id'];
          this.etablissementRegroupement.id.codeRegroupement = params['c'];
          this.etablissementRegroupementT = this.etablissementRegroupement;
          
          this.load(this.etablissementRegroupementT);*/
          this.id = +params['id'];
          this.c = params['c'];
      });
      
    }
    
    load(etabR: EtablissementRegroupement) {
        this.etablissementRegroupementService.find(etabR).subscribe((etablissementRegroupement) => {
        this.etablissementRegroupement = etablissementRegroupement;
        });
    }
    
    /**************************** Création **************************/
    
    createEtablissementRegroupement() {
        this.mode = 2;
    }
    
    save() {
        this.subscribeToSaveResponse(this.etablissementRegroupementService.create(this.etablissementRegroupement));
    }
    
    subscribeToSaveResponse(result: Observable<EtablissementRegroupement>) {
        result.subscribe((res: EtablissementRegroupement) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'etablissementRegroupementListModification'} );
        this.ngOnInit();
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsEtablissementRegroupement(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editEtablissementRegroupement(etabR: EtablissementRegroupement) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.c = params['d'];
        });
        this.etablissementRegroupementService.find(etabR).subscribe( (etablissementRegroupement) => {
            this.etablissementRegroupement = etablissementRegroupement;
        });
    }
    
    edit() {
        this.etablissementRegroupementService.delete(this.id, this.c).subscribe( (response) => {
            this.eventManager.broadcast({name: 'etablissementRegroupementListModification'});
            
            this.etablissementRegroupement.id.codeEtablissement = this.id.toString();
            this.subscribeToSaveResponse(this.etablissementRegroupementService.create(this.etablissementRegroupement));
        });
        
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(etabR: EtablissementRegroupement, event: any) {
        this.etablissementRegroupementService.delete(+etabR.id.codeEtablissement, +etabR.id.codeRegroupement).subscribe((response) => {
            this.eventManager.broadcast({name: 'etablissementRegroupementListModification'});
            this.ngOnInit();
        });
    }

}
