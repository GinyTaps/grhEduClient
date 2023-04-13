
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { TypeMotifConge } from '../type-motif-conge/type-motif-conge.model';
import { EmployeConge } from './employe-conge.model';
import { Employe } from '../employe/employe.model';
import { EmployeService, ResponseWrapper } from '../employe/employe.service';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeCongeService, DataUtils } from './employe-conge.service';
import { TypeMotifCongeService } from '../type-motif-conge/type-motif-conge.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeCongePopupService } from './employe-conge-popup.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
  selector: 'app-employe-conge',
  templateUrl: './employe-conge-dialog.component.html',
  styleUrls: ['./employe-conge.component.css'],
  providers: [DatePipe]
})

export class EmployeCongeDialogComponent implements OnInit {

    // employeConge: EmployeConge;
    employeConge: EmployeConge = new EmployeConge();
    employes: Employe [];
    employe: Employe;
    typeMotifConges: TypeMotifConge;
    employeSituation: EmployeSituation = new EmployeSituation();
    employeSituationT: EmployeSituation = new EmployeSituation();
    errorEmpExists: string;
    errorDateExists: string;
    errorDureeExists: string;
    // success: boolean;
    testF: String = 'false';
    testT: String = 'true';
    subscription: Subscription;
    dateValid: String;
    dureeValid: String;
    // dataExists: boolean;
    conge: any;
    /*dateOld: String = null;
    typeCongeOld: number = 0;
    employeOld: number = 0;
    codeOld: number;
    congeExists: boolean = true;
    doNotMatch: string;*/
    error: string;
    hide: boolean = true;
    id: number;
    d: string;
    codeTypeSituation: number = 2;
    

