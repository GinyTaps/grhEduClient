import { Component, OnInit } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';

import { EmployeEtablissement } from '../employe-etablissement/employe-etablissement.model';
import { EmployeEtablissementService } from '../employe-etablissement/employe-etablissement.service';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../employe/employe.model';
import { RegroupementService } from '../regroupement/regroupement.service';
import { TypeRegroupementService } from '../type-regroupement/type-regroupement.service';
import { EmployePathologieService } from '../employe-pathologie/employe-pathologie.service';
import { EmployeHandicapService } from '../employe-handicap/employe-handicap.service';
import { EmployeEtatCivilService } from '../employe-etat-civil/employe-etat-civil.service';
import { EmployeFonctionService } from '../employe-fonction/employe-fonction.service';
import { EmployeDiplomeService } from '../employe-diplome/employe-diplome.service';
import { EmployePosteService } from '../employe-poste/employe-poste.service';
import { EmployeStatutService } from '../employe-statut/employe-statut.service';
import { TypeChaineLoc } from '../type-chaine-loc/type-chaine-loc.model';
import { TypeStatutService } from '../type-statut/type-statut.service';
import { TypeChaineLocService } from '../type-chaine-loc/type-chaine-loc.service';
import { TypeEtatCivilService } from '../type-etat-civil/type-etat-civil.service';
import { TypeFonctionService } from '../type-fonction/type-fonction.service';
import { TypeDiplomeService } from '../type-diplome/type-diplome.service';
import { TypeHandicapService } from '../type-handicap/type-handicap.service';
import { TypePathologieService } from '../type-pathologie/type-pathologie.service';
import { Poste } from '../poste/poste.model';
import { EmployePathologie } from '../employe-pathologie/employe-pathologie.model';
import { EmployeHandicap } from '../employe-handicap/employe-handicap.model';
import { EmployeEtatCivil } from '../employe-etat-civil/employe-etat-civil.model';
import { EmployeFonction } from '../employe-fonction/employe-fonction.model';
import { EmployeDiplome } from '../employe-diplome/employe-diplome.model';
import { EmployePoste } from '../employe-poste/employe-poste.model';
import { EmployeStatut } from '../employe-statut/employe-statut.model';
import { TypeStatut } from '../type-statut/type-statut.model';
import { TypeEtatCivil } from '../type-etat-civil/type-etat-civil.model';
import { TypeFonction } from '../type-fonction/type-fonction.model';
import { TypeDiplome } from '../type-diplome/type-diplome.model';
import { TypeHandicap } from '../type-handicap/type-handicap.model';
import { TypePathologie } from '../type-pathologie/type-pathologie.model';
import { TypeRegroupement } from '../type-regroupement/type-regroupement.model';
import { Regroupement } from '../regroupement/regroupement.model';
import { Administration } from '../administration/administration.model';
import { AdministrationService } from '../administration/administration.service';
import { Etablissement } from '../etablissement/etablissement.model';
import { EtablissementService } from '../etablissement/etablissement.service';
import { StructureEdu } from '../structure-education/structure-education.model';
import { TypeStructureEdu } from '../type-structure-edu/type-structure-edu.model';
import { TypeStructureEduService } from '../type-structure-edu/type-structure-edu.service';
import { TypeSecteur } from '../type-secteur/type-secteur.model';
import { NodeCheckEventArgs, NodeSelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employe-rg',
  templateUrl: './employe-rg.component.html',
  styleUrls: ['./employe.component.css']
})

    export class EmployeRGComponent implements OnInit {
        
        employeEtablissement: EmployeEtablissement = new EmployeEtablissement();
        employe: Employe;
        administrations: Administration;
        administration: Administration = new Administration();
        structureEdu: StructureEdu = new StructureEdu();
        etablissements: Etablissement;
        postes: Poste;
        employes: Employe = new Employe();
        employees: Employe;
        employePathologie: EmployePathologie = new EmployePathologie();
        employeHandicap: EmployeHandicap = new EmployeHandicap();
        employeEtatCivil: EmployeEtatCivil = new EmployeEtatCivil();
        employeFonction: EmployeFonction = new EmployeFonction();
        employeDiplome: EmployeDiplome = new EmployeDiplome();
        employePoste: EmployePoste = new EmployePoste();
        employeStatut: EmployeStatut = new EmployeStatut();
        typeChaineLocs: TypeChaineLoc;
        typeStatuts: TypeStatut;
        typeSecteur: TypeSecteur = new TypeSecteur();
        typeEtatCivils: TypeEtatCivil;
        typeFonctions: TypeFonction;
        typeDiplomes: TypeDiplome;
        typeHandicaps: TypeHandicap;
        typePathologies: TypePathologie;
        typeRegroupements: TypeRegroupement;
        typeStructureEdus: TypeStructureEdu;

/********************** Définition du schéma du Treeview **********************/
    codeReg = 0;
    codeAdm = 0;
    codeAdmPays = 0;
    codeEtab = 0;
    codeAdmEtab = null;
    public treeT: Object[] =[{ regroupement : {codeRegroupement:0, libelleRegroupement:'', ordreRegroupement:0, codeRegroupPays:0, codeTypeRegroupement:0},
        codeRegroupementParent:0, listRegFils:[{  regroupement : {codeRegroupement:0, libelleRegroupement:'', ordreRegroupement:0, codeRegroupPays:0, codeTypeRegroupement:0},
                                                  codeRegroupementParent:0, listRegFils:[{ codeRegroupementParent:0, regroupement : {codeRegroupement:0, libelleRegroupement:'', ordreRegroupement:0, codeRegroupPays:0, codeTypeRegroupement:0}
                                                                                          }]   
                                                }]
       }];
    
    public treeF: Object = {
        dataSource: null, // this.treeT,
        pid: 'regroupementcodeRegroupementParent',
        text: 'regroupement.libelleRegroupement',
        id: 'regroupement.codeRegroupement',
        text2: 'regroupement.ordreRegroupement',
        text3: 'regroupement.codeRegroupPays',
        text4: 'regroupement.codeTypeRegroupement',
        child:'listRegFils'
    };
/***************************************** Fin définition ***************************************/  

        checkedT: boolean;
        choiceP = null;
        choiceAE = null;
        annee: string = null // pour l'année de recherche
        /***********=== pour les exportations ===************/
        exportAsPdf: ExportAsConfig = {
                type: 'pdf', // the type you want to download
                elementId: 'pdfTable', // the id of html/table element
              
        }
        exportAsXls: ExportAsConfig = {
                type: 'xlsx', // the type you want to download
                elementId: 'pdfTable', // the id of html/table element
              
        }
        
        subscription: Subscription;
        choixRecherche: number;
        id:number;
        d: string;
        mode: number;
        idT:number = 0; 
        dT: string = '';
        base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
    constructor(
          private employeEtablissementService: EmployeEtablissementService,
          private employeService: EmployeService,
          private administrationService: AdministrationService,
          private etablissementService: EtablissementService,
          private regroupementService: RegroupementService,
          private typeRegroupementService: TypeRegroupementService,
          private employePathologieService: EmployePathologieService,
          private employeHandicapService: EmployeHandicapService,
          private employeEtatCivilService: EmployeEtatCivilService,
          private employeFonctionService: EmployeFonctionService,
          private employeDiplomeService: EmployeDiplomeService,
          private employePosteService: EmployePosteService,
          private employeStatutService: EmployeStatutService,
          private typeChaineLocService: TypeChaineLocService,
          private typeStatutService: TypeStatutService,
          private typeStructureEduService: TypeStructureEduService,
          private typeEtatCivilService: TypeEtatCivilService,
          private typeFonctionService: TypeFonctionService,
          private typeDiplomeService: TypeDiplomeService,
          private typeHandicapService: TypeHandicapService,
          private typePathologieService: TypePathologieService,
          private eventManager: EventManagerService,
          private exportAsService: ExportAsService,
          private router: Router,
          private authService: AuthService,
          public activatedRoute: ActivatedRoute
          ) { }
    
    ngOnInit() {
        this.checkedT = true;
        
        this.loadAll();
        
        /*this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
            if((params['id']) && (params['d']) ) {
                this.idT = params['id'];
                this.dT = params['d'];
            }
        }); 
        if(this.base64regex.test(this.idT.toString())) {
            this.employeEtablissement.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {*/
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                if(this.id != null) {
                    this.loadEmp(this.id);
                    this.employeEtablissementService.findLast(this.id).subscribe(data => {
                        this.employeEtablissement = data;
                    })
                }
                
            });
            
        //}
    }
    
