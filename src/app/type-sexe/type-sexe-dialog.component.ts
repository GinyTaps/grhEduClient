import { OnInit, Component, OnDestroy } from '@angular/core';
import { TypeSexe } from './type-sexe.model';
import { Subscription, Observable } from 'rxjs';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TypeSexeService } from './type-sexe.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute } from '@angular/router';
import { TypeSexePopupService } from './type-sexe-popup.service';

@Component({
  selector: 'app-type-sexe',
  templateUrl: './type-sexe-dialog.component.html',
  styleUrls: ['./type-sexe.component.css']
})
export class TypeSexeDialogComponent implements OnInit {


    typeSexe: TypeSexe;
    subscription: Subscription;

constructor(
    public activeModal: NgbActiveModal,
    private typeSexeService: TypeSexeService,
    private eventManager: EventManagerService,
    public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {

    }

    clear() {
     this.activeModal.dismiss('cancel');
     // window.history.back();
    }

    save() {
        if ( this.typeSexe.codeTypeSexe !== undefined ) {
            this.subscribeToSaveResponse(this.typeSexeService.update(this.typeSexe));
        } else {
            this.subscribeToSaveResponse(this.typeSexeService.create(this.typeSexe));
        }
    }
    subscribeToSaveResponse(result: Observable<TypeSexe>) {
      result.subscribe((res: TypeSexe) =>
          this.onSaveSuccess(res), (res: Response) => res.json()); // this.onSaveError(res));
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeListModification'} );
        this.activeModal.dismiss( result );
    }

     /* onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.onError(error);
    }

    onError(error) {
        console.log(error.message);
        return Observable.throw(error.message); // return error(error.message, null, null);
    } */
}

@Component({
    selector: 'app-type-sexe-popup',
    template: ''
})

export class TypeSexeDialogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    typeSexe: TypeSexe;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private typeSexeService: TypeSexeService,
        private typeSexePopupService: TypeSexePopupService,
        public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.typeSexePopupService.open(TypeSexeDialogComponent as Component, params['id']);
                 // this.modalRef = this.typeSexePopupService.open(EmployeDialogComponent as Component, params['id']);
            } else {
                this.typeSexePopupService.open(TypeSexeDialogComponent as Component);
                 // this.modalRef = this.typeSexePopupService.open(EmployeDialogComponent as Component);
            }
        });
    }

    load(id) {
        this.typeSexeService.find(id).subscribe((typeSexe) => {
            this.typeSexe = typeSexe;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