    constructor(
    public activeModal: NgbActiveModal,
    private employeService: EmployeService,
    private employeSituationService: EmployeSituationService,
    private employeCongeService: EmployeCongeService,
    private employeCongePopupservice: EmployeCongePopupService,
    private typeMotifCongeService: TypeMotifCongeService,
    private datePipe: DatePipe,
    private eventManager: EventManagerService,
    private location: Location,
    // private dataUtils: DataUtils,
    private router: Router,
    public activatedRoute: ActivatedRoute // public router: Router
    ) 
    {
  }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            // this.load(params['id']);
            this.employeConge.id.codeEmploye = params['id'];
            this.id = params['id'];
            this.d = params['d'];
        });
        // this.success = false;
        this.conge = null;
        /*this.dateOld = this.employeCongePopupservice.dateOld;
        this.typeCongeOld = this.employeCongePopupservice.typeCongeOld;
        this.codeOld = this.employeCongePopupservice.employeOld;
        this.dataExists = false;*/
        
        this.employeService.find(+this.employeConge.id.codeEmploye) // query()
            .subscribe(( data ) => {
                this.employe = data;
                this.employes = Array.of(this.employe);
                // console.log(this.employes);
                // console.log('@@@@@@@@@@@@@ Contenu de la liste déroulante: ' + this.employes +'@@@@@@@@@@');
                }, err => {
                    console.log(err);
                });
        
        this.typeMotifCongeService.getAll()
            .subscribe(data => {
                this.typeMotifConges = data; 
                }, err => {
                    this.onError(err)
                });
     
        /*this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id'], params['d']);
            if(params['id'] && params['d']) {
                this.success = false;
            }
            else {
                this.success = true;
            }
        });*/
    }
    
    load(id) {
        this.employeCongeService.findAll(id).subscribe((employeConge) => {
            this.employeConge = employeConge;
            // this.typeCongeOld = +employeConge.id.codeTypeMotifConge;
            // this.employeConge.id.dateDebutConge = this.datePipe.transform(employeConge.id.dateDebutConge, 'yyyy-MM-dd');
            this.employeConge.dateFinConge = this.datePipe.transform(employeConge.dateFinConge,  'yyyy-MM-dd');
        });
    }
    
    /*load(id, d) {
        this.employeCongeService.find(id, d).subscribe((employeConge) => {
            this.employeConge = employeConge;
            this.dateOld = d;
            this.employeConge.id.codeEmploye = id;
            this.typeCongeOld = +employeConge.id.codeTypeMotifConge;
            // this.employeConge.id.dateDebutConge = this.datePipe.transform(employeConge.id.dateDebutConge, 'yyyy-MM-dd');
            this.employeConge.dateFinConge = this.datePipe.transform(employeConge.dateFinConge,  'yyyy-MM-dd');
        });
    }*/
    
    clear() {
        this.router.navigateByUrl('/conge-employe/'+this.id);
        // window.history.back();
        // this.location.back(); // pour retourner à l'interface précédente
        // this.activeModal.dismiss('cancel');
    }
    
    save() {
        // this.success = true;
        // this.doNotMatch = null;
        // this.error = null;
        this.conge = null;
        
        
        this.employeCongeService.getBetweenDates(this.employeConge).subscribe(data =>{
            
            this.conge = data;
            
            if(this.conge === this.testT) {
                console.log('********* Veuillez choisir une autre date ******************');
                this.errorEmpExists = '1';
                this.errorDateExists = '1';
            } 
            else {
                this.employeCongeService.verifDates(this.employeConge).subscribe(data =>{
                this.dateValid = data;
                console.log('******* La réponse est: '+this.dateValid);
                
                if(this.dateValid === this.testF ) {
                    // console.log('********* Contenu de la variable de validation des dates: '+this.employeCongeService.validDates+' ******************');
                    console.log('********* Veuillez choisir une date valide ******************');
                    this.errorEmpExists = '2';
                    this.errorDateExists = '2';
                }
                else { // (this.employeCongeService.getBetweenDates(+this.employeConge.id.codeEmploye, this.employeConge.id.dateDebutConge) === 404) {
                    this.employeCongeService.verifDureeConge(this.employeConge)
                    .subscribe(data =>{
                        this.dureeValid = data;
                        console.log('******* La réponse sur la durée est: '+this.dureeValid);
                        if(this.dureeValid === this.testF) {
                            this.errorDureeExists = '1';
                            this.errorEmpExists = null;
                            this.errorDateExists = null;
                        }
                        else {
                         // Sinon c'est un nouvel enregistrement
                            /*console.log('********* Contenu de la variable: '+this.employeCongeService.conge+' ******************');
                            console.log('********* Création ******************');*/
                                this.errorEmpExists = null;
                                this.errorDateExists = null;
                                
                                
                             this.employeCongeService.delete(this.id, this.d).subscribe(response => {
                                 this.eventManager.broadcast({name: 'employeListModification'});
                                 
                                 this.employeSituation.id.codeEmploye = response.id.codeEmploye;
                                 this.employeSituation.id.dateDebutSituation = response.id.dateDebutConge;
                                 this.employeSituationT = this.employeSituation;
                                 
                                 this.employeSituationService.delete(this.id, this.d).subscribe(data => {
                                     this.onSaveSuccess(response);
                                 })
                                 
                                 this.employeCongeService.create(this.employeConge).subscribe(data => {
                                     
                                     //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
                                     this.employeSituation.id.codeEmploye = data.id.codeEmploye;
                                     this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
                                     this.employeSituation.id.dateDebutSituation = data.id.dateDebutConge;
                                     this.employeSituation.dateFinSituation = data.dateFinConge;
                                     this.employeSituation.refSituation = data.refDebutConge;
                                     this.employeSituationService.create(this.employeSituation).subscribe(response => {
                                         this.onSaveSuccess(response);
                                     })
                                 });
                             }); 
                            
                         }
                    });
                    
                    }
                });
            
            }
        });
    }
    
    /*edit() {
        this.dataExists = true;
        this.doNotMatch = null;
        this.error = null;
        if ( (!this.dateOld.match(this.employeConge.id.dateDebutConge))  ) {             
            // this.subscribeToSaveResponse(this.employeCongeService.delete(this.codeOld, this.dateOld));
            console.log('********* Supprimer et créer ******************');
            this.employeCongeService.delete(this.codeOld, this.dateOld).subscribe(
                    (response) => { this.eventManager.broadcast(
                            {name: 'employeListModification'});
            });
            this.subscribeToSaveResponse(this.employeCongeService.create(this.employeConge));
                            
        } else if (!this.typeCongeOld.toString().match(this.employeConge.id.codeTypeMotifConge.toString()) ) {
            console.log('********* Supprimer et créer ******************');
            this.employeCongeService.delete(this.employeOld, this.dateOld).subscribe(
                    (response) => { this.eventManager.broadcast(
                            {name: 'employeListModification'});
            });
            this.subscribeToSaveResponse(this.employeCongeService.create(this.employeConge));
        }
        else { 
            // Sinon c'est une mise à jour
            console.log('********* Modification ******************');
            this.errorEmpExists = null;
            this.errorDateExists = null;
            this.errorEmpExists = '1';
            this.errorDateExists = '1';
            this.subscribeToSaveResponse(this.employeCongeService.update(this.employeConge));
         }
    }*/
    

    trackEmployeById( index: number, item: Employe ) {
        return item.codeEmploye;
    }

    trackTypeMotifCongeById( index: number, item: TypeMotifConge ) {
        return item.codeTypeMotifConge;
    }

    subscribeToSaveResponse(result: Observable<EmployeConge>) {
      result.subscribe((res: EmployeConge) =>
          this.onSaveSuccess(res)); // , (res: Response) => res); // this.onSaveError(res));
    }
    
    subscribeToSaveError(result: Observable<EmployeConge>) {
        result.subscribe((res: EmployeConge) =>
            this.onSaveError(res), (res: Response) => res); // this.onSaveError(res));
      }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeListModification'} );
        this.router.navigateByUrl('/conge-employe/'+this.id);
        // this.router.navigateByUrl('/employe-conge');
        // window.history.back();
        // this.location.back(); // pour retourner à l'interface précédente
        // this.activeModal.dismiss( result );
    }

     onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.onError(error);
    }

    onError(error) {
        console.log(error);
        // return (error.message); // return error(error.message, null, null);
    }

}

@Component({
    selector: 'app-employe-conge-popup',
    template: ''
})
export class EmployeCongeDialogPopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    employeConge: EmployeConge;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private employeCongeService: EmployeCongeService,
        private employeCongePopupService: EmployeCongePopupService,
        private datePipe: DatePipe,
        public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( (params['id']) && (params['d']) ) {
                console.log('********** Code de la ligne sélectionnée: ' + params['id'] + '*******');
                console.log('********** Date de la ligne sélectionnée: ' + params['d'] + '*******');
                this.employeCongePopupService.open(EmployeCongeDialogComponent as Component, params['id'], params['d']);
            } else {
                this.employeCongePopupService.open(EmployeCongeDialogComponent as Component);
            }
        });
    }

    load(empC: EmployeConge) {
        this.employeCongeService.find(empC).subscribe((employeConge) => {
            this.employeConge = employeConge;
            this.employeConge.id.dateDebutConge = this.datePipe.transform(employeConge.id.dateDebutConge, 'yyyy-MM-dd');
            this.employeConge.dateFinConge = this.datePipe.transform(employeConge.dateFinConge,  'yyyy-MM-dd');
            /*this.employeConge.comDebutConge = JSON.parse(employeConge.comDebutConge);
            this.employeConge.comFinConge = JSON.parse(employeConge.comFinConge);*/
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}

