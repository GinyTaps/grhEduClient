import { Component, OnInit } from '@angular/core';
import { EmployeRetraite } from './employe-retraite.model';
import { Employe } from '../employe/employe.model';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { EmployeService } from '../employe/employe.service';
import { EmployeRetraiteService } from '../employe-retraite/employe-retraite.service';
import { TypeMotifRetraite } from '../type-motif-retraite/type-motif-retraite.model';
import { TypeMotifRetraiteService } from '../type-motif-retraite/type-motif-retraite.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-retraite',
  templateUrl: './employe-retraite.component.html',
  styleUrls: ['./employe-retraite.component.css']
})
export class EmployeRetraiteComponent implements OnInit {

    employeRetraite: EmployeRetraite = new EmployeRetraite();
    typeMotifRetraites: TypeMotifRetraite;
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    codeTypeSituation: number = 8;
    p: boolean;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeRetraiteService: EmployeRetraiteService,
          private typeMotifRetraiteService: TypeMotifRetraiteService,
          private employeService: EmployeService,
          private employeSituationService: EmployeSituationService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          
          ) { }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
            if((params['id']) && (params['d']) ) {
                this.idT = params['id'];
                this.dT = params['d'];
            }
        }); 
        if(this.base64regex.test(this.idT.toString())) {
            this.employeRetraite.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employeRetraiteService.findLast(this.id).subscribe(data => {
                    this.employeRetraite = data;
                })
            });  
        }
      this.typeMotifRetraiteService.getAll().subscribe(( data ) => {
          this.typeMotifRetraites = data; 
          });
      this.load(this.id);
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(id: number) {
        let empR = new EmployeRetraite();
        empR.id.codeEmploye = id.toString();
        this.employeRetraiteService.find(empR).subscribe(data => {
        this.employeRetraite = data;
        });
        if(this.employeRetraite) {
            this.p = true;
        }
        else {
            this.p = false;
        }
    }
    
    /**************************** Création **************************/
    
    createRetraite() {
        this.mode = 2;
    }
    
    save() {
        this.employeRetraite.id.codeEmploye = this.id.toString();
        this.subscribeToSaveResponse(this.employeRetraiteService.create(this.employeRetraite));
        
      //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
        this.employeSituation.id.codeEmploye = this.employeRetraite.id.codeEmploye;
        this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
        this.employeSituation.id.dateDebutSituation = this.employeRetraite.id.dateRetraite
        this.employeSituation.dateFinSituation = null;
        this.employeSituation.refSituation = this.employeRetraite.refRetraite;
        this.employeSituationService.create(this.employeSituation).subscribe(response => {
            this.eventManager.broadcast( { name: 'employeRetraiteListModification'} );
        });
    }
    
    subscribeToSaveResponse(result: Observable<EmployeRetraite>) {
        result.subscribe((res: EmployeRetraite) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeRetraiteListModification'} );
        this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsRetraite(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editRetraite(empR: EmployeRetraite) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.d = params['d'];
        });
        this.employeRetraiteService.find(empR).subscribe( (employeRetraite) => {
            this.employeRetraite = employeRetraite;
        });
    }
    
    edit() {
        this.employeRetraiteService.delete(this.id, this.d).subscribe( (response) => {
            this.eventManager.broadcast({name: 'employeRetraiteListModification'});
            
            this.employeRetraite.id.codeEmploye = this.id.toString();
            this.employeRetraiteService.create(this.employeRetraite).subscribe(data => {

                this.onSaveSuccess(response);
            })
        });
        
        this.employeSituationService.delete(this.id, this.d).subscribe(response => {
          //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
            this.employeSituation.id.codeEmploye = this.employeRetraite.id.codeEmploye;
            this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
            this.employeSituation.id.dateDebutSituation = this.employeRetraite.id.dateRetraite
            this.employeSituation.dateFinSituation = null;
            this.employeSituation.refSituation = this.employeRetraite.refRetraite;
            this.employeSituationService.create(this.employeSituation).subscribe(response => {
                this.eventManager.broadcast({name: 'employeRetraiteListModification'});
            })
        });
        
        
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empR: EmployeRetraite, event: any) {
        this.employeRetraiteService.delete(+empR.id.codeEmploye, empR.id.dateRetraite).subscribe((response) => {
            this.eventManager.broadcast({name: 'employeRetraiteListModification'});
            this.ngOnInit();
        });
    }

}
