import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeNationalite } from './type-nationalite.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TypeNationaliteService } from './type-nationalite.service';
import { EventManagerService } from '../event-manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeNationalitePopupService } from './type-nationalite-popup.service';

@Component({
  selector: 'app-type-nationalite',
  templateUrl: './type-nationalite-dialog.component.html',
  styleUrls: ['./type-nationalite.component.css']
})

export class TypeNationaliteDialogComponent implements OnInit {

    typeNationalite: TypeNationalite = new TypeNationalite();
    subscription: Subscription;
    mode: boolean;

constructor(
    public activeModal: NgbActiveModal,
    private typeNationaliteService: TypeNationaliteService,
    private eventManager: EventManagerService,
    private location: Location,
    private router: Router,
    public activatedRoute: ActivatedRoute // public router: Router
    ) {
    /*this.subscription = this.activatedRoute.params.subscribe((params) => {
        this.load(params['id']);
        });*/
  }

    ngOnInit() {
        // this.mode = true;
        // this.mode = false;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
            if(params['id']) {
                console.log(params['id']);
                this.mode = false;
            }
            else {
                this.mode = true;
            }
         });
        // console.log(this.subscription);
        /*if(this.subscription) {
            this.mode = true;
            // this.typeNationalite.codeTypeNationalite === null;
        }
        else {
            this.mode = false;
            this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
            });
        }*/
    }
    
    load(id) {
        this.typeNationaliteService.find(id).subscribe((typeNationalite) => {
            this.typeNationalite = typeNationalite;
        });
        /* this.organisationService.query()
            .subscribe((res: ResponseWrapper) => { this.organisations = res.json; }, (res: ResponseWrapper) => this.onError(res.json)); */
    }

    clear() {
        this.router.navigateByUrl('/typeNationalite');
     // this.activeModal.dismiss('cancel');
     // window.history.back();
       // this.location.back();
    }

    save() {
        /*if ( this.typeNationalite.codeTypeNationalite !== null ) {
            this.subscribeToSaveResponse(this.typeNationaliteService.update(this.typeNationalite));
        } else {*/
            this.subscribeToSaveResponse(this.typeNationaliteService.create(this.typeNationalite));
        // }
    }
    
    edit() {
        this.subscribeToSaveResponse(this.typeNationaliteService.update(this.typeNationalite));
    }
    
    subscribeToSaveResponse(result: Observable<TypeNationalite>) {
      result.subscribe((res: TypeNationalite) => {
          this.onSaveSuccess(res); 
              }, err => {
                  console.log(err);
              }); // this.onSaveError(res));
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'typeNationaliteListModification'} );
        this.router.navigateByUrl('/typeNationalite');
        // this.location.back();
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
    selector: 'app-type-nationalite-popup',
    template: ''
})

export class TypeNationaliteDialogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    typeNationalite: TypeNationalite;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private typeNationaliteService: TypeNationaliteService,
        private typeNationalitePopupService: TypeNationalitePopupService,
        public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                console.log('*##############: ' + params['id']);
                this.typeNationalitePopupService.open(TypeNationaliteDialogComponent as Component, params['id']);
                 // this.modalRef = this.typeNationalitePopupService.open(EmployeDialogComponent as Component, params['id']);
            } else {
                this.typeNationalitePopupService.open(TypeNationaliteDialogComponent as Component);
                 // this.modalRef = this.typeNationalitePopupService.open(EmployeDialogComponent as Component);
            }
        });
    }

    load(id) {
        this.typeNationaliteService.find(id).subscribe((typeNationalite) => {
            this.typeNationalite = typeNationalite;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
