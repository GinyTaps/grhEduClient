import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeMotifConge } from './type-motif-conge.model';
import { Subscription, Observable } from 'rxjs';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TypeMotifCongeService } from './type-motif-conge.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { constructor } from 'q';
import { TypeMotifCongePopupService } from './type-motif-conge-popup.service';
import { Employe } from '../employe/employe.model';


@Component({
  selector: 'app-type-motif-conge',
  templateUrl: './type-motif-conge-dialog.component.html',
  styleUrls: ['./type-motif-conge.component.css']
})
export class TypeMotifCongeDialogComponent implements OnInit {

    typeMotifConge: TypeMotifConge;
    subscription: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private typeMotifCongeService: TypeMotifCongeService,
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
        if ( this.typeMotifConge.codeTypeMotifConge !== undefined ) {
            this.subscribeToSaveResponse(this.typeMotifCongeService.update(this.typeMotifConge));
        } else {
            this.subscribeToSaveResponse(this.typeMotifCongeService.create(this.typeMotifConge));
        }
    }
    subscribeToSaveResponse(result: Observable<TypeMotifConge>) {
      result.subscribe((res: TypeMotifConge) =>
          this.onSaveSuccess(res), (res: Response) => res.json()); // this.onSaveError(res));
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'typeMotifCongeListModification'} );
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
    selector: 'app-type-motif-conge-popup',
    template: ''
})
export class TypeMotifCongeDialogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    typeMotifConge: TypeMotifConge;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private typeMotifCongeService: TypeMotifCongeService,
        private typeMotifCongePopupService: TypeMotifCongePopupService,
        public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.typeMotifCongePopupService.open(TypeMotifCongeDialogComponent as Component, params['id']);
                 // this.modalRef = this.typeMotifCongePopupService.open(EmployeDialogComponent as Component, params['id']);
            } else {
                this.typeMotifCongePopupService.open(TypeMotifCongeDialogComponent as Component);
                 // this.modalRef = this.typeMotifCongePopupService.open(EmployeDialogComponent as Component);
            }
        });
    }

    load(id) {
        this.typeMotifCongeService.find(id).subscribe((typeMotifConge) => {
            this.typeMotifConge = typeMotifConge;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
