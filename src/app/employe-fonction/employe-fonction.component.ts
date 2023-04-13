import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { EmployeFonction } from './employe-fonction.model';
import { EmployeFonctionService } from './employe-fonction.service';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../employe/employe.model';

@Component({
  selector: 'app-employe-fonction',
  templateUrl: './employe-fonction.component.html',
  styleUrls: ['./employe-fonction.component.css']
})
export class EmployeFonctionComponent implements OnInit {

    employeFonction: EmployeFonction;
    employe: Employe;
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    constructor(
          private employeFonctionService: EmployeFonctionService,
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
            this.employeFonction.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employeFonctionService.findLast(this.id).subscribe(data => {
                    this.employeFonction = data;
                })
            });
            
        }
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empF: EmployeFonction) {
      this.employeFonctionService.find(empF).subscribe((employeFonction) => {
          this.employeFonction = employeFonction;
      });
    }
    
    /**************************** Création **************************/
    
    createFonction() {
      this.mode = 2;
    }
    
    save() {
      this.subscribeToSaveResponse(this.employeFonctionService.create(this.employeFonction));
    }
    
    subscribeToSaveResponse(result: Observable<EmployeFonction>) {
      result.subscribe((res: EmployeFonction) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeFonctionListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
      this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsFonction(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editFonction(empF: EmployeFonction) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeFonctionService.find(empF).subscribe( (employeFonction) => {
          this.employeFonction = employeFonction;
      });
    }
    
    edit() {
      this.employeFonctionService.delete(this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employeFonctionListModification'});
      });
      this.employeFonction.id.codeEmploye = this.id.toString();
      this.employeFonction.id.dateEmployeFonction = this.d;
      this.subscribeToSaveResponse(this.employeFonctionService.create(this.employeFonction));
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empF: EmployeFonction, event: any) {
      this.employeFonctionService.delete(+empF.id.codeEmploye, empF.id.dateEmployeFonction).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeFonctionListModification'});
          this.ngOnInit();
      });
    }

}
