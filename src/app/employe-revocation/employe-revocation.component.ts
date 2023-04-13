import { Component, OnInit } from '@angular/core';
import { EmployeRevocation } from './employe-revocation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../employe/employe.model';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { EmployeRevocationService } from '../employe-revocation/employe-revocation.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-revocation',
  templateUrl: './employe-revocation.component.html',
  styleUrls: ['./employe-revocation.component.css']
})
export class EmployeRevocationComponent implements OnInit {

    employeRevocation: EmployeRevocation = new EmployeRevocation();
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    codeTypeSituation: number = 10;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeRevocationService: EmployeRevocationService,
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
            this.employeRevocation.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employeRevocationService.findLast(this.id).subscribe(data => {
                    this.employeRevocation = data;
                })
            });  
        }
      /*this.typeMotifRevocationService.query()
      .subscribe(( res: ResponseWrapper ) => {
          this.typeMotifRevocations = res.json; }, ( res: ResponseWrapper ) => this.onError( res.json ));*/
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empR: EmployeRevocation) {
        this.employeRevocationService.find(empR).subscribe((employeRevocation) => {
        this.employeRevocation = employeRevocation;
        });
    }
    
    /**************************** Création **************************/
    
    createRevocation() {
        this.mode = 2;
    }
    
    save() {
        this.employeRevocation.id.codeEmploye = this.id.toString();
        this.employeRevocationService.create(this.employeRevocation).subscribe(data => {
            
          //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
            this.employeSituation.id.codeEmploye = data.id.codeEmploye;
            this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
            this.employeSituation.id.dateDebutSituation = data.id.dateRevocation
            this.employeSituation.dateFinSituation = null;
            this.employeSituation.refSituation = data.refRevocation;
            this.employeSituationService.create(this.employeSituation).subscribe(response => {
                this.onSaveSuccess(response);
            })
        });
    }
    
    subscribeToSaveResponse(result: Observable<EmployeRevocation>) {
        result.subscribe((res: EmployeRevocation) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeRevocationListModification'} );
        this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsRevocation(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editRevocation(empR: EmployeRevocation) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.d = params['d'];
        });
        this.employeRevocationService.find(empR).subscribe( (employeRevocation) => {
            this.employeRevocation = employeRevocation;
        });
    }
    
    edit() {
        this.employeRevocationService.delete(this.id, this.d).subscribe( res => {
            this.eventManager.broadcast({name: 'employeRevocationListModification'});
            
            this.employeRevocationService.delete(this.id, this.d).subscribe(response => {
                this.onSaveSuccess(response);
            })
            
            this.employeRevocation.id.codeEmploye = this.id.toString();
            this.employeRevocationService.create(this.employeRevocation).subscribe(data => {
                
              //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
                this.employeSituation.id.codeEmploye = data.id.codeEmploye;
                this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
                this.employeSituation.id.dateDebutSituation = data.id.dateRevocation
                this.employeSituation.dateFinSituation = null;
                this.employeSituation.refSituation = data.refRevocation;
                this.employeSituationService.create(this.employeSituation).subscribe(response => {
                    this.onSaveSuccess(response);
                })
            });
        });
        
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empR: EmployeRevocation, event: any) {
        this.employeRevocationService.delete(+empR.id.codeEmploye, empR.id.dateRevocation).subscribe(res => {
            this.eventManager.broadcast({name: 'employeRevocationListModification'});
            
            // pour supprimer dans la table situation gérant l'historique de l'employé
            this.employeRevocationService.delete(+res.id.codeEmploye, res.id.dateRevocation).subscribe(response => {
                this.onSaveSuccess(response);
            })
            this.ngOnInit();
        });
    }

}
