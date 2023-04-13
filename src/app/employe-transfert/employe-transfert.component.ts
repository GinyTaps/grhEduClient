import { Component, OnInit } from '@angular/core';
import { EmployeTransfert } from './employe-transfert.model';
import { Employe } from '../employe/employe.model';
import { Poste } from '../poste/poste.model';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { EmployeService } from '../employe/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeTransfertService } from '../employe-transfert/employe-transfert.service';
import { PosteService } from '../poste/poste.service';
import { Regroupement } from '../regroupement/regroupement.model';
import { Etablissement } from '../etablissement/etablissement.model';
import { RegroupementService } from '../regroupement/regroupement.service';
import { EtablissementService } from '../etablissement/etablissement.service';
import { TypeFonction } from '../type-fonction/type-fonction.model';
import { TypeFonctionService } from '../type-fonction/type-fonction.service';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';
import { Administration } from '../administration/administration.model';
import { AdministrationService } from '../administration/administration.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';
import { EmployePoste } from '../employe-poste/employe-poste.model';
import { EmployePosteService } from '../employe-poste/employe-poste.service';
import { EmployeFonction } from '../employe-fonction/employe-fonction.model';
import { EmployeFonctionService } from '../employe-fonction/employe-fonction.service';
import { TypeRegroupement } from '../type-regroupement/type-regroupement.model';
import { TypeRegroupementService } from '../type-regroupement/type-regroupement.service';

@Component({
  selector: 'app-employe-transfert',
  templateUrl: './employe-transfert.component.html',
  styleUrls: ['./employe-transfert.component.css']
})
export class EmployeTransfertComponent implements OnInit {
    
    employeTransfert: EmployeTransfert = new EmployeTransfert();
    employe: Employe;
    employeSituation: EmployeSituation = new EmployeSituation();
    employePoste: EmployePoste = new EmployePoste();
    employeFonction: EmployeFonction = new EmployeFonction();
    poste: Poste = new Poste();
    postes: Poste;
    regroupement: Regroupement = new Regroupement();
    regroupements: Regroupement;
    etablissement: Etablissement = new Etablissement();
    etablissements: Etablissement;
    typeFonction: TypeFonction = new TypeFonction();
    typeFonctions: TypeFonction;
    typeStatutEntite: TypeStatutEntite = new TypeStatutEntite();
    typeStatutEntites: TypeStatutEntite;
    administration: Administration = new Administration();
    administrations: Administration;
    subscription: Subscription;
    codeTypeSituation: number = 12;
    id:number;
    idF:number;
    d: string;
    show: boolean;
    hide: boolean;
    mode: number;
    choix: string;
    choixVal: string = 'E';
    routeData: any;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    typeRegroupements: TypeRegroupement;
    regroupementChaines: { [id: number]: Regroupement[] } = {};
    regroupementFils: { [id: number]: Regroupement[] } = {};
    regroupementSousFils: { [id: number]: Regroupement[] } = {};
    regroupementSousSFils: { [id: number]: Regroupement[] } = {};
    
    regChaines = null;
    regFils = null;
    regSousFils = null;
    
    codeAdm = null;
    codeEtab = null;
    codeTypeRegroupement = null;
    codeRegroupement = null;
    codeRegroupementA = null;
    codeRegroupementUnder = null;
    regSelected: number;

  constructor(
          private employeTransfertService: EmployeTransfertService,
          private posteService: PosteService,
          private employeposteService: EmployePosteService,
          private employeService: EmployeService,
          private employeFonctionService: EmployeFonctionService,
          private employeSituationService: EmployeSituationService,
          private regroupementService: RegroupementService,
          private etablissementService: EtablissementService,
          private typeFonctionService: TypeFonctionService,
          private typeRegroupementService: TypeRegroupementService,
          private typeStatutEntiteService: TypeStatutEntiteService,
          private administrationService: AdministrationService,
          private eventManager: EventManagerService,
          private router: Router,
          private activatedRoute: ActivatedRoute
          ) {
  }

