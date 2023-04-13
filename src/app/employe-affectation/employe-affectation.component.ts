import { Component, OnInit } from '@angular/core';
import { EmployeAffectation } from './employe-affectation.model';
import { Employe } from '../employe/employe.model';
import { Subscription, Observable } from 'rxjs';
import { EmployeService } from '../employe/employe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Poste } from '../poste/poste.model';
import { EmployeAffectationService } from '../employe-affectation/employe-affectation.service';
import { EventManagerService } from '../event-manager.service';
import { PosteService } from '../poste/poste.service';
import { EmployePoste } from '../employe-poste/employe-poste.model';
import { EmployePosteService } from '../employe-poste/employe-poste.service';
import { EmployeFonction } from '../employe-fonction/employe-fonction.model';
import { EmployeFonctionService } from '../employe-fonction/employe-fonction.service';
import { EmployeStatutService } from '../employe-statut/employe-statut.service';
import { EmployeStatut } from '../employe-statut/employe-statut.model';
import { Administration } from '../administration/administration.model';
import { Etablissement } from '../etablissement/etablissement.model';
import { AdministrationService } from '../administration/administration.service';
import { EtablissementService } from '../etablissement/etablissement.service';
import { EmployeEtablissement } from '../employe-etablissement/employe-etablissement.model';
import { EmployeEtablissementService } from '../employe-etablissement/employe-etablissement.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';
import { EmployeRepAdminService } from '../employe-rep-admin/employe-rep-admin.service';
import { EmployeRepAdmin } from '../employe-rep-admin/employe-rep-admin.model';
import { TypeStatut } from '../type-statut/type-statut.model';
import { TypeStatutService } from '../type-statut/type-statut.service';

@Component({
  selector: 'app-employe-affectation',
  templateUrl: './employe-affectation.component.html',
  styleUrls: ['./employe-affectation.component.css']
})
export class EmployeAffectationComponent implements OnInit {
    
    employeAffectation: EmployeAffectation = new EmployeAffectation();
    // employeAffectationT: EmployeAffectation = new EmployeAffectation();
    employe: Employe;
    employePoste: EmployePoste = new EmployePoste();
    employeRepAdmin: EmployeRepAdmin = new EmployeRepAdmin();
    administration: Administration = new Administration();
    etablissement: Etablissement = new Etablissement();
    employeEtablissement: EmployeEtablissement = new EmployeEtablissement();
    employeFonction: EmployeFonction = new EmployeFonction();
    employeStatut: EmployeStatut = new EmployeStatut();
    employeSituation: EmployeSituation = new EmployeSituation();
    employeSituationT: EmployeSituation = new EmployeSituation();
    poste: Poste; //  = new Poste();
    postes: Poste;
    administrations: Administration;
    typeStatuts: TypeStatut;
    subscription: Subscription;
    code: number;
    id:number;
    d: string;
    mode: number;
    codeTypeSituation: number = 1;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  constructor(
          private employeAffectationService: EmployeAffectationService,
          private employeRepAdminService: EmployeRepAdminService,
          private employePosteService: EmployePosteService,
          private employeFonctionService: EmployeFonctionService,
          private employeStatutService: EmployeStatutService,
          private employeEtablissementService: EmployeEtablissementService,
          private employeService: EmployeService,
          private employeSituationService: EmployeSituationService,
          private posteService: PosteService,
          private administrationService: AdministrationService,
          private typeStatutService: TypeStatutService,
          private etablissementService: EtablissementService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          ) { }

