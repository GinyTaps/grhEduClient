
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService, ResponseWrapper } from './employe.service';
import { Employe } from './employe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { EmployePopupService } from './employe-popup.service';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';
import { TypeNationaliteService } from '../type-nationalite/type-nationalite.service';
import { TypeSexeService } from '../type-sexe/type-sexe.service';
import { TypeSexe } from '../type-sexe/type-sexe.model';
import { EventManagerService } from '../event-manager.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe-dialog.component.html',
  styleUrls: ['./employe.component.css'],
  providers: [DatePipe]
})

export class EmployeDialogComponent implements OnInit {

    employe: Employe = new Employe(); // ... = new Employe() permet d'éviter l'erreur " Cannot read property 'codeEmploye' of undefined "
    // employe: Employe;
    typeNationalites: TypeNationalite;
    typeSexes: TypeSexe;
    subscription: Subscription;
    errorEmpExists: string;
    errorDateExists: string;
    mode: boolean;
    id: number;

//   private subscription: Subscription;
    constructor(
    public activeModal: NgbActiveModal,
    private employeService: EmployeService,
    private typeNationaliteService: TypeNationaliteService,
    private typeSexeService: TypeSexeService,
    private datePipe: DatePipe,
    private eventManager: EventManagerService,
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {

        this.typeNationaliteService.getAll()
            .subscribe(data => {
                this.typeNationalites = data; 
                }, ( res: ResponseWrapper ) => this.onError(res.json));
        
        this.typeSexeService.getAll()
            .subscribe(data => {
                this.typeSexes = data; 
                }, ( res: ResponseWrapper ) => this.onError( res.json ));
        
          this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            // this.load(this.id);
            if(params['id']) {
                // console.log(params['id']);
                this.mode = false;
                this.load(params['id']);
            }
            else {
                this.mode = true;
            }
        }); 
    }
    
    load(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
            this.employe.dateNaissEmploye = this.datePipe.transform(employe.dateNaissEmploye, 'yyyy-MM-dd');
        });
        /* this.organisationService.query()
            .subscribe((res: ResponseWrapper) => { this.organisations = res.json; }, (res: ResponseWrapper) => this.onError(res.json)); */
    }

    clear() {
        this.router.navigateByUrl('/employe');
        // this.location.back();
        // this.activeModal.dismiss('cancel');
    }

    save() {
        /*if ( this.employe.codeEmploye !== undefined ) {
            console.log('*********** Contenu de la mise à jour ***********');
            console.log(this.employe);
            this.subscribeToSaveResponse(this.employeService.update(this.employe));
            // this.employeService.update( this.employe ).subscribe(( response ) => this.onSaveSuccess( response ) );
            // , () => this.onSaveError() );
         } else {*/
            console.log('*********** Contenu de lenregistrement '+this.employe);
            this.subscribeToSaveResponse(this.employeService.create(this.employe));
            // this.employeService.create( this.employe ).subscribe(( response ) => this.onSaveSuccess( response ) );
            // , () => this.onSaveError() );
         // }
    }
    
    edit() {
        this.subscribeToSaveResponse(this.employeService.update(this.employe));
    }

    trackTypeNationaliteById( index: number, item: TypeNationalite ) {
        // console.log('*****Code du type nationalite: ' + item.codeTypeNationalite);
        return item.codeTypeNationalite;
    }

    trackTypeSexeById( index: number, item: TypeSexe ) {
        return item.codeTypeSexe;
    }

    equals(o1: TypeNationalite, o2: TypeNationalite) {
        return o1 && o2 ? o1.codeTypeNationalite === o2.codeTypeNationalite : o1 === o1;
        // return o1.codeTypeNationalite === o2.codeTypeNationalite;
        }


    subscribeToSaveResponse(result: Observable<Employe>) {
      result.subscribe((res: Employe) => {
          this.onSaveSuccess(res);
      }, err => {
          this.onSaveError(err);
      }); // this.onSaveError(res));
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeListModification'} );
        this.router.navigateByUrl('/employe');
        // this.location.back();
        //this.activeModal.dismiss( result );
    }

     onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            // error.message = error.text();
        }
        this.onError(error);
    }

    onError(error) {
        console.log(error.message);
        return (error.message); // return error(error.message, null, null);
    }

    /* save() {
        if (this.employe.codeEmploye !== null) {
            this.subscribeToSaveResponse(
                this.employeService.update(this.employe) );
            } else {
            this.employeService.create(this.employe);
            }
        } */


    // ajouterEmp() {
        //  if (this.employe.codeEmploye !== undefined) {
      /* if (this.employe.codeEmploye) {
        // this.router.navigate(['/employe-dialog', this.employe.code_EMPLOYE'])
        // this.subscribeToSaveResponse(
                this.employeService.update(this.employe); // );
        } else { */
            /* if (this.employe.enseigneYN) {
              this.employe.enseigneYN = 1;
            } else {
            this.employe.enseigneYN = 0;
            }
            if (this.employe.confirmeYN) {
              this.employe.confirmeYN = 1;
            } else {
            this.employe.confirmeYN = 0;
            } */
            // this.employe.dateNaissEmploye = this.datePipe.transform(this.employe.dateNaissEmploye, 'yyyy-MM-dd');
             /* this.employeService.save(this.employe)
                .subscribe(data => {
                    console.log(data);  }, err => { console.log(err);
            }); */
            // this.subscribeToSaveResponse(
                  // );
        // }
    // }

      // this.employeService.saveEmploye(employe);

    // this.employes = this.employeService.getAllEmploye();


    /*trackOrganisationById(index: number, item: Organisation) {
        return item.id;
    } */



}
@Component({
    selector: 'app-employe-popup',
    template: ''
})
export class EmployeDialogPopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    employe: Employe;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private employeService: EmployeService,
        private employePopupService: EmployePopupService,
        private datePipe: DatePipe,
        public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        // this.routeSub = +this.activatedRoute.params.subscribe((params) => {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.employePopupService.open(EmployeDialogComponent as Component, params['id']);
                 // this.modalRef = this.employePopupService.open(EmployeDialogComponent as Component, params['id']);
            } else {
                this.employePopupService.open(EmployeDialogComponent as Component);
                 // this.modalRef = this.employePopupService.open(EmployeDialogComponent as Component);
            }
        });
    }

    load(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
            this.employe.dateNaissEmploye = this.datePipe.transform(employe.dateNaissEmploye, 'yyyy-MM-dd');
        });
        /* this.organisationService.query()
            .subscribe((res: ResponseWrapper) => { this.organisations = res.json; }, (res: ResponseWrapper) => this.onError(res.json)); */
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }


}
