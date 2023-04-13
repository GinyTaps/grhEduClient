import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployePathologie } from '../employe-pathologie/employe-pathologie.model';
import { EmployePathologieService } from '../employe-pathologie/employe-pathologie.service';
import { TypePathologie } from '../type-pathologie/type-pathologie.model';
import { TypePathologieService } from '../type-pathologie/type-pathologie.service';
import { Employe } from '../employe/employe.model';
import { EmployeService } from '../employe/employe.service';

@Component({
  selector: 'app-employe-pathologie',
  templateUrl: './employe-pathologie.component.html',
  styleUrls: ['./employe-pathologie.component.css']
})
export class EmployePathologieComponent implements OnInit {

    employePathologie: EmployePathologie = new EmployePathologie();
    employe: Employe;
    typePathologies: TypePathologie;
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employePathologieService: EmployePathologieService,
          private employeService: EmployeService,
          private typePathologieService: TypePathologieService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          ) { }
    
    ngOnInit() {
        this.mode = 1;
        this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
            if((params['id']) && (params['d']) ) {
                this.idT = params['id'];
                this.dT = params['d'];
            }
        }); 
        if(this.base64regex.test(this.idT.toString())) {
            this.employePathologie.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.employePathologieService.findLast(this.id).subscribe(data => {
                    this.employePathologie = data;
                })
            });
            
        }
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe(data => {
            this.employe = data;
        });
        
        this.typePathologieService.getAll().subscribe(data => {
            this.typePathologies = data;
        });
    }
    
    load(empP: EmployePathologie) {
      this.employePathologieService.find(empP).subscribe((employePathologie) => {
          this.employePathologie = employePathologie;
      });
    }
    
    /**************************** Création **************************/
    
    createPathologie() {
      this.mode = 2;
    }
    
    save() {
        this.employePathologie.id.codeEmploye = this.id.toString();
      this.subscribeToSaveResponse(this.employePathologieService.create(this.employePathologie));
    }
    
    subscribeToSaveResponse(result: Observable<EmployePathologie>) {
      result.subscribe((res: EmployePathologie) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employePathologieListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
        this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    /**************************** Détails **************************/
    
    detailsPathologie(id) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editPathologie(empP: EmployePathologie) {
      this.mode = 3;
      /*this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });*/
      this.employePathologieService.find(empP).subscribe( (employePathologie) => {
          this.employePathologie = employePathologie;
      });
    }
    
    edit() {
        
      this.employePathologieService.delete(this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employePathologieListModification'});
          
          this.employePathologie.id.codeEmploye = this.id.toString();
          this.subscribeToSaveResponse(this.employePathologieService.create(this.employePathologie));
      });
      
    }
    
    /**************************** Suppression **************************/
    
    deletePathologie(empP: EmployePathologie) { 
      this.employePathologieService.delete(+empP.id.codeEmploye, empP.id.dateEmployePathologie).subscribe((response) => {
          this.eventManager.broadcast({name: 'employePathologieListModification'});
          this.ngOnInit();
      });
    }

}