  ngOnInit() {
      // this.mode = 2;
      // this.id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.subscription = this.activatedRoute.queryParams.subscribe(params => {
          /*console.log(params['id']);
          console.log(params['d']);*/
          if((params['id']) && (params['d']) ) {
              this.idT = params['id'];
              this.dT = params['d'];
          }
      });

      this.loadAll();
      
      if(this.base64regex.test(this.idT.toString())) {
              this.mode = 2;
              this.employeAffectation.id.codeEmploye = atob(this.idT.toString());
              this.employeAffectation.id.dateEmployeAffectation = atob(this.dT);
              /*this.employeAffectationT = this.employeAffectation;
              this.editAffectation(this.employeAffectationT);*/
              this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
              this.d = atob(this.dT.toString());
              this.loadEmp(this.id);
              this.loadEmpPoste(this.id, this.d);
              // this.load(this.id, this.d);
              this.loadEmpRepAdmin(this.id, this.d);
              this.loadEmpStatut(this.id, this.d);
          } else {
              this.mode = 1;
              this.subscription = this.activatedRoute.params.subscribe((params) => {
                  this.id = params['id'];
                  // this.d = this.dT;
                  this.employeService.find(this.id).subscribe((employe) => {
                      this.employe = employe;
                  });
                  this.employeAffectationService.findLast(this.id).subscribe(data => {
                      this.employeAffectation = data;
                      // console.log(this.employeAffectation);
                  });
                  this.employePosteService.findLast(this.id).subscribe(data => {
                      this.employePoste = data;
                      // console.log(this.employePoste);
                  });
                  this.employeRepAdminService.findLast(this.id).subscribe(data => {
                      this.employeRepAdmin = data;
                      // console.log(this.employeRepAdmin);
                  });
                  this.employeStatutService.findLast(this.id).subscribe(data => {
                      this.employeStatut = data;
                      // console.log(this.employeStatut);
                  })
             });
              
          }
      
  }
  
  loadAll() {
      this.loadPostes();
      this.loadAdministration();
      this.loadEtablissement();
      this.loadStatut();
  }
  
  loadEmp(id) {
      this.employeService.find(id).subscribe((employe) => {
          this.employe = employe;
      });
      this.load(); 
  }
  
  loadAdministration() {
      this.administrationService.getAll().subscribe(data => {
          this.administrations = data;
      })
  }
  
  loadEtablissement() {
      this.etablissementService.getAll().subscribe(data => {
          this.etablissement = data;
      })
  }
  
  loadPostes() {
      this.posteService.getAll().subscribe( (poste) => {
          this.poste = poste;
      })
  }
  
  
  loadStatut() {
      this.typeStatutService.getAll().subscribe((typeStatut) => {
              this.typeStatuts = typeStatut;
          });
      
  }
  
  loadEmpPoste(id: number, d: string) {
      this.employePosteService.find(id, d).subscribe(data => {
          this.employePoste = data;
          this.loadPoste(this.employePoste.id.codePoste);
      })
  }
  
  loadPoste(id) {
      this.posteService.find(id).subscribe( data =>{
          this.postes = data;
          // console.log(this.postes);
      })
  }
  
  loadEmpLastPoste(id) {
      this.employePosteService.getLast(id).subscribe(data => {
          if( (this.id = +data.body.id.codeEmploye) && (this.employeAffectation.id.dateEmployeAffectation. match(data.body.id.dateDebutEmployePoste))) { // si la donnée existe on met juste à jour
              this.employePosteService.delete(+data.body.id.codeEmploye, data.body.id.dateDebutEmployePoste).subscribe(res => {
                  this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
              });
              
              this.employePoste.id.codeEmploye = data.body.id.codeEmploye;
              this.employePoste.id.codePoste = this.employePoste.id.codePoste;
              this.employePoste.id.dateDebutEmployePoste = this.employeAffectation.id.dateEmployeAffectation;
              this.employePoste.dateFinEmployePoste = this.employeAffectation.id.dateEmployeAffectation;
              /************** Mise à jour de la date de fin du poste en cours qui est la date de début du nouveau poste **********/
              
              this.employePosteService.create(this.employePoste).subscribe((res: EmployePoste) => {
                  this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
                  
              })
          } else { //si non on la cré
              this.employePoste.id.codeEmploye = data.body.id.codeEmploye;
              this.employePoste.id.codePoste = this.employePoste.id.codePoste;
              this.employePoste.id.dateDebutEmployePoste = this.employeAffectation.id.dateEmployeAffectation;
              this.employePoste.dateFinEmployePoste = this.employeAffectation.id.dateEmployeAffectation;
              /************** Mise à jour de la date de fin du poste en cours qui est la date de début du nouveau poste **********/
              this.employePosteService.create(this.employePoste).subscribe((res: EmployePoste) => {
                  this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
                  
              })
          }
          
      });
  }
  
  load() {
      this.employeAffectationService.find(this.id, this.d).subscribe((employeAffectation) => {
          this.employeAffectation = employeAffectation;
      });
  }
  
  loadEmpRepAdmin(id: number, d: string) {
      this.employeRepAdminService.find(id, d).subscribe(data => {
          this.employeRepAdmin = data;
      })
  }
  
loadEmpStatut(id: number, d: string) {
      this.employeStatutService.find(id, d).subscribe(data => {
          this.employeStatut = data;
      })
  }
  
