
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

@Component({
  selector: 'app-employe-conge',
  templateUrl: './employe-conge-edit.component.html',
  styleUrls: ['./employe-conge.component.css'],
  providers: [DatePipe]
})

export class EmployeCongeEditComponent {
    
    // employeConge: EmployeConge;
    employeConge: EmployeConge = new EmployeConge();
    employeCongeT: EmployeConge = new EmployeConge();
    employes: Employe;
    typeMotifConges: TypeMotifConge;
    subscription: Subscription;
    doNotMatch: string;
    error: string;
    errorEmpExists: string;
    errorDateExists: string;
    success: boolean;
    dataExists: boolean;
    conge: any;
    dateOld: String = null;
    typeCongeOld: number = 0;
    employeOld: number = 0;
    codeOld: number;
    congeExists: boolean = true;
    route: any;
    hide: boolean = true;
    id: number;
    
    //private subscription: Subscription;
    constructor(
    public activeModal: NgbActiveModal,
    private employeService: EmployeService,
    private employeCongeService: EmployeCongeService,
    private typeMotifCongeService: TypeMotifCongeService,
    private employeCongePopupservice: EmployeCongePopupService,
    private datePipe: DatePipe,
    private eventManager: EventManagerService,
    private location: Location,
    // private dataUtils: DataUtils,
    private router: Router,
    public activatedRoute: ActivatedRoute
    ) {
        /*this.routeSub = this.activatedRoute.params.subscribe((params) => {
            console.log('********** Code de la ligne sélectionnée dans le composant principal dédition: ' + params['id'] + '*******');
            console.log('********** Date de la ligne sélectionnée dans le composant principal dédition: ' + params['d'] + '*******');
        });*/
    }
    
    ngOnInit() {
        
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.employeConge.id.codeEmploye = params['id'];
            this.employeConge.id.dateDebutConge= params['d'];
            this.employeCongeT = this.employeConge;
            this.load(this.employeCongeT);
            this.id = params['id'];
        });
            /*console.log('********** Code de la ligne sélectionnée dans le composant principal dédition: ' + this.employeCongePopupservice.typeCongeOld + ' *******');
            console.log('********** Date de la ligne sélectionnée dans le composant principal dédition: ' + this.employeCongePopupservice.dateOld + ' *******');*/
        this.conge = null;
        this.dateOld = this.employeCongePopupservice.dateOld;
        this.typeCongeOld = this.employeCongePopupservice.typeCongeOld;
        this.codeOld = this.employeCongePopupservice.employeOld;
        this.success = false;
        this.dataExists = false;
        this.employeService.find(this.id).subscribe(( res ) => {
                this.employes = res;
                console.log(this.employes);
                }, err => {
                    console.log(err);
                    this.onError(err);
                });
        
        this.typeMotifCongeService.getAll()
            .subscribe(data => {
                this.typeMotifConges = data; 
                }, err => this.onError( err ));
    }
    
    load(empC: EmployeConge) {
        this.employeCongeService.find(empC).subscribe(data => {
            this.employeConge = data;
            this.dateOld = data.id.dateDebutConge;
            this.employeOld = +data.id.codeEmploye;
            this.typeCongeOld = + data.id.codeTypeMotifConge;
        });
    }

    clear() {
        this.router.navigateByUrl('/conge-employe/'+this.id);
        // this.location.back(); // pour retourner à l'interface précédente
        // window.history.back();
        // this.activeModal.dismiss('cancel');
    }
    
    edit() {
        this.dataExists = true;
        console.log('********* Mise à jour ******************');
    }
    
    save() {
        this.dataExists = true;
        this.doNotMatch = null;
        this.error = null;
        /*this.employeCongeService.getBetweenDates(+this.employeConge.id.codeEmploye, this.employeConge.id.dateDebutConge).subscribe(data =>{
            this.conge = data;
        });*/
        /*this.route = this.activatedRoute.params.subscribe((params) => {
            console.log('********** Code de la ligne récupérée : ' + params['id'] + ' *******');
            console.log('********** Date de la ligne récupérée: ' + params['d'] + ' *******');
        this.employeCongeService.find(+this.typeCongeOld, this.dateOld).subscribe(data =>{
            this.conge = data;
            this.dateOld = data.id.dateDebutConge;
            this.typeCongeOld = + data.id.codeTypeMotifConge;
             });
        });*/
        if ( (!this.dateOld.match(this.employeConge.id.dateDebutConge))  ) {             
            // this.subscribeToSaveResponse(this.employeCongeService.delete(this.codeOld, this.dateOld));
            // console.log('********* Supprimer et créer ******************');
            
            this.employeCongeService.delete(this.codeOld, this.dateOld.toString()).subscribe(
                    (response) => { this.eventManager.broadcast(
                            {name: 'employeListModification'});
            });
            this.subscribeToSaveResponse(this.employeCongeService.create(this.employeConge));
                            
        } else if (!this.typeCongeOld.toString().match(this.employeConge.id.codeTypeMotifConge.toString()) ) {
            // console.log('********* Supprimer et créer ******************');
            
            this.employeCongeService.delete(this.employeOld, this.dateOld.toString()).subscribe(
                    (response) => { this.eventManager.broadcast(
                            {name: 'employeListModification'});
            });
            this.subscribeToSaveResponse(this.employeCongeService.create(this.employeConge));
        }
        else { 
            // Sinon c'est une mise à jour
            console.log('********* Modification ******************');
            /*this.errorEmpExists = null;
            this.errorDateExists = null;*/
            /*this.errorEmpExists = '1';
            this.errorDateExists = '1';*/
            this.subscribeToSaveResponse(this.employeCongeService.update(this.employeConge));
         }
            
    }
    
    trackEmployeById( index: number, item: Employe ) {
        return item.codeEmploye;
    }
    
    trackTypeMotifCongeById( index: number, item: TypeMotifConge ) {
        return item.codeTypeMotifConge;
    }
    
    subscribeToSaveResponse(result: Observable<EmployeConge>) {
      result.subscribe((res: EmployeConge) =>
          this.onSaveSuccess(res), (res: Response) => res.json); // this.onSaveError(res));
    }
    
    subscribeSaveResponse(result: Observable<Response>) {
        result.subscribe((res: Response) =>
            this.onSaveSuccess(res), (res: Response) => res.json); // this.onSaveError(res));
      }
    
    subscribeToSaveError(result: Observable<EmployeConge>) {
        result.subscribe((res: EmployeConge) =>
            this.onSaveError(res), (res: Response) => res.json()); // this.onSaveError(res));
      }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeListModification'} );
        this.router.navigateByUrl('/conge-employe/'+this.id);
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
        console.log(error.message);
        return (error.message); // return error(error.message, null, null);
    }

}

@Component({
selector: 'app-employe-conge-popup',
template: ''
})
export class EmployeCongeEditPopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    employeConge: EmployeConge;
    subscription: Subscription;
    modalRef: NgbModalRef;
    dateOld: string;
    typeCongeOld: number;
    
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
                this.dateOld = params['id'];
                this.typeCongeOld = params['d'];
                this.employeCongePopupService.open(EmployeCongeEditComponent as Component, params['id'], params['d']);
            } else {
                this.employeCongePopupService.open(EmployeCongeEditComponent as Component);
            }
        });
        console.log('********** Code de la ligne sélectionnée: ' + this.dateOld + ' *******');
        console.log('********** Date de la ligne sélectionnée: ' + this.typeCongeOld + ' *******');
     
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
