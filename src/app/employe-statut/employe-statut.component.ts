import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { EmployeStatut } from '../employe-statut/employe-statut.model';
import { EmployeStatutService } from '../employe-statut/employe-statut.service';
import { Employe } from '../employe/employe.model';
import { EmployeService } from '../employe/employe.service';

@Component({
  selector: 'app-employe-statut',
  templateUrl: './employe-statut.component.html',
  styleUrls: ['./employe-statut.component.css']
})
export class EmployeStatutComponent implements OnInit {

    employeStatut: EmployeStatut = new EmployeStatut();
    employe: Employe;
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    // typeMotifStatuts: TypeMotifStatut;
    
    constructor(
          private employeStatutService: EmployeStatutService,
          private employeService: EmployeService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          // private typeMotifStatutService: TypeMotifStatutService,
          ) { }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
            if((params['id']) && (params['d']) ) {
                this.idT = params['id'];
                this.dT = params['d'];
            }
        }); 
        if(this.base64regex.test(this.idT.toString())) {
            this.employeStatut.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employeStatutService.findLast(this.id).subscribe(data => {
                    this.employeStatut = data;
                })
            });  
        }
      
      /*this.typeMotifStatutService.query()
      .subscribe(( res: ResponseWrapper ) => {
          this.typeMotifStatuts = res.json; }, ( res: ResponseWrapper ) => this.onError( res.json ));*/
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empS: EmployeStatut) {
        this.employeStatutService.find(+empS.id.codeEmploye, empS.id.dateEmployeStatut).subscribe((employeStatut) => {
        this.employeStatut = employeStatut;
        });
    }
    
    /**************************** Création **************************/
    
    createStatut() {
        this.mode = 2;
    }
    
    save() {
        this.subscribeToSaveResponse(this.employeStatutService.create(this.employeStatut));
    }
    
    subscribeToSaveResponse(result: Observable<EmployeStatut>) {
        result.subscribe((res: EmployeStatut) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeStatutListModification'} );
        this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsStatut(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editStatut(empS: EmployeStatut) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.d = params['d'];
        });
        this.employeStatutService.find(+empS.id.codeEmploye, empS.id.dateEmployeStatut).subscribe( (employeStatut) => {
            this.employeStatut = employeStatut;
        });
    }
    
    edit() {
        this.employeStatutService.delete(this.id, this.d).subscribe( (response) => {
            this.eventManager.broadcast({name: 'employeStatutListModification'});
        });
        this.employeStatut.id.codeEmploye = this.id.toString();
        this.subscribeToSaveResponse(this.employeStatutService.create(this.employeStatut));
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empS: EmployeStatut, event: any) {
        this.employeStatutService.delete(+empS.id.codeEmploye, empS.id.dateEmployeStatut).subscribe((response) => {
            this.eventManager.broadcast({name: 'employeStatutListModification'});
            this.ngOnInit();
        });
    }

}
