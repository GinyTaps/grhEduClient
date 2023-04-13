import { Component, OnInit } from '@angular/core';
import { EmployeDiplomeService } from '../employe-diplome/employe-diplome.service';
import { EventManagerService } from '../event-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EmployeDiplome } from '../employe-diplome/employe-diplome.model';

@Component({
  selector: 'app-employe-diplome',
  templateUrl: './employe-diplome.component.html',
  styleUrls: ['./employe-diplome.component.css']
})
export class EmployeDiplomeComponent implements OnInit {

    employeDiplome: EmployeDiplome = new EmployeDiplome();
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeDiplomeService: EmployeDiplomeService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          ) { }
    
    ngOnInit() {
      this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
          this.id = +atob(params['id']);
          this.d = atob(params['d']);
      });
    }
    
    load(empD: EmployeDiplome) {
      this.employeDiplomeService.find(empD).subscribe((employeDiplome) => {
          this.employeDiplome = employeDiplome;
      });
    }
    
    /**************************** Création **************************/
    
    createDiplome() {
      this.mode = 2;
    }
    
    save() {
      this.subscribeToSaveResponse(this.employeDiplomeService.create(this.employeDiplome));
    }
    
    subscribeToSaveResponse(result: Observable<EmployeDiplome>) {
      result.subscribe((res: EmployeDiplome) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeDiplomeListModification'} );
      this.ngOnInit();
    }
    
    close() {
      this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsDiplome(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editDiplome(empD: EmployeDiplome) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeDiplomeService.find(empD).subscribe( (employeDiplome) => {
          this.employeDiplome = employeDiplome;
      });
    }
    
    edit() {
      this.employeDiplomeService.delete(this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employeDiplomeListModification'});
          
          this.employeDiplome.id.codeEmploye = this.id.toString();
          this.employeDiplome.id.dateEmployeDiplome = this.d;
          this.subscribeToSaveResponse(this.employeDiplomeService.create(this.employeDiplome));
      });
      
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empD: EmployeDiplome, event: any) {
      this.employeDiplomeService.delete(+empD.id.codeEmploye, empD.id.dateEmployeDiplome).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeDiplomeListModification'});
          this.ngOnInit();
      });
    }

}
