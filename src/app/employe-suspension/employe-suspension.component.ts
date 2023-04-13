import { Component, OnInit } from '@angular/core';
import { Employe } from '../employe/employe.model';
import { EmployeSuspension } from './employe-suspension.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { EmployeService } from '../employe/employe.service';
import { EmployeSuspensionService } from '../employe-suspension/employe-suspension.service';
import { TypeMotifSuspensionService } from '../type-motif-suspension/type-motif-suspension.service';
import { TypeMotifSuspension } from '../type-motif-suspension/type-motif-suspension.model';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-suspension',
  templateUrl: './employe-suspension.component.html',
  styleUrls: ['./employe-suspension.component.css']
})
export class EmployeSuspensionComponent implements OnInit {

    employeSuspension: EmployeSuspension = new EmployeSuspension();
    subscription: Subscription;
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    typeMotifSuspensions: TypeMotifSuspension;
    id:number;
    d: string;
    mode: number;
    codeTypeSituation: number = 11;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    
    constructor(
          private employeSuspensionService: EmployeSuspensionService,
          private eventManager: EventManagerService,
          private employeService: EmployeService,
          private employeSituationService: EmployeSituationService,
          private typeMotifSuspensionService: TypeMotifSuspensionService,
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
            this.employeSuspension.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employeSuspensionService.findLast(this.id).subscribe(data => {
                    this.employeSuspension = data;
                })
            });  
        }
      
      this.typeMotifSuspensionService.getAll().subscribe((data ) => {
          this.typeMotifSuspensions = data; 
          });
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empS: EmployeSuspension) {
        this.employeSuspensionService.find(empS).subscribe((employeSuspension) => {
        this.employeSuspension = employeSuspension;
        });
    }
    
    /**************************** Création **************************/
    
    createSuspension() {
        this.mode = 2;
    }
    
    save() {
        // this.subscribeToSaveResponse(this.employeSuspensionService.create(this.employeSuspension));
        this.subscribeToSaveResponse(this.employeSuspensionService.create(this.employeSuspension));
        
        //permet d'enregistrer dans la table situation pour gérer l'historique de l'employé
        this.employeSituation.id.codeEmploye = this.employeSuspension.id.codeEmploye;
        this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
        this.employeSituation.id.dateDebutSituation = this.employeSuspension.id.dateDebutSuspension;
        this.employeSituation.dateFinSituation = this.employeSuspension.dateFinSuspension;
        this.employeSituation.refSituation = this.employeSuspension.refDebutSuspension;
        this.employeSituationService.create(this.employeSituation).subscribe(response => {
            this.eventManager.broadcast( { name: 'employeSuspensionListModification'} );
        });
    }
    
    subscribeToSaveResponse(result: Observable<EmployeSuspension>) {
        result.subscribe((res: EmployeSuspension) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeSuspensionListModification'} );
        this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsSuspension(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editSuspension(empS: EmployeSuspension) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.d = params['d'];
        });
        this.employeSuspensionService.find(empS).subscribe( (employeSuspension) => {
            this.employeSuspension = employeSuspension;
        });
    }
    
    edit() {
        this.employeSuspensionService.delete(this.id, this.d).subscribe( res => {
            this.eventManager.broadcast({name: 'employeSuspensionListModification'});
            
            this.employeSuspension.id.codeEmploye = this.id.toString();
            // this.subscribeToSaveResponse(this.employeSuspensionService.create(this.employeSuspension));
            this.employeSuspensionService.create(this.employeSuspension).subscribe(response => {
                this.onSaveSuccess(response);
            })
      });
        
        this.employeSituationService.delete(this.id, this.d).subscribe(response => {
          //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
            this.employeSituation.id.codeEmploye = this.employeSuspension.id.codeEmploye;
            this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
            this.employeSituation.id.dateDebutSituation = this.employeSuspension.id.dateDebutSuspension;
            this.employeSituation.dateFinSituation = this.employeSuspension.dateFinSuspension;
            this.employeSituation.refSituation = this.employeSuspension.refDebutSuspension;
            this.employeSituationService.create(this.employeSituation).subscribe(response => {
                this.onSaveSuccess(response);
            })
        });
        
        
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empS: EmployeSuspension, event: any) {
        this.employeSuspensionService.delete(+empS.id.codeEmploye, empS.id.dateDebutSuspension).subscribe((response) => {
            this.eventManager.broadcast({name: 'employeSuspensionListModification'});
            this.ngOnInit();
        });
    }

}
