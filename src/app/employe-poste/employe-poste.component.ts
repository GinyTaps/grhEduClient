import { Component, OnInit } from '@angular/core';
import { EmployePoste } from './employe-poste.model';
import { Employe } from '../employe/employe.model';
import { Poste } from '../poste/poste.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EmployeService } from '../employe/employe.service';
import { EmployePosteService } from '../employe-poste/employe-poste.service';
import { EventManagerService } from '../event-manager.service';
import { Administration } from '../administration/administration.model';
import { Etablissement } from '../etablissement/etablissement.model';
import { TypeFonction } from '../type-fonction/type-fonction.model';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';
import { AdministrationService } from '../administration/administration.service';
import { EtablissementService } from '../etablissement/etablissement.service';
import { TypeFonctionService } from '../type-fonction/type-fonction.service';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';
import { PosteService } from '../poste/poste.service';
import { TypeStatut } from '../type-statut/type-statut.model';
import { TypeStatutService } from '../type-statut/type-statut.service';
import { EmployeStatut } from '../employe-statut/employe-statut.model';
import { EmployeStatutService } from '../employe-statut/employe-statut.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';
import { EmployeAffectation } from '../employe-affectation/employe-affectation.model';
import { EmployeAffectationService } from '../employe-affectation/employe-affectation.service';
import { EmployeRepAdminService } from '../employe-rep-admin/employe-rep-admin.service';
import { EmployeRepAdmin } from '../employe-rep-admin/employe-rep-admin.model';

@Component({
  selector: 'app-employe-poste',
  templateUrl: './employe-poste.component.html',
  styleUrls: ['./employe-poste.component.css']
})
export class EmployePosteComponent implements OnInit {
    
