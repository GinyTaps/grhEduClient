import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { NodeCheckEventArgs, NodeSelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import { AuthService } from '../auth.service';

import { EmployeRepAdmin } from '../employe-rep-admin/employe-rep-admin.model';
import { Employe } from '../employe/employe.model';
import { EmployeRepAdminService } from '../employe-rep-admin/employe-rep-admin.service';
import { EmployeService } from '../employe/employe.service';
import { RegroupementService } from '../regroupement/regroupement.service';
import { TypeRegroupementService } from '../type-regroupement/type-regroupement.service';
import { EmployePathologieService } from '../employe-pathologie/employe-pathologie.service';
import { EmployeHandicapService } from '../employe-handicap/employe-handicap.service';
import { EmployeEtatCivilService } from '../employe-etat-civil/employe-etat-civil.service';
import { EmployeFonctionService } from '../employe-fonction/employe-fonction.service';
import { EmployeDiplomeService } from '../employe-diplome/employe-diplome.service';
import { EmployePosteService } from '../employe-poste/employe-poste.service';
import { EmployeStatutService } from '../employe-statut/employe-statut.service';
import { TypeStatutService } from '../type-statut/type-statut.service';
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
import { AdministrationService } from '../administration/administration.service';
import { EtablissementService } from '../etablissement/etablissement.service';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';
import { StructureEduService } from '../structure-education/structure-education.service';
import { TypeStructureEduService } from '../type-structure-edu/type-structure-edu.service';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';
import { StructureEdu } from '../structure-education/structure-education.model';
import { TypeStructureEdu } from '../type-structure-edu/type-structure-edu.model';
import { Administration } from '../administration/administration.model';
import { Etablissement } from '../etablissement/etablissement.model';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';
import { TypeSexe } from '../type-sexe/type-sexe.model';
import { TypeNationaliteService } from '../type-nationalite/type-nationalite.service';
import { TypeSexeService } from '../type-sexe/type-sexe.service';
import { PosteService } from '../poste/poste.service';
import { TypeChaineLocService } from '../type-chaine-loc/type-chaine-loc.service';
import { TypeChaineLoc } from '../type-chaine-loc/type-chaine-loc.model';


@Component({
  selector: 'app-employe-rep-admin',
  templateUrl: './employe-rep-admin.component.html',
  styleUrls: ['./employe-rep-admin.component.css']
})
export class EmployeRepAdminComponent implements OnInit {
    
    // @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

    employeRepAdmin: EmployeRepAdmin = new EmployeRepAdmin();
    employeRepAdmins: EmployeRepAdmin;
    employe: Employe = new Employe();;
    employes: Employe = new Employe();
    employees: Employe;
    postes: Poste;
    poste: Poste = new Poste();
    employePostes: EmployePoste;
    administrations: Administration;
    etablissements: Etablissement;
    administration: Administration = new Administration();
    etablissement: Etablissement = new Etablissement();
    employePathologie: EmployePathologie = new EmployePathologie();
    employePathologies: EmployePathologie;
    employeHandicap: EmployeHandicap = new EmployeHandicap();
    employeEtatCivil: EmployeEtatCivil = new EmployeEtatCivil();
    employeFonction: EmployeFonction = new EmployeFonction();
    employeDiplome: EmployeDiplome = new EmployeDiplome();
    employePoste: EmployePoste = new EmployePoste();
    employeStatut: EmployeStatut = new EmployeStatut();
    typeStatuts: TypeStatut;
    typeEtatCivils: TypeEtatCivil;
    typeFonctions: TypeFonction;
    typeFonction: TypeFonction = new TypeFonction();
    typeChaineLocs: TypeChaineLoc;
    typeDiplomes: TypeDiplome;
    typeHandicaps: TypeHandicap;
    typePathologies: TypePathologie;
    typeStatutEntites: TypeStatutEntite;
    typeStatutEntite: TypeStatutEntite = new TypeStatutEntite();
    structureEdus: StructureEdu;
    structureEdu: StructureEdu = new StructureEdu();
    regroupements: Regroupement;
    regroupement: Regroupement = new Regroupement();
    typeStructureEdu: TypeStructureEdu = new TypeStructureEdu();
    typeStructureEdus: TypeStructureEdu;
    typeNationalite: TypeNationalite = new TypeNationalite();
    typeSexe: TypeSexe = new TypeSexe();
    typeNationalites: TypeNationalite;
    typeSexes: TypeSexe;

/********************** Définition du schéma du Treeview **********************/
    codeReg = 0;
    codeAdm = 0;
    codeAdmPays = 0;
    
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
    notEmpty: boolean;
    choiceP = null;
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
    id:number; idReg:number; idPoste:number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    // typeMotifRepAdmins: TypeMotifRepAdmin;
    
    constructor(
          private employeRepAdminService: EmployeRepAdminService,
          private employeService: EmployeService,
          private posteService: PosteService,
          private administrationService: AdministrationService,
          private etablissementService: EtablissementService,
          private typeStatutEntiteService: TypeStatutEntiteService,
          private structureEduService: StructureEduService,
          private typeStructureEduService: TypeStructureEduService,
          private regroupementService: RegroupementService,
          private typeRegroupementService: TypeRegroupementService,
          private employePathologieService: EmployePathologieService,
          private employeHandicapService: EmployeHandicapService,
          private employeEtatCivilService: EmployeEtatCivilService,
          private employeFonctionService: EmployeFonctionService,
          private employeDiplomeService: EmployeDiplomeService,
          private employePosteService: EmployePosteService,
          private employeStatutService: EmployeStatutService,
          private typeStatutService: TypeStatutService,
          private typeEtatCivilService: TypeEtatCivilService,
          private typeFonctionService: TypeFonctionService,
          private typeChaineLocService: TypeChaineLocService,
          private typeDiplomeService: TypeDiplomeService,
          private typeHandicapService: TypeHandicapService,
          private typePathologieService: TypePathologieService,
          private typeNationaliteService: TypeNationaliteService,
          private typeSexeService: TypeSexeService,
          private eventManager: EventManagerService,
          private exportAsService: ExportAsService,
          private router: Router,
          private authService: AuthService,
          public activatedRoute: ActivatedRoute
          // private typeMotifRepAdminService: TypeMotifRepAdminService,
          ) { }
    
    ngOnInit() {
        this.mode = 1;
        this.checkedT = true;
        
        this.loadAll();
        
        /*this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
            if((params['id']) && (params['d']) ) {
                this.idT = params['id'];
                this.dT = params['d'];
            }
        }); 
        if(this.base64regex.test(this.idT.toString())) {
            this.employeRepAdmin.id.codeEmploye = atob(this.idT.toString());
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.loadEmp(this.id);
        } else {*/
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                if(this.id != null) {
                    this.loadEmp(this.id);
                    this.employeRepAdminService.findLast(this.id).subscribe(data => {
                        this.employeRepAdmin = data;
                    })
                }
                
            });  
        // }
    }
    