/*********************************************** Création **********************************************/
  
  createAffectation() {
      // this.mode = 1;
      
/******************** Ici il faut gérer le fait que ce soit une administration ou une école ***********/      
      if(this.code = this.administration.codeAdministration) {
          
      } else if(this.code = this.etablissement.codeEtablissement) {
          
      }
  }
  
  save() {
      /************** Mise à jour de la date de fin du poste en cours qui est la date de début du nouveau poste **********/
      this.loadEmpLastPoste(this.id);
      
      this.employeAffectation.id.codeEmploye = this.id.toString();
      this.employeAffectationService.create(this.employeAffectation).subscribe(res => {   
          this.onSaveSuccess(res);
      });
      
      /****************** Enregistrement du nouveau poste dans employePoste *********************/     
      this.employePoste.id.codeEmploye = this.id.toString();
      // this.employePoste.id.codePoste = this.poste.codePoste.toString();
      this.employePoste.id.dateDebutEmployePoste = this.employeAffectation.id.dateEmployeAffectation;
      this.employePosteService.create(this.employePoste).subscribe((res:EmployePoste) => {
          this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );   
          });
      
    //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
      this.employeSituation.id.codeEmploye = this.employeAffectation.id.codeEmploye;
      this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
      this.employeSituation.id.dateDebutSituation = this.employeAffectation.id.dateEmployeAffectation;
      this.employeSituation.dateFinSituation = null;
      this.employeSituation.refSituation = this.employeAffectation.refEmployeAffectation;
      this.employeSituationService.create(this.employeSituation).subscribe(data => {
          this.eventManager.broadcast( { name: 'employeAffectationsListModification'});
      });
  }
  
  subscribeToSaveResponse(result: Observable<EmployeAffectation>) {
      result.subscribe((res: EmployeAffectation) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
      // this.mode = 1;
      // this.loadAll();
      this.router.navigateByUrl('/employe-detail/'+this.id);
      
    }
    
    close() {
      // this.mode = 1;
    }
  
  /**************************** Détails **************************/
  
  detailsAffectation(id: number) {
      // this.mode = 5;
  }
  
  /**************************** Edition **************************/
  
  editAffectation(empA: EmployeAffectation) {
      // this.mode = 2;
      /*this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });*/
      this.id = +empA.id.codeEmploye;
      this.d = empA.id.dateEmployeAffectation;
      // this.load(empA);
      
  }
  
  edit() {
      
      this.loadEmpLastPoste(this.id);
      // this.employeAffectationT = this.employeAffectation;
      this.employeAffectationService.delete(this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employeAffectationsListModification'});
          
          /*console.log('********** Edition *******');
          console.log(this.employeAffectation);*/
          this.employeAffectation.id.codeEmploye = this.id.toString();
          this.employeAffectationService.create(this.employeAffectation).subscribe(res => {
              this.onSaveSuccess(res);
            });
      });
      
      this.employeRepAdminService.delete(this.id, this.d).subscribe(res => {
          this.employeRepAdmin.id.codeEmploye = this.employeAffectation.id.codeEmploye;
          this.employeRepAdmin.id.dateEmployeRepAdmin = this.employeAffectation.id.dateEmployeAffectation;
          this.employeRepAdminService.create(this.employeRepAdmin).subscribe(res => {
              this.eventManager.broadcast({name: 'employeAffectationsListModification'});
          })
      });
      
      this.employeStatutService.delete(this.id, this.d).subscribe(res => {
          
          this.employeStatut.id.codeEmploye = this.employePoste.id.codeEmploye;
          this.employeStatut.id.codeTypeStatut = this.employeStatut.id.codeTypeStatut;
          this.employeStatut.id.dateEmployeStatut = this.employePoste.id.dateDebutEmployePoste;
          this.employeStatutService.create(this.employeStatut).subscribe(res => {
              this.eventManager.broadcast({name: 'employeAffectationsListModification'});
          });
      });
      
      this.employeSituationService.delete(this.id, this.d).subscribe(response => {
          
        //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
          this.employeSituation.id.codeEmploye = this.employeAffectation.id.codeEmploye;
          this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
          this.employeSituation.id.dateDebutSituation = this.employeAffectation.id.dateEmployeAffectation;
          this.employeSituation.dateFinSituation = null;
          this.employeSituation.refSituation = this.employeAffectation.refEmployeAffectation;
          this.employeSituationService.create(this.employeSituation).subscribe(response => {
              this.eventManager.broadcast({name: 'employeAffectationsListModification'});
          })
      });
    
  }
  
  /**************************** Suppression **************************/
  
  deleteCheck(empA: EmployeAffectation, event: any) {
      this.employeAffectationService.delete(+empA.id.codeEmploye, empA.id.dateEmployeAffectation).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeAffectationListModification'});
          this.ngOnInit();
      });
  }

}
