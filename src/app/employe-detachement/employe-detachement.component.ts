import { Component, OnInit } from '@angular/core';
import { EmployeDetachement } from './employe-detachement.model';
import { Employe } from '../employe/employe.model';
import { Subscription, Observable } from 'rxjs';
import { EmployeService } from '../employe/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeDetachementService } from '../employe-detachement/employe-detachement.service';
import { EventManagerService } from '../event-manager.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-detachement',
  templateUrl: './employe-detachement.component.html',
  styleUrls: ['./employe-detachement.component.css']
})
export class EmployeDetachementComponent implements OnInit {
    
    employeDetachement: EmployeDetachement = new EmployeDetachement();
    subscription: Subscription;
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    employeSituationT: EmployeSituation = new EmployeSituation();
    id:number;
    d: string;
    mode: number;
    codeTypeSituation: number = 5;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeDetachementService: EmployeDetachementService,
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
          this.employeDetachement.id.codeEmploye = atob(this.idT.toString());
          this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
          this.d = atob(this.dT.toString());
          this.loadEmp(this.id);
      } else {
          this.subscription = this.activatedRoute.params.subscribe((params) => {
              this.id = params['id'];
              this.loadEmp(this.id);
              this.employeDetachementService.findLast(this.id).subscribe(data => {
                  this.employeDetachement = data;
              })
          });
          
      }
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empD: EmployeDetachement) {
      this.employeDetachementService.find(empD).subscribe((employeDetachement) => {
          this.employeDetachement = employeDetachement;
      });
    }
    
    /**************************** Création **************************/
    
    createDetachement() {
      this.mode = 2;
    }
    
    save() {
        this.employeDetachement.id.codeEmploye = this.id.toString();
        this.subscribeToSaveResponse(this.employeDetachementService.create(this.employeDetachement));
        
      //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
        this.employeSituation.id.codeEmploye = this.employeDetachement.id.codeEmploye;
        this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
        this.employeSituation.id.dateDebutSituation = this.employeDetachement.id.dateDebutDetachement;
        this.employeSituation.dateFinSituation = this.employeDetachement.dateFinDetachement;
        this.employeSituation.refSituation = this.employeDetachement.refDetachement;
        this.employeSituationService.create(this.employeSituation).subscribe(response => {
            this.eventManager.broadcast( { name: 'employeDetachementListModification'} );
        });
    }
    
    subscribeToSaveResponse(result: Observable<EmployeDetachement>) {
      result.subscribe((res: EmployeDetachement) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeDetachementListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
      this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsDetachement(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editDetachement(empD: EmployeDetachement) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeDetachementService.find(empD).subscribe( (employeDetachement) => {
          this.employeDetachement = employeDetachement;
      });
    }
    
    edit() {
        
      this.employeDetachementService.delete(this.id, this.d).subscribe( res => {
          this.eventManager.broadcast({name: 'employeDetachementListModification'});
          
          this.employeDetachement.id.codeEmploye = this.id.toString();
          this.employeDetachementService.create(this.employeDetachement).subscribe(response => {
              this.onSaveSuccess(response);
          })
      });
      
      this.employeSituationService.delete(this.id, this.d).subscribe(response => {
        
          //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
          this.employeSituation.id.codeEmploye = this.employeDetachement.id.codeEmploye;
          this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
          this.employeSituation.id.dateDebutSituation = this.employeDetachement.id.dateDebutDetachement;
          this.employeSituation.dateFinSituation = this.employeDetachement.dateFinDetachement;
          this.employeSituation.refSituation = this.employeDetachement.refDetachement;
          this.employeSituationService.create(this.employeSituation).subscribe(response => {
              this.eventManager.broadcast( { name: 'employeDetachementListModification'} );
          })
      })
      
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empD: EmployeDetachement, event: any) {
      this.employeDetachementService.delete(+empD.id.codeEmploye, empD.id.dateDebutDetachement).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeDetachementListModification'});
          this.ngOnInit();
      });
    }

}