/********************** Gestion des évènements du Treeview **********************/
    nodeChecked(args: NodeCheckEventArgs) {
        // console.log(args);
        for(let a of args.data) {
            // console.log(a.id);
            this.codeReg = +a.id;
        }
        /*console.log('********** Regroupement coché ************');
        console.log(this.codeReg);
        console.log('*************************************************');*/
    }
    
    nodeSelected(args: NodeSelectEventArgs) {
        // console.log(args);
        for(let a of Array(args.nodeData)) {
            // console.log(a.id);
            this.codeReg = +a.id;
        }
        /*console.log('********** Regroupement sélectionné ************');
        console.log(this.codeReg);
        console.log('*************************************************');*/
    }
    
/**************************** Fin Treeview **********************************/ 
    
 /********************* Pour la gestion des localités *************************/
    getChaine(idTypeChaine: number) {
          if(idTypeChaine) {
               
                let data: Object = new DataManager({
                    url: this.regroupementService.resourceChaineUrl+idTypeChaine, 
                    adaptor: new UrlAdaptor,
                    crossDomain: true,
                    headers: [{ Authorization: this.authService.getHeaderForTree()}]
                }).executeQuery(new Query()).then((r:any) => {
                    return this.treeF = {
                            dataSource: r.result,  // data,
                            pid: 'regroupementcodeRegroupementParent',
                            text: 'regroupement.libelleRegroupement',
                            id: 'regroupement.codeRegroupement',
                            text2: 'regroupement.ordreRegroupement',
                            text3: 'regroupement.codeRegroupPays',
                            text4: 'regroupement.codeTypeRegroupement',
                            child:'listRegFils'
                    }
                });
          }
    }
   
