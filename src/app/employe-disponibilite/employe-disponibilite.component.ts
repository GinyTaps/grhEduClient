import { Component, OnInit } from '@angular/core';
import { EmployeDisponibilite } from './employe-disponibilite.model';
import { EmployeDisponibiliteService } from '../employe-disponibilite/employe-disponibilite.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { Employe } from '../employe/employe.model';
import { EmployeService } from '../employe/employe.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-disponibilite',
  templateUrl: './employe-disponibilite.component.html',
  styleUrls: ['./employe-disponibilite.component.css']
})
export class EmployeDisponibiliteComponent implements OnInit {
    
    employeDisponibilite: EmployeDisponibilite = new EmployeDisponibilite();
    subscription: Subscription;
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    id:number; idT: number = 0;
    d: string; dT: string = '';
    mode: number;
    codeTypeSituation: number = 6;
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeDisponibiliteService: EmployeDisponibiliteService,
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
              this.employeDisponibilite.id.codeEmploye = atob(this.idT.toString());
              this.id = +atob(this.idT.toString());
              this.d = atob(this.dT.toString());
              this.loadEmp(this.id);
              /*console.log(this.id);
              console.log(this.d);
              return console.log('Données codé en Base64');*/
          }
          else {
              this.subscription = this.activatedRoute.params.subscribe((params) => {
              this.id = params['id'];
              // this.d = this.dT;
              this.employeService.find(this.id).subscribe((employe) => {
                  this.employe = employe;
              });
              this.employeDisponibiliteService.findLast(this.id).subscribe(data => {
                  this.employeDisponibilite = data;
              });
              // console.log(this.id);
              // console.log(this.d);
              // return console.log('Données non codées');
              });
          }
          /*this.employeDisponibilite.id.codeEmploye = atob(params['id']);
          this.id = +atob(params['id']);
          this.d = atob(params['d']);
          this.loadEmp(this.id);*/
      // });
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
        this.load();
    }
    
    load() {
        this.employeDisponibiliteService.find(this.id, this.d).subscribe((employeDisponibilite) => {
            this.employeDisponibilite = employeDisponibilite;
        });
      }
    /*load(empD: EmployeDisponibilite) {
      this.employeDisponibiliteService.find(empD).subscribe((employeDisponibilite) => {
          this.employeDisponibilite = employeDisponibilite;
      });
    }*/
    
    /**************************** Création **************************/
    
    createDisponibilite() {
      this.mode = 2;
    }
    
    save() {
        this.employeDisponibilite.id.codeEmploye = this.id.toString();
        this.subscribeToSaveResponse(this.employeDisponibiliteService.create(this.employeDisponibilite));
        
      //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
        this.employeSituation.id.codeEmploye = this.employeDisponibilite.id.codeEmploye;
        this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
        this.employeSituation.id.dateDebutSituation = this.employeDisponibilite.id.dateDebutDisponibilite;
        this.employeSituation.dateFinSituation = this.employeDisponibilite.dateFinDisponibilite;
        this.employeSituation.refSituation = this.employeDisponibilite.refDebutDisponibilite;
        this.employeSituationService.create(this.employeSituation).subscribe(response => {
            this.eventManager.broadcast( { name: 'employeDisponibiliteListModification'} );
        })
    }
    
    subscribeToSaveResponse(result: Observable<EmployeDisponibilite>) {
      result.subscribe((res: EmployeDisponibilite) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeDisponibiliteListModification'} );
      this.ngOnInit();
    }
    
    close() {
      this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsDisponibilite(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editDisponibilite(empD: EmployeDisponibilite) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeDisponibiliteService.find(+empD.id.codeEmploye, empD.id.dateDebutDisponibilite).subscribe( (employeDisponibilite) => {
          this.employeDisponibilite = employeDisponibilite;
      });
    }
    
    edit() {
      this.employeDisponibiliteService.delete(this.id, this.d).subscribe( res => {
          this.eventManager.broadcast({name: 'employeDisponibiliteListModification'});
          
          this.employeSituationService.delete(this.id, this.d).subscribe(response => {
              this.onSaveSuccess(response);
          })
          
          this.employeDisponibilite.id.codeEmploye = this.id.toString();
          this.employeDisponibiliteService.create(this.employeDisponibilite).subscribe(data => {
              
            //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
              this.employeSituation.id.codeEmploye = data.id.codeEmploye;
              this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
              this.employeSituation.id.dateDebutSituation = data.id.dateDebutDisponibilite;
              this.employeSituation.dateFinSituation = data.dateFinDisponibilite;
              this.employeSituation.refSituation = data.refDebutDisponibilite;
              this.employeSituationService.create(this.employeSituation).subscribe(response => {
                  this.eventManager.broadcast( { name: 'employeDisponibiliteListModification'} );
              })
          });
      });
      
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empD: EmployeDisponibilite, event: any) {
      this.employeDisponibiliteService.delete(+empD.id.codeEmploye, empD.id.dateDebutDisponibilite).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeDisponibiliteListModification'});
          this.ngOnInit();
      });
    }

}
