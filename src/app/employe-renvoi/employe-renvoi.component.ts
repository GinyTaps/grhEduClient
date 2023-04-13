import { Component, OnInit } from '@angular/core';
import { EmployeRenvoi } from './employe-renvoi.model';
import { EmployeService } from '../employe/employe.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { Employe } from '../employe/employe.model';
import { EmployeRenvoiService } from './employe-renvoi.service';
import { TypeMotifRenvoiService } from '../type-motif-renvoi/type-motif-renvoi.service';
import { TypeMotifRenvoi } from '../type-motif-renvoi/type-motif-renvoi.model';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-renvoi',
  templateUrl: './employe-renvoi.component.html',
  styleUrls: ['./employe-renvoi.component.css']
})
export class EmployeRenvoiComponent implements OnInit {

    employeRenvoi: EmployeRenvoi = new EmployeRenvoi();
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    typeMotifRenvois: TypeMotifRenvoi;
    subscription: Subscription;
    id:number;
    d: string;
    mode: number;
    codeTypeSituation: number = 9;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
  constructor(
          private employeRenvoiService: EmployeRenvoiService,
          private typeMotifRenvoiService: TypeMotifRenvoiService,
          private eventManager: EventManagerService,
          private employeService: EmployeService,
          private employeSituationService: EmployeSituationService,
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
      
      this.typeMotifRenvoiService.getAll().subscribe((data ) => {
          this.typeMotifRenvois = data; 
          });
      
      if(this.base64regex.test(this.idT.toString())) {
          this.employeRenvoi.id.codeEmploye = atob(this.idT.toString());
          this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
          this.d = atob(this.dT.toString());
          this.loadEmp(this.id);
      } else {
          this.subscription = this.activatedRoute.params.subscribe((params) => {
              this.id = params['id'];
              this.loadEmp(this.id);
              this.employeRenvoiService.findLast(this.id).subscribe(data => {
                  this.employeRenvoi = data;
              })
          });
          
      }
      
    }
  
      loadEmp(id) {
          this.employeService.find(id).subscribe((employe) => {
              this.employe = employe;
          });
      }
  
      load(empR: EmployeRenvoi) {
        this.employeRenvoiService.find(empR).subscribe((employeRenvoi) => {
            this.employeRenvoi = employeRenvoi;
        });
      }
  
  /**************************** Création **************************/
  
  createRenvoi() {
    this.mode = 2;
  }
  
  save() {
      this.employeRenvoi.id.codeEmploye = this.id.toString();
      this.subscribeToSaveResponse(this.employeRenvoiService.create(this.employeRenvoi));
      
      //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
      this.employeSituation.id.codeEmploye = this.employeRenvoi.id.codeEmploye;
      this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
      this.employeSituation.id.dateDebutSituation = this.employeRenvoi.id.dateRenvoi
      this.employeSituation.dateFinSituation = null;
      this.employeSituation.refSituation = this.employeRenvoi.refRenvoi;
      this.employeSituationService.create(this.employeSituation).subscribe(response => {
          this.eventManager.broadcast( { name: 'employeRenvoiListModification'} );
      });
  }
  
  subscribeToSaveResponse(result: Observable<EmployeRenvoi>) {
    result.subscribe((res: EmployeRenvoi) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
  }
  
  private onSaveSuccess( result ) {
    this.eventManager.broadcast( { name: 'employeRenvoiListModification'} );
    this.router.navigateByUrl('/employe-detail/'+this.id);
  }
  
  close() {
    this.mode = 1;
  }
  
  /**************************** Détails **************************/
  
  detailsRenvoi(id: number) {
    this.mode = 5;
  }
  
  /**************************** Edition **************************/
  
  editRenvoi(empR: EmployeRenvoi) {
    this.mode = 3;
    this.subscription = this.activatedRoute.params.subscribe((params) => {
        this.id = params['id'];
        this.d = params['d'];
    });
    this.employeRenvoiService.find(empR).subscribe( (employeRenvoi) => {
        this.employeRenvoi = employeRenvoi;
    });
  }
  
  edit() {
    this.employeRenvoiService.delete(this.id, this.d).subscribe( res => {
        this.eventManager.broadcast({name: 'employeRenvoiListModification'});
        
        this.employeRenvoi.id.codeEmploye = this.id.toString();
        this.employeRenvoiService.create(this.employeRenvoi).subscribe(response => {
            this.onSaveSuccess(response);
        });
    });
    
    this.employeSituationService.delete(this.id, this.d).subscribe(response => {
        //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
        this.employeSituation.id.codeEmploye = this.employeRenvoi.id.codeEmploye;
        this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
        this.employeSituation.id.dateDebutSituation = this.employeRenvoi.id.dateRenvoi
        this.employeSituation.dateFinSituation = null;
        this.employeSituation.refSituation = this.employeRenvoi.refRenvoi;
        this.employeSituationService.create(this.employeSituation).subscribe(response => {
            this.eventManager.broadcast({name: 'employeRenvoiListModification'});
        })
    });
    
  }
  
  /**************************** Suppression **************************/
  
  deleteCheck(empR: EmployeRenvoi, event: any) {
    this.employeRenvoiService.delete(+empR.id.codeEmploye, empR.id.dateRenvoi).subscribe((response) => {
        this.eventManager.broadcast({name: 'employeRenvoiListModification'});
        this.ngOnInit();
    });
  }

}