  ngOnInit() {
     
      this.mode = 1;
      this.loadAll();
      // this.tAdmin();
      // this.tEcole();
      this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
          if((params['id']) && (params['d']) && !(params['d'] === this.choixVal) ) {
              this.idT = params['id'];
              this.dT = params['d'];
          }
      }); 
      this.choix = this.d;
      if(!this.choix) {
          this.tAdmin();
      } else {
          this.tEcole();
      }
      if(this.base64regex.test(this.idT.toString())) {
          this.employeTransfert.id.codeEmploye = atob(this.idT.toString());
          this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
          this.d = atob(this.dT.toString());
          this.loadEmp(this.id);
      } 
      else {
          this.subscription = this.activatedRoute.params.subscribe((params) => {
              this.id = params['id'];
              this.loadEmp(this.id);
              this.employeTransfertService.findLast(this.id).subscribe(data => {
                  this.employeTransfert = data;
              });
              this.employeposteService.findLast(this.id).subscribe(data => {
                  this.employePoste = data;
              });
              this.employeFonctionService.findLast(this.id).subscribe(data => {
                  this.employeFonction = data;
              })
              
          });  
      }

      
      /*this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
          if((params['id']) && (params['d']) && !(atob(params['d']) === this.choixVal) ) {
              // this.employeTransfert.id.codeEmploye = params['id'];
              // this.employeTransfert.id.dateTransfert = params['d'];
              // this.employeTransfertT = this.employeTransfert;
              
              // this.editTransfert(this.employeTransfertT);
              this.id = +atob(params['id']);
              this.loadEmp(this.id);
              this.d = atob(params['d']);
          }
          // this.load(params['id'], params['d']);
          this.id = +atob(params['id']);
          this.loadEmp(this.id);
          this.d = atob(params['d']);
          
          this.choix = atob(params['d']);
          if(!this.choix) {
              this.tAdmin();
          } else {
              this.tEcole();
          }
      });*/
      
  }
  
  loadAll() {
      this.getTypeRegroupement();
      this.loadPoste();
      this.loadTypeFonction();
      this.loadTypeStatutEntite();
      this.loadEtablissement();
      this.loadRegroupement();
  }
  
  getTypeRegroupement() {
      this.typeRegroupementService.getAll().subscribe(data => {
          this.typeRegroupements = data;
      })
  }
  
  getChaineRegroupement(t : TypeRegroupement) {
      this.regroupementService.getChaineReg(t.codeTypeRegroupement).subscribe(data => {
          this.regroupementChaines[t.codeTypeRegroupement] = data;
          this.regChaines = this.regroupementChaines[t.codeTypeRegroupement];
      });
  }
  
  getRegroupement(r :Regroupement) {
      this.regroupementService.getChaineRegFils(r.codeRegroupement).subscribe(data => {
          this.regroupementFils[r.codeRegroupement] = data;
          this.regFils =  this.regroupementFils[r.codeRegroupement];
      });
      this.activ(r.codeRegroupement);
      this.regSelected = r.codeRegroupement;
  }
  
  getSousRegroupement(r :Regroupement) {
      this.regroupementService.getChaineRegFils(r.codeRegroupement).subscribe(data => {
          this.regroupementSousFils[r.codeRegroupement] = data;
          this.regSousFils = this.regroupementSousFils[r.codeRegroupement];
      });
      this.activ(r.codeRegroupement);
      this.regSelected = r.codeRegroupement;
  }
  
  getSousSRegroupement(r :Regroupement) {
      if(this.regSelected != null) {
          this.activ(this.regSelected);
      }
  }
  
  // fonction permettant d'afficher les liste déroulante si les données sont disponibles
  activ(c: number) {
      if(this.mode = 2) {
          this.administrationService.searchList(c).subscribe(data => {
              this.administrations = data;
          });
      }
      else {

          this.etablissementService.searchList(c).subscribe(data => {
              this.etablissements = data;
          });
      }
  }
  
  getAdm(a: Administration) {
      this.codeAdm = a.codeAdministration;
      // console.log(this.codeAdm);
  }
  
  getEtab(e: Etablissement) {
      this.codeEtab = e.codeEtablissement;
  }
  
  loadEmp(id) {
      this.employeService.find(id).subscribe((employe) => {
          this.employe = employe;
      });
      this.load();
  }
  
  loadPoste() {
      this.posteService.getAll().subscribe( (poste) => {
          this.poste = poste;
          this.postes = poste;
      })
  }
  
  loadTypeFonction() {
      this.typeFonctionService.getAll().subscribe( (typeFonction) => {
          this.typeFonction = typeFonction;
          this.typeFonctions = typeFonction;
      })
  }
  
  loadTypeStatutEntite() {
      this.typeStatutEntiteService.getAll().subscribe( (typeStatutEntite) => {
          this.typeStatutEntite = typeStatutEntite;
          this.typeStatutEntites = typeStatutEntite;
      })
  }
  
  loadEtablissement() {
      this.etablissementService.getAll().subscribe( (etablissement) => {
          this.etablissement = etablissement;
          this.etablissements = etablissement;
      })
  }
  
  loadRegroupement() {
      this.regroupementService.getAll().subscribe( (regroupement) => {
          this.regroupement = regroupement;
          this.regroupements = regroupement;
      })
  }
  
  /*load(empT: EmployeTransfert) {
      this.employeTransfertService.find(empT).subscribe((employeTransfert) => {
          this.employeTransfert = employeTransfert;
      });
  }*/
  load() {
      this.employeTransfertService.find(this.id, this.d).subscribe((employeTransfert) => {
          this.employeTransfert = employeTransfert;
      });
  }
  
  tAdmin(){
      this.hide = false;
      this.show = true;
      this.mode = 2;
      // return class{active};
  }
  
  tEcole(){
      this.hide = true;
      this.show = false;
      this.mode = 3;
      // return class{active};
  }
  
  /**************************** Création **************************/
  
  createTransfert() {
      this.mode = 2;
  }
  
  save() {
      this.employeTransfert.id.codeEmploye = this.id.toString();
      // this.subscribeToSaveResponse(this.employeTransfertService.create(this.employeTransfert));
      this.subscribeToSaveResponse(this.employeTransfertService.create(this.employeTransfert));
      
      //permet d'enregistrer dans la table situation pour gérer l'historique de l'employé
      this.employeSituation.id.codeEmploye = this.employeTransfert.id.codeEmploye;
      this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
      this.employeSituation.id.dateDebutSituation = this.employeTransfert.id.dateTransfert;
      this.employeSituation.dateFinSituation = null;
      this.employeSituation.refSituation = this.employeTransfert.refTransfert;
      this.employeSituationService.create(this.employeSituation).subscribe(response => {
          this.eventManager.broadcast( { name: 'employeTransfertListModification'} );
      });
  }
  
  subscribeToSaveResponse(result: Observable<EmployeTransfert>) {
      result.subscribe((res: EmployeTransfert) => {
      // console.log(res);
      this.onSaveSuccess(res);
      }); 
  }
  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeTransfertListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
  }
  
  close() {
      this.mode = 1;
  }
  
  /**************************** Détails **************************/
  
  detailsTransfert(id: number) {
      this.mode = 5;
  }
  
  /**************************** Edition **************************/
  
  editTransfert(empT: EmployeTransfert) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeTransfertService.find(+empT.id.codeEmploye, empT.id.dateTransfert).subscribe( (employeTransfert) => {
          this.employeTransfert = employeTransfert;
      });
  }
  
  edit() {
      this.employeTransfertService.delete(this.id, this.d).subscribe( res => {
          this.eventManager.broadcast({name: 'employeTransfertListModification'});
         
          this.employeTransfert.id.codeEmploye = this.id.toString();
          // this.subscribeToSaveResponse(this.employeTransfertService.create(this.employeTransfert));
          this.employeTransfertService.create(this.employeTransfert).subscribe(response => {
              this.onSaveSuccess(response);
          })
      });
      
    //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
      this.employeSituationService.delete(this.id, this.d).subscribe(response => {
          
          //permet d'enregistrer dans la table situation pour gérer l'historique de l'employé
            this.employeSituation.id.codeEmploye = this.employeTransfert.id.codeEmploye;
            this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
            this.employeSituation.id.dateDebutSituation = this.employeTransfert.id.dateTransfert;
            this.employeSituation.dateFinSituation = null;
            this.employeSituation.refSituation = this.employeTransfert.refTransfert;
            this.employeSituationService.create(this.employeSituation).subscribe(response => {
                this.eventManager.broadcast({name: 'employeTransfertListModification'});
            })
      })
      
  }
  
  /**************************** Suppression **************************/
  
  deleteCheck(empT: EmployeTransfert, event: any) {
      this.employeTransfertService.delete(+empT.id.codeEmploye, empT.id.dateTransfert).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeTransfertListModification'});
          this.ngOnInit();
      });
  }

}
