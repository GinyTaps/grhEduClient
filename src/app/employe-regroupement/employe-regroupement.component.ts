import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EmployeService } from '../employe/employe.service';
import { EventManagerService } from '../event-manager.service';
import { EmployeRegroupement } from './employe-regroupement.model';
import { EmployeRegroupementService } from './employe-regroupement.service';
import { Employe } from '../employe/employe.model';

@Component({
  selector: 'app-employe-regroupement',
  templateUrl: './employe-regroupement.component.html',
  styleUrls: ['./employe-regroupement.component.css']
})
export class EmployeRegroupementComponent implements OnInit {

    employeRegroupement: EmployeRegroupement = new EmployeRegroupement();
    employe: Employe;
    // regroupement: Regroupement;
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeRegroupementService: EmployeRegroupementService,
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
          this.employeRegroupement.id.codeEmploye = atob(this.idT.toString());
          this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
          this.d = atob(this.dT.toString());
          this.loadEmp(this.id);
      } else {
          this.subscription = this.activatedRoute.params.subscribe((params) => {
              this.id = params['id'];
              this.loadEmp(this.id);
              this.employeRegroupementService.findLast(this.id).subscribe(data => {
                  this.employeRegroupement = data;
              })
          });
          
      }
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe(data => {
            this.employe = data;
        });
    }
    
    load(empR: EmployeRegroupement) {
      this.employeRegroupementService.find(empR).subscribe((employeRegroupement) => {
          this.employeRegroupement = employeRegroupement;
      });
    }
    
    /**************************** Création **************************/
    
    createRegroupement() {
      this.mode = 2;
    }
    
    save() {
      this.subscribeToSaveResponse(this.employeRegroupementService.create(this.employeRegroupement));
    }
    
    subscribeToSaveResponse(result: Observable<EmployeRegroupement>) {
      result.subscribe((res: EmployeRegroupement) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeRegroupementListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
      this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsRegroupement(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editRegroupement(empR: EmployeRegroupement) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeRegroupementService.find(empR).subscribe( (employeRegroupement) => {
          this.employeRegroupement = employeRegroupement;
      });
    }
    
    edit() {
      this.employeRegroupementService.delete(this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employeRegroupementListModification'});
          
          this.employeRegroupement.id.codeEmploye = this.id.toString();
          this.subscribeToSaveResponse(this.employeRegroupementService.create(this.employeRegroupement));
      });
      
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empR: EmployeRegroupement, event: any) {
      this.employeRegroupementService.delete(+empR.id.codeEmploye, empR.id.dateEmployeRegroupement).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeRegroupementListModification'});
          this.ngOnInit();
      });
    }

}
