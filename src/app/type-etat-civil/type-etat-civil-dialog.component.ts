import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeEtatCivil } from './type-etat-civil.model';
import { Subscription, Observable } from 'rxjs';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TypeEtatCivilService } from './type-etat-civil.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'util';
import { constructor } from 'q';
import { TypeEtatCivilPopupService } from './type-etat-civil-popup.service';
import { Employe } from '../employe/employe.model';


@Component({
  selector: 'app-type-etat-civil',
  templateUrl: './type-etat-civil-dialog.component.html',
  styleUrls: ['./type-etat-civil.component.css']
})

export class TypeEtatCivilDialogComponent {
    
    typeEtatCivil: TypeEtatCivil = new TypeEtatCivil();
    subscription: Subscription;
    mode: boolean;
    
    constructor(
        public activeModal: NgbActiveModal,
        private typeEtatCivilService: TypeEtatCivilService,
        private eventManager: EventManagerService,
        public activatedRoute: ActivatedRoute,
        private router: Router
        ) {
      }
    
    ngOnInit() {
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
    
    }
   
    load(id) {
        this.typeEtatCivilService.find(id).subscribe((typeEtatCivil) => {
            this.typeEtatCivil = typeEtatCivil;
        });
    }
    
    clear() {
        this.router.navigateByUrl('/typeEtatCivil');
     // this.activeModal.dismiss('cancel');
    }
    
    save() {
        /*if ( this.typeEtatCivil.codeTypeEtatCivil !== undefined ) {
            this.subscribeToSaveResponse(this.typeEtatCivilService.update(this.typeEtatCivil));
        } else {*/
            this.subscribeToSaveResponse(this.typeEtatCivilService.create(this.typeEtatCivil));
       // }
    }
    
    edit() {
        this.subscribeToSaveResponse(this.typeEtatCivilService.update(this.typeEtatCivil));
    }
    
    subscribeToSaveResponse(result: Observable<TypeEtatCivil>) {
      result.subscribe((res: TypeEtatCivil) =>
          this.onSaveSuccess(res), (res: Response) => res.json()); // this.onSaveError(res));
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'typeEtatCivilListModification'} );
        this.router.navigateByUrl('/typeEtatCivil');
        // this.activeModal.dismiss( result );
    }
}

@Component({
    selector: 'app-type-etat-civil-popup',
    template: ''
})
export class TypeEtatCivilDialogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    typeEtatCivil: TypeEtatCivil;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private typeEtatCivilService: TypeEtatCivilService,
        private typeEtatCivilPopupService: TypeEtatCivilPopupService,
        public activatedRoute: ActivatedRoute 
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.typeEtatCivilPopupService.open(TypeEtatCivilDialogComponent as Component, params['id']);
                 // this.modalRef = this.typeEtatCivilPopupService.open(EmployeDialogComponent as Component, params['id']);
            } else {
                this.typeEtatCivilPopupService.open(TypeEtatCivilDialogComponent as Component);
                 // this.modalRef = this.typeEtatCivilPopupService.open(EmployeDialogComponent as Component);
            }
        });
    }

    load(id) {
        this.typeEtatCivilService.find(id).subscribe((typeEtatCivil) => {
            this.typeEtatCivil = typeEtatCivil;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