    employePoste: EmployePoste = new EmployePoste();
    employePosteT: EmployePoste = new EmployePoste();
    employeAffectation: EmployeAffectation = new EmployeAffectation();
    employeRepAdmin: EmployeRepAdmin = new EmployeRepAdmin();
    employe: Employe;
    employeStatut: EmployeStatut = new EmployeStatut();
    employeSituation: EmployeSituation = new EmployeSituation();
    empSelected: number;
    poste: Poste = new Poste();
    postes: Poste;
    administration: Administration = new Administration();
    administrations: Administration;
    etablissement: Etablissement = new Etablissement();
    etablissements: Etablissement;
    typeFonction: TypeFonction = new TypeFonction();
    typeFonctions: TypeFonction;
    typeStatut: TypeStatut = new TypeStatut();
    typeStatuts: TypeStatut;
    idEmp: number;
    subscription: Subscription;
    id:number;
    d: string;
    codeTypeSituation: number = 1;
    code: number;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employePosteService: EmployePosteService,
          private employeService: EmployeService,
          private employeStatutService: EmployeStatutService,
          private employeSituationService: EmployeSituationService,
          private employeAffectationService: EmployeAffectationService,
          private employeRepAdminService: EmployeRepAdminService,
          private posteService: PosteService,
          private administrationService: AdministrationService,
          private etablissementService: EtablissementService,
          private typeFonctionService: TypeFonctionService,
          private typeStatutService: TypeStatutService,
          private eventManager: EventManagerService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          ) { }
    
    ngOnInit() {
        this.mode = 1;
        // this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
        this.loadAll();
        this.loadEmp(this.empSelected);
        this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
            if((params['id']) && (params['d']) ) {
                this.idT = params['id'];
                this.dT = params['d'];
            }
        }); 
        if(this.base64regex.test(this.idT.toString())) {
            this.employePoste.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
            this.empSelected = this.id;
        } else {
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.loadEmp(this.id);
                this.empSelected = this.id;
                /*this.employePosteService.findLast(this.id).subscribe(data => {
                    this.employePoste = data;
                })*/
            });
            
        }
    }
    
    loadAll() {
        this.loadPoste();
        this.loadAdmin();
        this.loadEtab();
        this.loadFonction();
        this.loadStatut();
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            // console.log(employe);
            this.employe = employe;
        });
        
        this.employePosteService.getLast(id).subscribe(data => {
            this.employePoste = data.body;
        })
    }
    
    loadLastPoste(id) {
        this.posteService.findLast(id).subscribe((poste) => {
            this.poste = poste;
            console.log(this.poste);
        });
    }
    
    loadPoste() {
        this.posteService.getAll().subscribe((poste) => {
            this.postes = poste;
        });
    }
    
    loadAdmin() {
        this.administrationService.getAll().subscribe((administration) => {
            this.administration = administration;
            this.administrations = administration;
        });
    }
    
    loadEtab() {
        this.etablissementService.getAll().subscribe((etablissement) => {
            this.etablissement = etablissement;
            this.etablissements = etablissement;
        });
    }
    
    loadFonction() {
        this.typeFonctionService.getAll().subscribe((typeFonction) => {
            this.typeFonction = typeFonction;
            this.typeFonctions = typeFonction;
        });
    }
    
    loadStatut() {
        /*this.employeStatutService.findLast(id).subscribe((employeStatut) => {
            this.idEmp = +employeStatut.id.codeEmploye;*/
            
            this.typeStatutService.getAll().subscribe((typeStatut) => {
                this.typeStatut = typeStatut;
                this.typeStatuts = typeStatut;
            });
        // })
        
    }
    
    load(empP: EmployePoste) {
      this.employePosteService.find(+empP.id.codeEmploye, empP.id.dateDebutEmployePoste).subscribe((employePoste) => {
          this.employePoste = employePoste;
      });
    }
    
    loadEmpLastPoste(id) {
        this.employePosteService.getLast(id).subscribe(data => {
            if( (this.id = +data.body.id.codeEmploye) && (this.employePoste.id.dateDebutEmployePoste. match(data.body.id.dateDebutEmployePoste))) { // si la donnée existe on met juste à jour
                this.employePosteService.delete(+data.body.id.codeEmploye, data.body.id.dateDebutEmployePoste).subscribe(res => {
                    this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
                });
                
                this.employePoste.id.codeEmploye = data.body.id.codeEmploye;
                /************** Mise à jour de la date de fin du poste en cours qui est la date de début du nouveau poste **********/
                
                this.employePosteService.create(this.employePoste).subscribe((res: EmployePoste) => {
                    this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
                    
                })
            } else { //si non on la cré
                /************** Mise à jour de la date de fin du poste en cours qui est la date de début du nouveau poste **********/
                this.employePosteService.create(this.employePoste).subscribe((res: EmployePoste) => {
                    this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
                    
                })
            }
            
        });
    }
    
    /**************************** Création **************************/
    
    createPoste() {
      /******************** Ici il faut gérer le fait que ce soit une administration ou une école ***********/      
      if(this.code = this.administration.codeAdministration) {
          
      } else if(this.code = this.etablissement.codeEtablissement) {
          
      }
    }
    
    save() {
        /************** Mise à jour de la date de fin du poste en cours qui est la date de début du nouveau poste **********/
        this.loadEmpLastPoste(this.id);
        // console.log(this.employeStatut.id.codeTypeStatut);
        this.employePoste.id.codeEmploye = this.empSelected.toString();
      // this.subscribeToSaveResponse(this.employePosteService.create(this.employePoste));
        
        if(this.employeRepAdmin.id.codeAdministration != null) {
            this.employeRepAdmin.id.codeEmploye = this.employePoste.id.codeEmploye;
            this.employeRepAdmin.id.dateEmployeRepAdmin = this.employePoste.id.dateDebutEmployePoste;
            this.employeRepAdminService.create(this.employeRepAdmin).subscribe(res => {
                this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
            });
        }
        
        this.employeStatut.id.codeEmploye = this.employePoste.id.codeEmploye;
        this.employeStatut.id.codeTypeStatut = this.employeStatut.id.codeTypeStatut;
        this.employeStatut.id.dateEmployeStatut = this.employePoste.id.dateDebutEmployePoste;
        this.employeStatutService.create(this.employeStatut).subscribe(res => {
            this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
        });
        
        this.employeAffectation.id.codeEmploye = this.employePoste.id.codeEmploye;
        this.employeAffectation.id.dateEmployeAffectation = this.employePoste.id.dateDebutEmployePoste;
        this.employeAffectationService.create(this.employeAffectation).subscribe(data => {
            this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
        });
        
        this.employeSituation.id.codeEmploye = this.employePoste.id.codeEmploye;
        this.employeSituation.id.dateDebutSituation = this.employePoste.id.dateDebutEmployePoste;
        this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
        this.employeSituation.dateFinSituation = this.employePoste.dateFinEmployePoste;
        this.employeSituation.refSituation = this.employeAffectation.refEmployeAffectation;
        this.employeSituationService.create(this.employeSituation).subscribe(res => {
            this.eventManager.broadcast( { name: 'employeAffectationsListModification'} );
        });
        
        this.employePosteService.create(this.employePoste).subscribe(res => {
            this.eventManager.broadcast({ name: 'employeAffectationsListModification'});
        });
        
        
    }
    
    subscribeToSaveResponse(result: Observable<EmployePoste>) {
      result.subscribe((res: EmployePoste) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employePosteListModification'} );
      // this.employePoste = new EmployePoste();
      // this.ngOnInit();
      this.router.navigateByUrl('/employe-detail/'+this.empSelected);
    }
    
    close() {
    }
    
    /**************************** Détails **************************/
    
    detailsPoste(id: number) {
    }
    
    /**************************** Edition **************************/
    
    editPoste(empP:EmployePoste) {
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.employePoste.id.codeEmploye = params['id'];
          this.employePoste.id.dateDebutEmployePoste = params['d'];
          this.employePosteT = this.employePoste;
          this.load(this.employePosteT);
          this.id = +params['id'];
          this.d = params['d'];
      });
      /*this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });*/
      this.employePosteService.find(+empP.id.codeEmploye, empP.id.dateDebutEmployePoste).subscribe( (employePoste) => {
          this.employePoste = employePoste;
      });
    }
    
    edit() {
      this.employePosteService.delete(this.id, this.d).subscribe( res => {
          
          // this.eventManager.broadcast({name: 'employePosteListModification'});
          
          this.employePoste.id.codeEmploye = this.id.toString();
          this.employePosteService.create(this.employePoste).subscribe(data => {
              this.onSaveSuccess(res);
          });
      });
      
      this.employeRepAdminService.delete(this.id, this.d).subscribe(res => {
          this.employeRepAdmin.id.codeEmploye = this.employePoste.id.codeEmploye;
          this.employeRepAdmin.id.dateEmployeRepAdmin = this.employePoste.id.dateDebutEmployePoste;
          this.employeRepAdminService.create(this.employeRepAdmin);
      });
      
      this.employeStatutService.delete(this.id, this.d).subscribe(res => {
          
          this.employeStatut.id.codeEmploye = this.employePoste.id.codeEmploye;
          this.employeStatut.id.codeTypeStatut = this.employeStatut.id.codeTypeStatut;
          this.employeStatut.id.dateEmployeStatut = this.employePoste.id.dateDebutEmployePoste;
          this.employeStatutService.create(this.employeStatut);
      });
      
      this.employeSituationService.delete(this.id, this.d).subscribe(res => {
          
          this.employeSituation.id.codeEmploye = this.employePoste.id.codeEmploye;
          this.employeSituation.id.dateDebutSituation = this.employePoste.id.dateDebutEmployePoste;
          this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
          this.employeSituation.dateFinSituation = this.employePoste.dateFinEmployePoste;
          this.employeSituation.refSituation = null;
          this.employeSituationService.create(this.employeSituation);
      });
      
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empP:EmployePoste, event: any) {
      this.employePosteService.delete(+empP.id.codeEmploye, empP.id.dateDebutEmployePoste).subscribe((response) => {
          this.eventManager.broadcast({name: 'employePosteListModification'});
          this.ngOnInit();
      });
    }
  

}
