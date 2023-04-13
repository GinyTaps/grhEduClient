import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-situation',
  templateUrl: './employe-situation.component.html',
  styleUrls: ['./employe-situation.component.css']
})
export class EmployeSituationComponent implements OnInit {

    employeSituation: EmployeSituation = new EmployeSituation();
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    
    // typeMotifSituations: TypeMotifSituation;
    
    constructor(
          private employeSituationService: EmployeSituationService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          // private typeMotifSituationService: TypeMotifSituationService,
          ) { }
    
    ngOnInit() {
      this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
          this.employeSituation.id.codeEmploye = params['id'];
          this.id = +atob(params['id']);
          this.d = atob(params['d']);
          this.employeSituation.id.codeEmploye = this.id.toString();
          this.employeSituation.id.dateDebutSituation = this.d;
          this.load(this.employeSituation);
      });
      
      /*this.typeMotifSituationService.query()
      .subscribe(( res: ResponseWrapper ) => {
          this.typeMotifSituations = res.json; }, ( res: ResponseWrapper ) => this.onError( res.json ));*/
    }
    
    load(empS: EmployeSituation) {
        this.employeSituationService.find(empS).subscribe((employeSituation) => {
        this.employeSituation = employeSituation;
        });
    }
    
    /**************************** Création **************************/
    
    createSituation() {
        this.mode = 2;
    }
    
    save() {
        this.subscribeToSaveResponse(this.employeSituationService.create(this.employeSituation));
    }
    
    subscribeToSaveResponse(result: Observable<EmployeSituation>) {
        result.subscribe((res: EmployeSituation) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeSituationListModification'} );
        this.ngOnInit();
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsSituation(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editSituation(empS: EmployeSituation) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.d = params['d'];
        });
        this.employeSituationService.find(empS).subscribe( (employeSituation) => {
            this.employeSituation = employeSituation;
        });
    }
    
    edit() {
        this.employeSituationService.delete(this.id, this.d).subscribe( (response) => {
            this.eventManager.broadcast({name: 'employeSituationListModification'});
        });
        this.employeSituation.id.codeEmploye = this.id.toString();
        this.employeSituation.id.dateDebutSituation = this.d;
        this.subscribeToSaveResponse(this.employeSituationService.create(this.employeSituation));
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empS: EmployeSituation, event: any) {
        this.employeSituationService.delete(+empS.id.codeEmploye, empS.id.dateDebutSituation).subscribe((response) => {
            this.eventManager.broadcast({name: 'employeSituationListModification'});
            this.ngOnInit();
        });
    }

}
