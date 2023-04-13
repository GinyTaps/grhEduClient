import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { EmployeEtatCivil } from '../employe-etat-civil/employe-etat-civil.model';
import { EmployeEtatCivilService } from '../employe-etat-civil/employe-etat-civil.service';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../employe/employe.model';

@Component({
  selector: 'app-employe-etat-civil',
  templateUrl: './employe-etat-civil.component.html',
  styleUrls: ['./employe-etat-civil.component.css']
})
export class EmployeEtatCivilComponent implements OnInit {
    
    employeEtatCivil: EmployeEtatCivil;
    employe: Employe;
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeEtatCivilService: EmployeEtatCivilService,
          private employeService: EmployeService,
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
            this.employeEtatCivil.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employeEtatCivilService.findLast(this.id).subscribe(data => {
                    this.employeEtatCivil = data;
                })
            });
            
        }
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empE: EmployeEtatCivil) {
      this.employeEtatCivilService.find(empE).subscribe((employeEtatCivil) => {
          this.employeEtatCivil = employeEtatCivil;
      });
    }
    
    /**************************** Création **************************/
    
    createEtatCivil() {
      this.mode = 2;
    }
    
    save() {
      this.subscribeToSaveResponse(this.employeEtatCivilService.create(this.employeEtatCivil));
    }
    
    subscribeToSaveResponse(result: Observable<EmployeEtatCivil>) {
      result.subscribe((res: EmployeEtatCivil) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeEtatCivilListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
      this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsEtatCivil(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editEtatCivil(empE: EmployeEtatCivil) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeEtatCivilService.find(empE).subscribe( (employeEtatCivil) => {
          this.employeEtatCivil = employeEtatCivil;
      });
    }
    
    edit() {
      this.employeEtatCivilService.delete(this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employeEtatCivilListModification'});
      });
      this.employeEtatCivil.id.codeEmploye = this.id.toString();
      this.employeEtatCivil.id.dateEmployeEtatCivil = this.d;
      this.subscribeToSaveResponse(this.employeEtatCivilService.create(this.employeEtatCivil));
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empE: EmployeEtatCivil, event: any) {
      this.employeEtatCivilService.delete(+empE.id.codeEmploye, empE.id.dateEmployeEtatCivil).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeEtatCivilListModification'});
          this.ngOnInit();
      });
    }

}