/*************************** Gestion du type de recherche *************************/    
    onKey(event: any) { 
        /*console.log('**************** Choix *****************');
        console.log(event.target.value);
        console.log('****************************************');*/
        if(event.target.value.match('administration')) {
            this.choixRecherche = 1;
            this.getAdministration(this.codeReg)
        } else if(event.target.value.match('ecole')) {
            this.choixRecherche = 2;
            this.getEtablissement(this.codeReg)
        } else {
            this.choixRecherche = 3;
        }
        
      }
    
    getAdministration(r: number) {
        this.administrationService.searchList(r).subscribe(data => {
            this.administrations = data;
        });
    }
    
    getEtablissement(r: number) {
        this.etablissementService.searchList(r).subscribe(data =>{
            this.etablissements = data;
        }); 
    }
    
    getCodeA(c: Administration) {
        // console.log(c);
        this.codeAdm = c.codeAdministration;
        this.codeAdmPays = c.codeAdministrationPays;
        
    }
    
    getCodeE(c: Etablissement) {
        // console.log(c);
        this.codeEtab = c.codeEtablissement;
        this.codeAdmEtab = c.codeAdministratifEtablissement;
    }
 
/********************************** Fin recherche *****************************/
    
/******************************* Exportation sous excel ou pdf *******************************/
    exportAsPDF() {
        this.exportAsService.save(this.exportAsPdf, 'PdfFileName').subscribe(() => {
          // save started
        });
      }
    
    exportAsExcel() {
        this.exportAsService.save(this.exportAsXls, 'XlsxFileName').subscribe(() => {
          });
    }
 /********************************* Fin exportation *********************************/

    
    loadAll() {
        
        /*this.employeService.getAll().subscribe(data => { 
                this.employees = data; // Array(data);
        });*/
        
        this.typeChaineLocService.getAll().subscribe(data => {
            this.typeChaineLocs = data;
        });
        
        this.typeStatutService.getAll().subscribe(data => {
            this.typeStatuts = data;
        })
        
        this.typeStructureEduService.getAll().subscribe(data => {
            this.typeStructureEdus = data;
        })
        
        this.typeDiplomeService.getAll().subscribe(data => {
            this.typeDiplomes = data;
        })
        
        this.typeEtatCivilService.getAll().subscribe(data => {
            this.typeEtatCivils = data;
        })
        
        this.typeFonctionService.getAll().subscribe(data => {
            this.typeFonctions = data;
        })
        
        this.typeHandicapService.getAll().subscribe(data => {
            this.typeHandicaps = data;
        })
        
        this.typePathologieService.getAll().subscribe(data => {
            this.typePathologies = data;
        })
        
    }
    
    ifChecked(event) {
        if(event.target.checked) { // this.checkContent) {
            this.checkedT = false;
        } else
            this.checkedT = true;
    }
    
    reset() {
        this.employes.matriculeEmploye = null;
        this.employes.nomEmploye = null;
        this.employes.dateEngEmploye = null;
        this.employeStatut.id.codeTypeStatut = null;
        this.employePathologie.id.codeTypePathologie = null;
        this.employeEtatCivil.id.codeTypeEtatCivil = null;
        this.employeFonction.id.codeTypeFonction = null;
        this.employeDiplome.id.codeTypeDiplome = null;
        this.employeHandicap.id.codeTypeHandicap = null;
        this.choiceP = null;
        this.choiceAE = null;
        this.loadAll();
    }
    
    applySearch() {
        
        /******************* =============Recherche des employés dans les administrations============== **********************/
        if(this.choiceAE != null && this.choiceAE.match('administration')) {
            /*console.log(this.employes.matriculeEmploye);
            console.log(this.employes.nomEmploye);
            console.log(this.employes.dateEngEmploye);
            console.log(this.employeStatut.id.codeTypeStatut);
            console.log(this.employePathologie.id.codeTypePathologie);
            console.log(this.employeEtatCivil.id.codeTypeEtatCivil);
            console.log(this.employeFonction.id.codeTypeFonction);
            console.log(this.employeDiplome.id.codeTypeDiplome);
            console.log(this.employeHandicap.id.codeTypeHandicap);*/
            
            if(this.choiceP != null && this.choiceP.match('poste') ) {
                /******************* =============Recherche des employés ayant un poste dans une administration============== **********************/
                console.log('******** Requête avec la prise en compte du poste et des administrations *********');
                this.employeService.searchRWithPAdmG(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
                        +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                        +this.employeDiplome.id.codeTypeDiplome, this.codeReg, this.codeAdmPays, this.structureEdu.codeTypeStructureEdu, this.administration.nomAdministration, this.structureEdu.libelleStructureEdu).subscribe(data =>{
                            this.employees = data;
                        });
            } 
            /******************* =============Recherche des employés n'ayant pas de poste dans une administration============== **********************/
            else if(this.choiceP != null && this.choiceP.match('noposte')) {
                console.log('******** Requête avec la prise en compte du poste et des administrations *********');
                this.employeService.searchRWithOPAdmG(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil, 
                        +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap, 
                        +this.employeDiplome.id.codeTypeDiplome, this.codeReg, this.codeAdmPays, this.structureEdu.codeTypeStructureEdu, this.administration.nomAdministration, this.structureEdu.libelleStructureEdu).subscribe(data =>{
                            this.employees = data;
                        });
            } 
            else {
                /******************* =============Recherche des employés n'ayant pas de poste dans une administration============== **********************/
                    console.log('******** Requête avec la prise en compte du poste et des administrations *********');
                    this.employeService.searchRWithOPAdmG(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
                            +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                            +this.employeDiplome.id.codeTypeDiplome, this.codeReg, this.codeAdmPays, this.structureEdu.codeTypeStructureEdu, this.administration.nomAdministration, this.structureEdu.libelleStructureEdu).subscribe(data =>{
                                this.employees = data;
                            });
                } 
        }
        /******************* =============Recherche dans les établissements ============== **********************/
        else if(this.choiceAE != null && this.choiceAE.match('ecole')) {
            
            /******************* =============Recherche des employés ayant un poste dans un établissement============== **********************/
            if(this.choiceP != null && this.choiceP.match('poste')) {
                console.log('******** Requête avec la prise en compte du poste et des administrations *********');
                this.employeService.searchRWithPEtabG(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, this.employe.dateNaissEmploye, this.annee, 
                        +this.employeEtatCivil.id.codeTypeEtatCivil, +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, 
                        +this.employeHandicap.id.codeTypeHandicap, +this.employeDiplome.id.codeTypeDiplome, this.codeReg, this.typeSecteur.libelleTypeSecteur, this.codeEtab, this.codeAdmEtab).subscribe(data =>{
                            this.employees = data;
                        });
            } 
            /******************* =============Recherche des employés n'ayant pas de poste dans un établissement============== **********************/
            else if(this.choiceP != null && this.choiceP.match('noposte')) {
                console.log('******** Requête avec la prise en compte du poste et des administrations *********');
                this.employeService.searchRWithOPEtabG(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, this.employe.dateNaissEmploye, this.annee, 
                        +this.employeEtatCivil.id.codeTypeEtatCivil, +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, 
                        +this.employeHandicap.id.codeTypeHandicap, +this.employeDiplome.id.codeTypeDiplome, this.codeReg, this.typeSecteur.libelleTypeSecteur, this.codeEtab, this.codeAdmEtab).subscribe(data =>{
                            this.employees = data;
                        });
            } 
            /******************* =============Recherche des employés dans un établissement============== **********************/
            else {
                console.log('******** Requête avec la prise en compte du poste et des écoles *********');
                this.employeService.searchREG(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, this.employe.dateNaissEmploye, this.annee, 
                        +this.employeEtatCivil.id.codeTypeEtatCivil, +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, 
                        +this.employeHandicap.id.codeTypeHandicap, +this.employeDiplome.id.codeTypeDiplome, this.codeReg, this.typeSecteur.libelleTypeSecteur, this.codeEtab, this.codeAdmEtab).subscribe(data =>{
                            this.employees = data;
                        });
            }
            
        }
        /******************* =============Recherche sur les employés uniquement============== **********************/
        else {
            /******************* =============Recherche des employés ayant un poste============== **********************/
            if(this.choiceP != null && this.choiceP.match('poste')) {
                console.log('******** Requête avec la prise en compte du poste et des administrations *********');
                this.employeService.searchRWithP(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
                        +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                        +this.employeDiplome.id.codeTypeDiplome, this.codeReg).subscribe(data => {
                            this.employees = data;
                        });
            }
            else {
                /******************* =============Recherche des employés n'ayant pas de poste============== **********************/
                console.log('******** Requête sur tous les employés *********');
                this.employeService.searchRWithOP(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
                        +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                        +this.employeDiplome.id.codeTypeDiplome, this.codeReg).subscribe(data => {
                    this.employees = data; // Array(data);
                    // console.log(this.employees);
                });
            }
        }
        
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empE: EmployeEtablissement) {
      this.employeEtablissementService.find(empE).subscribe((employeEtablissement) => {
          this.employeEtablissement = employeEtablissement;
      });
    }
    
    /**************************** Création **************************/
    
    createEtablissement() {
      this.mode = 2;
    }
    
    save() {
      this.subscribeToSaveResponse(this.employeEtablissementService.create(this.employeEtablissement));
    }
    
    subscribeToSaveResponse(result: Observable<EmployeEtablissement>) {
      result.subscribe((res: EmployeEtablissement) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeEtablissementListModification'} );
      this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
      this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsEtablissement(id: number) {
      this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editEtablissement(empE: EmployeEtablissement) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.d = params['d'];
      });
      this.employeEtablissementService.find(empE).subscribe( (employeEtablissement) => {
          this.employeEtablissement = employeEtablissement;
      });
    }
    
    edit() {
        
        this.employeEtablissementService.delete(this.id, this.d).subscribe( (response) => {
          this.eventManager.broadcast({name: 'employeEtablissementListModification'});
      });
      this.employeEtablissement.id.codeEmploye = this.id.toString();
      this.employeEtablissement.id.dateEmployeEtab = this.d;
      this.subscribeToSaveResponse(this.employeEtablissementService.create(this.employeEtablissement));
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empE: EmployeEtablissement, event: any) {
      this.employeEtablissementService.delete(+empE.id.codeEmploye, empE.id.dateEmployeEtab).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeEtablissementListModification'});
          this.ngOnInit();
      });
    }

}
