import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chomeur } from '../chomeur/chomeur.model';
import { ChomeurService } from '../chomeur/chomeur.service';
import { Poste } from '../poste/poste.model';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Regroupement } from '../regroupement/regroupement.model';
import { TypeEtatCivil } from '../type-etat-civil/type-etat-civil.model';
import { TypeSexe } from '../type-sexe/type-sexe.model';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';
import { RegroupementService } from '../regroupement/regroupement.service';
import { TypeEtatCivilService } from '../type-etat-civil/type-etat-civil.service';
import { TypeNationaliteService } from '../type-nationalite/type-nationalite.service';
import { TypeSexeService } from '../type-sexe/type-sexe.service';
import { EmployeAffectation } from '../employe-affectation/employe-affectation.model';
import { EmployeAffectationService } from '../employe-affectation/employe-affectation.service';
import { EventManagerService } from '../event-manager.service';
import { Employe } from '../employe/employe.model';
import { EmployeService } from '../employe/employe.service';
import { PosteService } from '../poste/poste.service';
import { EmployePoste } from '../employe-poste/employe-poste.model';
import { EmployePosteService } from '../employe-poste/employe-poste.service';

@Component({
  selector: 'app-chomeur-affectation',
  templateUrl: './chomeur-affectation.component.html',
  styleUrls: ['./chomeur.component.css']
})
export class ChomeurAffectationComponent implements OnInit, OnDestroy {
    
    chomeur: Chomeur;
    poste: Poste = new Poste();
    employe: Employe = new Employe();
    employeAffectation: EmployeAffectation = new EmployeAffectation();
    employePoste: EmployePoste = new EmployePoste();
    postes: Poste;
    regroupement: Regroupement;
    typeEtatCivil: TypeEtatCivil;
    typeSexe: TypeSexe;
    typeNationalite: TypeNationalite;
    subscription: Subscription;
    codeEmp; number;
    id:number;
    d: string;
    show: boolean;
    hide: boolean;
    panelTitle: string;
    mode: number;
    choix: string;
    choixVal: string = 'E';

    constructor(
            private employeService: EmployeService,
            private employeAffectationService: EmployeAffectationService,
            private employePosteService: EmployePosteService,
            private posteService: PosteService,
            private chomeurService: ChomeurService,
            private regroupementService: RegroupementService,
            private typeEtatCivilService: TypeEtatCivilService,
            private typeNationaliteService: TypeNationaliteService,
            private typeSexeService: TypeSexeService,
            private eventManager: EventManagerService,
            private router: Router,
            public activatedRoute: ActivatedRoute
        ) { }

    ngOnInit() {
        this.mode = 1;
        this.loadAll();
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            if((params['id']) && (params['d']) && !(params['d'] === this.choixVal)) {
                this.editAffectation(params['id'], params['d']);
            }
            this.id = +params['id'];
            this.loadChom(this.id);
            
            this.choix = params['d'];
            if(!this.choix) {
                this.affAdmin();
            } else {
                this.affEcole();
            }
        });
    
    }
    
    loadAll() {
        this.posteService.getAll().subscribe((poste) => {
            this.postes = poste;
        })
    }

    loadChom(id) {
        this.chomeurService.find(id).subscribe((chomeur) => {
            this.chomeur = chomeur;
        });
    }
    
    load(empA: EmployeAffectation) {
        this.employeAffectationService.find(+empA.id.codeEmploye, empA.id.dateEmployeAffectation).subscribe((employeAffectation) => {
            this.employeAffectation = employeAffectation;
        });
    }
    
/*********************************************** Création **********************************************/
    
    createAffectation() {
        this.mode = 1;
    }
    
    save() {
/********************** Enregistrement du chomeur en  Employe d'abord *****************************/   
        this.saveNewEmp();
    }
    
    saveNewEmp() {
        this.employe.nomEmploye = this.chomeur.nomChomeur;
        this.employe.prenomEmploye = this.chomeur.prenomChomeur;
        this.employe.dateNaissEmploye = this.chomeur.dateNaissChomeur;
        this.employe.cinEmploye = this.chomeur.cinChomeur;
        this.employe.dateCinEmploye = this.chomeur.dateCinChomeur;
        this.employe.telEmploye = this.chomeur.telChomeur;
        this.employe.emailEmploye = this.chomeur.emailChomeur;
        this.employe.codeTypeSexe = this.chomeur.codeTypeSexe;
        this.employe.codeTypeNationalite = this.chomeur.codeTypeNationalite;
        this.employe.dateEngEmploye = this.employeAffectation.id.dateEmployeAffectation;
        this.employe.confirmeYN = 1;
        this.employeService.create(this.employe).subscribe((res: Employe) => {
            /*console.log('************ Code de lemploye généré: ');
            console.log(this.codeEmp);
            console.log('***********');*/
            this.onSaveSuccess(res);
/********************** Enregistrement dans Employe Poste ********************************/           
            this.codeEmp = res.codeEmploye;
            this.employePoste.id.codeEmploye = this.codeEmp;
            this.employePoste.id.codePoste = this.poste.codePoste.toString();
            this.employePoste.id.dateDebutEmployePoste = this.employeAffectation.id.dateEmployeAffectation;
            this.employePosteService.create(this.employePoste).subscribe((res:EmployePoste) => {
                this.onSaveSuccess(res);
/********************** Enregistrement de l'affectation **********************************/        
                this.employeAffectation.id.codeEmploye = this.codeEmp;
                this.subscribeToSaveResponse(this.employeAffectationService.create(this.employeAffectation));
            });
        })
    }
    
    subscribeToSaveResponse(result: Observable<EmployeAffectation>) {
        result.subscribe((res: EmployeAffectation) => {
            // console.log(res);
            this.onSaveSuccess(res);
            }); 
      }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'chomeurAffectationListModification'} );
        this.mode = 1;
        this.loadAll();
        this.loadChom(this.id);
      }
      
      close() {
        this.mode = 1;
      }
    
    /**************************** Détails **************************/
    
    detailsAffectation(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editAffectation(id: number, d: string) {
        this.mode = 2;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.employeAffectation.id.codeEmploye = params['id'];
            this.employeAffectation.id.dateEmployeAffectation = params['d'];
            this.load(this.employeAffectation);
            this.id = params['id'];
            this.d = params['d'];
        });
    }
    
    edit() {
        this.employeAffectationService.delete(this.id, this.d).subscribe( (response) => {
            this.eventManager.broadcast({name: 'chomeurAffectationListModification'});
            this.employeAffectation.id.codeEmploye = this.id.toString();
            this.subscribeToSaveResponse(this.employeAffectationService.create(this.employeAffectation));
        });
        
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(empA: EmployeAffectation, event: any) {
        this.employeAffectationService.delete(+empA.id.codeEmploye, empA.id.dateEmployeAffectation).subscribe((response) => {
            this.eventManager.broadcast({name: 'chomeurAffectationListModification'});
            this.ngOnInit();
        });
    }
    
    affAdmin(){
        this.hide = false;
        this.show = true;
        this.panelTitle = 'dans une administration';
        return class{active};
    }
    
    affEcole(){
        this.hide = true;
        this.show = false;
        this.panelTitle = 'dans une école';
        return class{active};
    }
    
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    
    
}
