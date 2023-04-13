import { Component, OnInit } from '@angular/core';
import { EmployeDemission } from './employe-demission.model';
import { Employe } from '../employe/employe.model';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from '../employe/employe.service';
import { EmployeDemissionService } from '../employe-demission/employe-demission.service';
import { EventManagerService } from '../event-manager.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-demission',
  templateUrl: './employe-demission.component.html',
  styleUrls: ['./employe-demission.component.css']
})
export class EmployeDemissionComponent implements OnInit {

    employeDemission: EmployeDemission = new EmployeDemission();
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    codeTypeSituation: number = 4;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
  constructor(
          private employeDemissionService: EmployeDemissionService,
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
          this.employeDemission.id.codeEmploye = atob(this.idT.toString()); //permet de décoder la valeur encodée
          this.id = +atob(this.dT.toString());
          this.loadEmp(this.id);
      } else {
          this.subscription = this.activatedRoute.params.subscribe((params) => {
              this.id = params['id'];
              this.employeDemissionService.findLast(this.id).subscribe(data => {
                  this.employeDemission = data;
              })
          });
      }
  }
  
  loadEmp(id) {
      this.employeService.find(id).subscribe((employe) => {
          this.employe = employe;
      });
  }
  
  load(empD: EmployeDemission) {
      this.employeDemissionService.find(empD).subscribe((employeDemission) => {
          this.employeDemission = employeDemission;
      });
  }
  
/**************************** Création **************************/
  
  createDemission() {
      this.mode = 2;
  }
  
  save() {
      this.employeDemission.id.codeEmploye = this.id.toString();
      this.subscribeToSaveResponse(this.employeDemissionService.create(this.employeDemission));
        
      
    //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
      this.employeSituation.id.codeEmploye = this.employeDemission.id.codeEmploye;
      this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
      this.employeSituation.id.dateDebutSituation = this.employeDemission.id.dateDemission;
      this.employeSituation.dateFinSituation = null;
      this.employeSituation.refSituation = this.employeDemission.refDemission;
      this.employeSituationService.create(this.employeSituation).subscribe(response => {
          this.eventManager.broadcast( { name: 'employeDemissionListModification'} );
      });
  }
  
  subscribeToSaveResponse(result: Observable<EmployeDemission>) {
      result.subscribe((res: EmployeDemission) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeDemissionListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
      this.mode = 1;
    }
  
  /**************************** Détails **************************/
  
  detailsDemission(id: number) {
      this.mode = 5;
  }
  
  /**************************** Edition **************************/
  
  editDemission(empD: EmployeDemission) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeDemissionService.find(empD).subscribe( (employeDemission) => {
          this.employeDemission = employeDemission;
      });
  }
  
  edit() {
      this.employeDemissionService.delete(this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employeDemissionsListModification'});
          
          this.employeDemission.id.codeEmploye = this.id.toString();
          this.employeDemissionService.create(this.employeDemission).subscribe(response =>{
              this.onSaveSuccess(response);
          })
      });
      
      this.employeSituationService.delete(this.id, this.d).subscribe(response => {
        
          //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
          this.employeSituation.id.codeEmploye = this.employeDemission.id.codeEmploye;
          this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
          this.employeSituation.id.dateDebutSituation = this.employeDemission.id.dateDemission;
          this.employeSituation.dateFinSituation = null;
          this.employeSituation.refSituation = this.employeDemission.refDemission;
          this.employeSituationService.create(this.employeSituation).subscribe(response => {
              this.eventManager.broadcast( { name: 'employeDemissionListModification'} );
          })
      });
      
  }
  
  /**************************** Suppression **************************/
  
  deleteCheck(empD: EmployeDemission, event: any) {
      this.employeDemissionService.delete(+empD.id.codeEmploye, empD.id.dateDemission).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeDemissionListModification'});
          this.ngOnInit();
      });
  }

}
