import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { EmployeHandicap } from '../employe-handicap/employe-handicap.model';
import { EmployeHandicapService } from '../employe-handicap/employe-handicap.service';
import { TypeHandicap } from '../type-handicap/type-handicap.model';
import { TypeHandicapService } from '../type-handicap/type-handicap.service';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../employe/employe.model';

@Component({
  selector: 'app-employe-handicap',
  templateUrl: './employe-handicap.component.html',
  styleUrls: ['./employe-handicap.component.css']
})
export class EmployeHandicapComponent implements OnInit {

    employeHandicap: EmployeHandicap = new EmployeHandicap();
    employe: Employe;
    typeHandicaps: TypeHandicap;
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeHandicapService: EmployeHandicapService,
          private employeService: EmployeService,
          private typeHandicapService: TypeHandicapService,
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
            this.employeHandicap.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employeHandicapService.findLast(this.id).subscribe(data => {
                    this.employeHandicap = data;
                })
            });
            
        }
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe(data => {
            this.employe = data;
        });
        
        this.typeHandicapService.getAll().subscribe(data => {
            this.typeHandicaps = data;
        });
    }
    
    load(empH: EmployeHandicap) {
      this.employeHandicapService.find(empH).subscribe((employeHandicap) => {
          this.employeHandicap = employeHandicap;
      });
    }
    
    /**************************** Création **************************/
    
    createHandicap() {
      this.mode = 2;
    }
    
    save() {
        this.employeHandicap.id.codeEmploye = this.id.toString();
      this.subscribeToSaveResponse(this.employeHandicapService.create(this.employeHandicap));
    }
    
    subscribeToSaveResponse(result: Observable<EmployeHandicap>) {
      result.subscribe((res: EmployeHandicap) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeHandicapListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
        this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    /**************************** Détails **************************/
    
    detailsHandicap(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editHandicap(empH: EmployeHandicap) {
      this.mode = 3;
      this.employeHandicapService.find(empH).subscribe( (employeHandicap) => {
          this.employeHandicap = employeHandicap;
      });
    }
    
    edit() {
      this.employeHandicapService.delete(this.id, this.d).subscribe( res => {
          this.eventManager.broadcast({name: 'employeHandicapListModification'});
      });
      this.employeHandicap.id.codeEmploye = this.id.toString();
      this.employeHandicap.id.dateEmployeHandicap = this.d;
      this.subscribeToSaveResponse(this.employeHandicapService.create(this.employeHandicap));
    }
    
    /**************************** Suppression **************************/
    
    deleteHandicap(empH: EmployeHandicap) { 
      this.employeHandicapService.delete(+empH.id.codeEmploye, empH.id.dateEmployeHandicap).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeHandicapListModification'});
          this.ngOnInit();
      });
    }

}
