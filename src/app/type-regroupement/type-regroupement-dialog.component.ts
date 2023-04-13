import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeRegroupement } from './type-regroupement.model';
import { Subscription, Observable } from 'rxjs';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TypeRegroupementService } from './type-regroupement.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { constructor } from 'q';
import { TypeRegroupementPopupService } from './type-regroupement-popup.service';
import { Employe } from '../employe/employe.model';


@Component({
  selector: 'app-type-regroupement',
  templateUrl: './type-regroupement-dialog.component.html',
  styleUrls: ['./type-regroupement.component.css']
})

export class TypeRegroupementDialogComponent implements OnInit {
    
    typeRegroupement: TypeRegroupement;
    subscription: Subscription;
    
    constructor(
        public activeModal: NgbActiveModal,
        private typeRegroupementService: TypeRegroupementService,
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
        if ( this.typeRegroupement.codeTypeRegroupement !== undefined ) {
            this.subscribeToSaveResponse(this.typeRegroupementService.update(this.typeRegroupement));
        } else {
            this.subscribeToSaveResponse(this.typeRegroupementService.create(this.typeRegroupement));
        }
    }
    subscribeToSaveResponse(result: Observable<TypeRegroupement>) {
      result.subscribe((res: TypeRegroupement) =>
          this.onSaveSuccess(res), (res: Response) => res.json()); // this.onSaveError(res));
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'typeRegroupementListModification'} );
        this.activeModal.dismiss( result );
    }
}

@Component({
    selector: 'app-type-regroupement-popup',
    template: ''
})
export class TypeRegroupementDialogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    typeRegroupement: TypeRegroupement;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private typeRegroupementService: TypeRegroupementService,
        private typeRegroupementPopupService: TypeRegroupementPopupService,
        public activatedRoute: ActivatedRoute 
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.typeRegroupementPopupService.open(TypeRegroupementDialogComponent as Component, params['id']);
                 // this.modalRef = this.typeRegroupementPopupService.open(EmployeDialogComponent as Component, params['id']);
            } else {
                this.typeRegroupementPopupService.open(TypeRegroupementDialogComponent as Component);
                 // this.modalRef = this.typeRegroupementPopupService.open(EmployeDialogComponent as Component);
            }
        });
    }

    load(id) {
        this.typeRegroupementService.find(id).subscribe((typeRegroupement) => {
            this.typeRegroupement = typeRegroupement;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
