import { Component, OnInit } from '@angular/core';
import { EmployeMutation } from './employe-mutation.model';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeMutationService } from '../employe-mutation/employe-mutation.service';
import { Employe } from '../employe/employe.model';
import { EmployeService } from '../employe/employe.service';
import { Administration } from '../administration/administration.model';
import { Etablissement } from '../etablissement/etablissement.model';
import { AdministrationService } from '../administration/administration.service';
import { EtablissementService } from '../etablissement/etablissement.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-mutation',
  templateUrl: './employe-mutation.component.html',
  styleUrls: ['./employe-mutation.component.css']
})
export class EmployeMutationComponent implements OnInit {

    employeMutation: EmployeMutation = new EmployeMutation();
    subscription: Subscription;
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    administration: Administration = new Administration();
    etablissement: Etablissement = new Etablissement();
    id:number;
    d: string;
    mode: number;
    codeTypeSituation: number = 7;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeMutationService: EmployeMutationService,
          private employeService: EmployeService,
          private employeSituationService: EmployeSituationService,
          private eventManager: EventManagerService,
          private administrationService: AdministrationService,
          private etablissementService: EtablissementService,
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
            this.employeMutation.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employeMutationService.findLast(this.id).subscribe(data => {
                    this.employeMutation = data;
                })
            });
            
        }
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empM: EmployeMutation) {
      this.employeMutationService.find(empM).subscribe((employeMutation) => {
          this.employeMutation = employeMutation;
      });
    }
    
    /**************************** Création **************************/
    
    createMutation() {
      this.mode = 2;
    }
    
    save() {
        this.employeMutation.id.codeEmploye = this.id.toString();
        this.subscribeToSaveResponse(this.employeMutationService.create(this.employeMutation));
        
      //permet d'enregistrer dans la table situation pour gérer l'historique de l'employé
        this.employeSituation.id.codeEmploye = this.employeMutation.id.codeEmploye;
        this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
        this.employeSituation.id.dateDebutSituation = this.employeMutation.id.dateMutation;
        this.employeSituation.dateFinSituation = null;
        this.employeSituation.refSituation = this.employeMutation.refMutation;
        this.employeSituationService.create(this.employeSituation).subscribe(response => {
            this.eventManager.broadcast( { name: 'employeMutationListModification'} );
        })
    }
    
    subscribeToSaveResponse(result: Observable<EmployeMutation>) {
      result.subscribe((res: EmployeMutation) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeMutationListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
      this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsMutation(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editMutation(empM: EmployeMutation) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeMutationService.find(empM).subscribe( (employeMutation) => {
          this.employeMutation = employeMutation;
      });
    }
    
    edit() {
      this.employeMutationService.delete(this.id, this.d).subscribe(res => {
          this.eventManager.broadcast({name: 'employeMutationListModification'});
          
          this.employeMutation.id.codeEmploye = this.id.toString();
          this.employeMutationService.create(this.employeMutation).subscribe(res => {
              this.onSaveSuccess(res);
          })
      });
      
      this.employeSituationService.delete(this.id, this.d).subscribe(response => {
        //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
          this.employeSituation.id.codeEmploye = this.employeMutation.id.codeEmploye;
          this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
          this.employeSituation.id.dateDebutSituation = this.employeMutation.id.dateMutation;
          this.employeSituation.dateFinSituation = null;
          this.employeSituation.refSituation = this.employeMutation.refMutation;
          this.employeSituationService.create(this.employeSituation).subscribe(response => {
              this.eventManager.broadcast({name: 'employeMutationListModification'});
          })
      });   
      
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empM: EmployeMutation, event: any) {
      this.employeMutationService.delete(+empM.id.codeEmploye, empM.id.dateMutation).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeMutationListModification'});
          this.ngOnInit();
      });
    }

}
