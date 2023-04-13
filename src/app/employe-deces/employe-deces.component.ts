import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../employe/employe.model';
import { EmployeDeces } from './employe-deces.model';
import { EmployeDecesService } from '../employe-deces/employe-deces.service';
import { EventManagerService } from '../event-manager.service';
import { TypeMotifDeces } from '../type-motif-deces/type-motif-deces.model';
import { TypeMotifDecesService } from '../type-motif-deces/type-motif-deces.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-deces',
  templateUrl: './employe-deces.component.html',
  styleUrls: ['./employe-deces.component.css']
})
export class EmployeDecesComponent implements OnInit {
    
    employeDeces: EmployeDeces = new EmployeDeces();
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    typeMotifDeces: TypeMotifDeces;
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    p: boolean;
    codeTypeSituation: number = 3;
    show: boolean;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  constructor(
          private employeDecesService: EmployeDecesService,
          private employeService: EmployeService,
          private employeSituationService: EmployeSituationService,
          private typeMotifDecesService: TypeMotifDecesService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          ) { }

  ngOnInit() {
      this.mode = 1;
      this.subscription = this.activatedRoute.queryParams.subscribe(params => {
          if((params['id']) && (params['d']) ) {
              this.idT = params['id'];
              this.dT = params['d'];
          }
      });
      
      this.typeMotifDecesService.getAll().subscribe(( data ) => {
          this.typeMotifDeces = data; 
          });
      
      if(this.base64regex.test(this.idT.toString())) {
          this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
          this.d = atob(this.dT.toString());
          this.loadEmp(this.id);
          this.load(this.id);
          
      } else {
          this.subscription = this.activatedRoute.params.subscribe((params) => {
              this.id = params['id'];
              this.loadEmp(this.id); //pour afficher le nom de l'employé concerné
              this.employeDecesService.findLast(this.id).subscribe(data => {
                  this.employeDeces = data;
                  if(this.employeDeces != null) {
                      console.log(true);
                      this.show = true;
                  }
                  else {
                      console.log(false);
                      this.show = false;
                  }
              });
          });
      }
      
  }
  
  loadEmp(id) {
      this.employeService.find(id).subscribe((employe) => {
          this.employe = employe;
      });
  }
  
  load(id: number) {
      let empD = new EmployeDeces();
      empD.id.codeEmploye = id.toString();
      this.employeDecesService.find(empD).subscribe(data => {
          this.employeDeces = data;
      });
      if(this.employeDeces != null) {
          this.show = true;
      }
      else {
          this.show = false;
      }
  }
  
/**************************** Création **************************/
  
  createDeces() {
      this.mode = 2;
  }
  
  save() {
      this.employeDeces.id.codeEmploye = this.id.toString();
      this.employeDecesService.create(this.employeDeces).subscribe(res => {
          this.onSaveSuccess(res);
      });
      
    //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
      this.employeSituation.id.codeEmploye = this.employeDeces.id.codeEmploye;
      this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
      this.employeSituation.id.dateDebutSituation = this.employeDeces.id.dateDeces;
      this.employeSituation.dateFinSituation = null;
      this.employeSituation.refSituation = this.employeDeces.refDeces;
      this.employeSituationService.create(this.employeSituation).subscribe(response => {
          this.eventManager.broadcast( { name: 'employeDecesListModification'} );
      });
  }
  
  subscribeToSaveResponse(result: Observable<EmployeDeces>) {
      result.subscribe((res: EmployeDeces) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeDecesListModification'} );
      // this.ngOnInit();
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
      this.mode = 1;
    }
  
  /**************************** Détails **************************/
  
  detailsDeces(id: number) {
      this.mode = 5;
  }
  
  /**************************** Edition **************************/
  
  editDeces(empD: EmployeDeces) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeDecesService.find(empD).subscribe( (employeDeces) => {
          this.employeDeces = employeDeces;
      });
  }
  
  edit() {
      this.employeDecesService.delete(+this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employeDecesListModification'});
          
          this.employeDeces.id.codeEmploye = this.id.toString();
          this.employeDecesService.create(this.employeDeces).subscribe(res => {
              this.onSaveSuccess(res);
          })
      });
      
      this.employeSituationService.delete(this.id, this.d).subscribe(response => {
          
        //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
          this.employeSituation.id.codeEmploye = this.employeDeces.id.codeEmploye;
          this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
          this.employeSituation.id.dateDebutSituation = this.employeDeces.id.dateDeces;
          this.employeSituation.dateFinSituation = null;
          this.employeSituation.refSituation = this.employeDeces.refDeces;
          this.employeSituationService.create(this.employeSituation).subscribe(response => {
              this.eventManager.broadcast( { name: 'employeDecesListModification'} );
          })
      });
      
  }
  
  /**************************** Suppression **************************/
  
  deleteCheck(empD: EmployeDeces) {
      this.employeDecesService.delete(+empD.id.codeEmploye, empD.id.dateDeces).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeDecesListModification'});
          this.ngOnInit();
      });
  }

}