/********************** Gestion des évènements du Treeview **********************/
    nodeChecked(args: NodeCheckEventArgs) {
        for(let a of args.data) {
            // console.log(a.id);
            this.codeReg = +a.id;
            this.getAdministration(this.codeReg);
        }
    }
    
    nodeSelected(args: NodeSelectEventArgs) {
        for(let a of Array(args.nodeData)) {
            //console.log(a.id);
            this.codeReg = +a.id;
            this.getAdministration(this.codeReg);
        }
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
    
    getAdministration(r: number) {
        this.administrationService.searchList(r).subscribe(data => {
            this.administrations = data;
        });
    }
    
    getCodeA(c: Administration) {
        // console.log(c);
        this.codeAdm = c.codeAdministration;
        this.codeAdmPays = c.codeAdministrationPays;
        
    }

/******************************** Fin gestion ***************************************/    
    
    /************************** Exportation sous excel ou pdf **********************/
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
        
        /*this.employeRepAdminService.getAll().subscribe(data => { 
            this.employeRepAdmins = data;
            // console.log(this.employeRepAdmins);
        });*/
        
        this.employePosteService.getAll().subscribe(data => { 
            this.employePostes = data;
        });
        
        this.employePathologieService.getAll().subscribe(data => {
            this.employePathologies = data;
        })
        
        /*this.employeService.getAll().subscribe(data => { 
                this.employees = data; // Array(data);
        });*/
        this.typeSexeService.getAll().subscribe(data => {
            this.typeSexes = data;
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
        
        this.typeNationaliteService.getAll().subscribe(data => {
            this.typeNationalites = data;
        })
        
        this.typeHandicapService.getAll().subscribe(data => {
            this.typeHandicaps = data;
        })
        
        this.typePathologieService.getAll().subscribe(data => {
            this.typePathologies = data;
        })
        
        
        this.typeChaineLocService.getAll().subscribe(data => {
            this.typeChaineLocs = data;
        });
        
        /*this.administrationService.getAll().subscribe(data => {
            this.administrations = data;
        })*/
        
        this.etablissementService.getAll().subscribe(data => {
            this.etablissements = data;
        })
        
        this.regroupementService.getAll().subscribe(data => {
            this.regroupements = data;
        })
        
        this.structureEduService.getAll().subscribe(data => {
            this.structureEdus = data;
        })
        
        this.typeStatutEntiteService.getAll().subscribe(data => {
            this.typeStatutEntites = data;
        })
        
        this.typeStatutService.getAll().subscribe(data => {
            this.typeStatuts = data;
        })
        
        
        this.typeStructureEduService.getAll().subscribe(data => {
            this.typeStructureEdus = data;
        })
        
    }
    
    loadOne(id) {
        /*this.typeDiplomeService.find(id).subscribe(data => {
            this.typeDiplomes = data;
        })
        
        this.typeEtatCivilService.find(id).subscribe(data => {
            this.typeEtatCivils = data;
        })
        
        this.typeFonctionService.findLast(id).subscribe(data => {
            this.typeFonctions = data;
        })
        
        this.typeHandicapService.findLast(id).subscribe(data => {
            this.typeHandicaps = data;
        })
        
        this.typeNationaliteService.find(id).subscribe(data => {
            this.typeNationalites = data;
        })
        
        this.typePathologieService.findLast(id).subscribe(data => {
            this.typePathologies = data;
        })
        
        this.typeSexeService.find(id).subscribe(data => {
            this.typeSexes = data;
        })*/
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
        this.loadAll();
    }
    
    applySearch() {  
        if( this.choiceP!= null && this.choiceP.match('poste') ) {
            
            // console.log('******** Requête avec la prise en compte du poste *********');
            
            this.employeService.searchRWithPAdm(this.employes.nomEmploye, this.employes.matriculeEmploye, 
                    this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil, +this.employeFonction.id.codeTypeFonction, 
                    +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                    +this.employeDiplome.id.codeTypeDiplome, this.codeAdmPays, this.codeReg).subscribe(data => {
                        this.employees = data;
                    });
        } else if( this.choiceP!= null && this.choiceP.match('noposte') ) {
            // console.log('******** Requête sans la prise en compte du poste *********');
            this.employeService.searchRWithOPAdm(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
                    +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                    +this.employeDiplome.id.codeTypeDiplome, this.codeAdmPays, this.codeReg).subscribe(data => {
                this.employees = data; 
            });
        }
        else {
            /*this.employeRepAdminService.getAll().subscribe(data => { 
                this.employeRepAdmins = data;
            });*/
            
            this.employeService.searchR(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
                    +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                    +this.employeDiplome.id.codeTypeDiplome, this.codeReg).subscribe(data => {
                        this.employees = data;
                        /*for(let e of this.employees) {
                            this.employePathologieService.findLast(e.codeEmploye).subscribe(data => {
                                this.employePathologie = data;
                            });
                        }*/
                        
                    });
                    
        }
        
    }
    
    createEmpAdmin() {
        this.mode = 2;
    }
    
    editEmpAdmin(emp: Employe) {
        this.mode = 3;
        this.loadEmp(this.id);
    }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }
    
    load(empR: EmployeRepAdmin) {
        this.employeRepAdminService.find(+empR.id.codeEmploye, empR.id.dateEmployeRepAdmin).subscribe((employeRepAdmin) => {
        this.employeRepAdmin = employeRepAdmin;
        });
    }
    
    /**************************** Création **************************/
    
    createRepAdmin() {
        this.mode = 2;
    }
    
    save() {
        this.employeService.create(this.employe).subscribe(res => {
            this.onSaveSuccess(res);
            this.employePoste.id.codeEmploye = res.codeEmploye.toString();
            this.posteService.create(this.poste).subscribe(res => {
                this.employePoste.id.codePoste = res.codePoste.toString();
                this.employePosteService.create(this.employePoste).subscribe(res => {
                    this.onSaveSuccess(res);
                });
            });
            this.employeRepAdmin.id.codeEmploye = res.codeEmploye.toString();
            this.subscribeToSaveResponse(this.employeRepAdminService.create(this.employeRepAdmin));
        });
        
    }
    
    subscribeToSaveResponse(result: Observable<EmployeRepAdmin>) {
        result.subscribe((res: EmployeRepAdmin) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeRepAdminListModification'} );
        this.mode = 1;
        // this.router.navigateByUrl('/employe-detail/'+this.id);
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsRepAdmin(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editRepAdmin(empR: EmployeRepAdmin, codeReg: number, codePoste: number) {
        this.mode = 3;
        this.idReg = codeReg;
        this.idPoste = codePoste;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.d = params['d'];
        });
        this.employeRepAdminService.find(+empR.id.codeEmploye, empR.id.dateEmployeRepAdmin).subscribe( (employeRepAdmin) => {
            this.employeRepAdmin = employeRepAdmin;
        });
    }
    
    edit() {
        this.employeRepAdminService.delete(this.id, this.d).subscribe( res => {
            this.eventManager.broadcast({name: 'employeRepAdminListModification'});
            this.posteService.delete(this.idPoste).subscribe(res => {
                this.onSaveSuccess(res);
            })
            /*this.employePosteService.delete(this.id, d).subscribe(res => {
                this.onSaveSuccess(res);
            })*/
        });
        
        this.employeService.update(this.employe).subscribe(res => {
            this.onSaveSuccess(res);
            this.employePoste.id.codeEmploye = res.codeEmploye.toString();
            this.posteService.create(this.poste).subscribe(res => {
                this.employePoste.id.codePoste = res.codePoste.toString();
                this.employePosteService.create(this.employePoste).subscribe(res => {
                    this.onSaveSuccess(res);
                });
            });
            this.employeRepAdmin.id.codeEmploye = res.codeEmploye.toString();
            this.subscribeToSaveResponse(this.employeRepAdminService.create(this.employeRepAdmin));
        });
        /*this.employeRepAdmin.id.codeEmploye = this.id.toString();
        this.employeRepAdmin.id.dateEmployeRepAdmin = this.d;
        this.subscribeToSaveResponse(this.employeRepAdminService.create(this.employeRepAdmin));*/
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empR: EmployeRepAdmin, event: any) {
        this.employeRepAdminService.delete(+empR.id.codeEmploye, empR.id.dateEmployeRepAdmin).subscribe((response) => {
            this.eventManager.broadcast({name: 'employeRepAdminListModification'});
            this.ngOnInit();
        });
    }

}
