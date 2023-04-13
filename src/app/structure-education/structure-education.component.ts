import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { Subscription, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { StructureEduService } from '../structure-education/structure-education.service';
import { StructureEdu } from '../structure-education/structure-education.model';
import { RegroupementService } from '../regroupement/regroupement.service';
import { TypeStructureEduService } from '../type-structure-edu/type-structure-edu.service';
import { Regroupement } from '../regroupement/regroupement.model';
import { TypeStructureEdu } from '../type-structure-edu/type-structure-edu.model';
import { TypeRegroupement } from '../type-regroupement/type-regroupement.model';
import { TypeRegroupementService } from '../type-regroupement/type-regroupement.service';
import { AdministrationService } from '../administration/administration.service';
import { Administration } from '../administration/administration.model';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';

@Component({
  selector: 'app-structure-education',
  templateUrl: './structure-education.component.html',
  styleUrls: ['./structure-education.component.css']
})
export class StructureEduComponent implements OnInit {

    structureEdu: StructureEdu = new StructureEdu();
    structureEdus: StructureEdu;
    administrations: Administration;
    administration: Administration = new Administration();
    regroupements: Regroupement;
    regroupement: Regroupement = new Regroupement();
    regroupementA: Regroupement = new Regroupement();
    regroupementUnder: Regroupement = new Regroupement();
    typeStatutEntites: TypeStatutEntite;
    typeStructureEdus: TypeStructureEdu;
    subscription: Subscription;
    typeRegroupements: TypeRegroupement;
    typeRegroupement: TypeRegroupement = new TypeRegroupement();
    regroupementChaines: { [id: number]: Regroupement[] } = {};
    regroupementFils: { [id: number]: Regroupement[] } = {};
    regroupementSousFils: { [id: number]: Regroupement[] } = {};
    regroupementSousSFils: { [id: number]: Regroupement[] } = {};
    
    regChaines = null;
    regFils = null;
    regSousFils = null;
    
    codeRegroupementA = null;
    codeRegroupementUnder = null;
    
    id:number;
    c: number;
    mode: number;
    step: number;
    selectedValue = null;
    regSelected: number;
    codeStructEdu: number = 0;
    ok: boolean = false;
    
    // typeSecteurs: TypeSecteur;
    
    constructor(
          private structureEduService: StructureEduService,
          private administrationService: AdministrationService,
          private regroupementService: RegroupementService,
          private typeRegroupementService: TypeRegroupementService,
          private typeStatutEntiteService: TypeStatutEntiteService,
          private typeStructureEduService: TypeStructureEduService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          ) { }
    
    ngOnInit() {
        this.mode = 1;
      /*this.subscription = this.activatedRoute.params.subscribe((params) => {
          
          this.load(params['id']);
          this.id = +params['id'];
      });*/
      
      this.loadAll();
    }
    
    loadAll() {
        this.getTypeRegroupement();
        
        this.administrationService.getAll().subscribe(data => {
            this.administrations = data;
        })
        
        this.structureEduService.getAll().subscribe( data => {
        this.structureEdus = data;
        });
        
        this.typeStatutEntiteService.getAll().subscribe( data => {
            this.typeStatutEntites = data;
            });
        
        this.typeStructureEduService.getAll().subscribe( data => {
            this.typeStructureEdus = data;
            });
        
        this.regroupementService.getAll().subscribe( data => {
            this.regroupements = data;
            });
        
    }
    
    onChangeChaineRegroupement(t: TypeRegroupement) {
        this.getChaineRegroupement(t);
    }
    
    getTypeRegroupement() {
        this.typeRegroupementService.getAll().subscribe(data => {
            this.typeRegroupements = data;
        })
    }
    
    getChaineRegroupement(t : TypeRegroupement) {
        this.regroupementService.getChaineReg(t.codeTypeRegroupement).subscribe(data => {
            this.regroupementChaines[t.codeTypeRegroupement] = data;
            this.regChaines = this.regroupementChaines[t.codeTypeRegroupement];
        });
    }
    
    getRegroupement(r :Regroupement) {
        this.regroupementService.getChaineRegFils(r.codeRegroupement).subscribe(data => {
            this.regroupementFils[r.codeRegroupement] = data;
            this.regFils =  this.regroupementFils[r.codeRegroupement];
        })
        
    }
    
    getARegroupement(r :Regroupement) {
        this.regroupementService.getChaineRegFils(r.codeRegroupement).subscribe(data => {
            this.regroupementSousFils[r.codeRegroupement] = data;
            this.regSousFils = this.regroupementSousFils[r.codeRegroupement];
        })
        this.regSelected = r.codeRegroupement;
    }
    
    getUnderRegroupement(r :Regroupement) {
        /*this.regroupementService.getChaineRegFils(r.codeRegroupement).subscribe(data => {
            this.regroupementSousSFils[r.codeRegroupement] = data;
        })*/
        this.regSelected = r.codeRegroupement;
        /*console.log('************ Regroupement sélectionné *******:');
        console.log(this.regSelected);
        console.log('***************************************************');*/
    }
    
    
    load(id: number) {
        this.structureEduService.find(id).subscribe(data => {
        this.structureEdus = data;
        });
    }
    
    /**************************** Création **************************/
    
    createStructureEdu() {
        this.mode = 2;
        this.step = 1;
        // console.log(this.regSelected);
    }
    
    save() {

        this.structureEdu.codeRegroupement = this.regSelected;
        // console.log(this.structureEdu.codeRegroupement);
        // this.codeStructEdu = this.structureEdu.codeStructureEdu;
        this.structureEduService.create(this.structureEdu).subscribe(res => {
            /*this.eventManager.broadcast( { name: 'structureEduListModification'} );
            this.step = 2;*/
            if(res.status == 200) {
                this.eventManager.broadcast( { name: 'structureEduListModification'} );
                // console.log(res.status);
                // console.log(res.body.codeStructureEdu);
                this.step = 2;
				let c = res.body;
				console.log(c);
                // this.codeStructEdu = +res.body.codeStructureEdu;
            }
        });
    }
    
    saveAdministration() {

            this.administration.codeStructureEdu = this.codeStructEdu;
            this.administrationService.create(this.administration).subscribe(res => {
                this.eventManager.broadcast( { name: 'structureEduListModification'} );
                Swal.fire({
                    icon: 'success',
                    title: 'Enregistrement effectué',
                    showConfirmButton: false,
                    timer: 1500
                  })
                this.administration = new Administration();
                this.step = 2;
        });
    }
    
    subscribeToSaveResponse(result: Observable<StructureEdu>) {
        result.subscribe((res: StructureEdu) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'structureEduListModification'} );
        this.ngOnInit();
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsStructureEdu(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editStructureEdu(id: number) { // , codeAdmin: number) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.c = params['c'];
        });
        
        this.structureEduService.find(id).subscribe( (structureEdu) => {
            this.structureEdu = structureEdu;
        });
        
        /*this.administrationService.find(codeAdmin).subscribe(data => {
            this.administration = data;
        })*/
    }
    
    edit() {
        this.structureEduService.update(this.structureEdu).subscribe(res => {
            this.onSaveSuccess(res);
            
            this.administration.codeStructureEdu = res.codeStructureEdu;
            // this.administrationService.update(this.administration).subscribe(res => {
                this.onSaveSuccess(res);
                Swal.fire({
                    icon: 'success',
                    title: 'Edition effectuée',
                    showConfirmButton: false,
                    timer: 1500
                  })
            // })
        });
    }
    
    /**************************** Suppression **************************/
    deleteStructureEdu(id: number) {
        this.structureEduService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'structureEduListModification'});
            this.ngOnInit();
        });
    }
    
    deleteCheck(id: number, event: any) {
        this.structureEduService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'structureEduListModification'});
            this.ngOnInit();
        });
    }

}
