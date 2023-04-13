
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Regroupement } from './regroupement.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RegroupementService } from './regroupement.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'util';
import { constructor } from 'q';
import { RegroupementPopupService } from './regroupement-popup.service';
import { TypeRegroupement } from '../type-regroupement/type-regroupement.model';
import { TypeRegroupementService, ResponseWrapper } from '../type-regroupement/type-regroupement.service';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';
import { TypeSexe } from '../type-sexe/type-sexe.model';
import { TypeNationaliteService } from '../type-nationalite/type-nationalite.service';
import { TypeSexeService } from '../type-sexe/type-sexe.service';

@Component({
    selector: 'app-regroupement',
    templateUrl: './regroupement-dialog.component.html',
    styleUrls: ['./regroupement.component.css']
  })

export class RegroupementDialogComponent implements OnInit {
    
    regroupement: Regroupement= new Regroupement();
    typeRegroupements: TypeRegroupement;
    typeNationalites: TypeNationalite;
    typeSexes: TypeSexe;
    subscription: Subscription;
    mode: boolean;
    
    constructor(
        public activeModal: NgbActiveModal,
        private regroupementService: RegroupementService,
        private typeRegroupementService: TypeRegroupementService,
        private typeNationaliteService: TypeNationaliteService,
        private typeSexeService: TypeSexeService,
        private eventManager: EventManagerService,
        private router: Router,
        public activatedRoute: ActivatedRoute 
        ) {
      }
    
    ngOnInit() {
        /*this.typeRegroupementService.query()
            .subscribe(( res: ResponseWrapper ) => {
                this.typeRegroupements = res.json; 
                }, ( res: ResponseWrapper ) => this.onError(res.json));*/
        
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
        this.regroupementService.find(id).subscribe((regroupement) => {
            this.regroupement = regroupement;
        });
    }
    
    clear() {
        this.router.navigateByUrl('/regroupement');
     // this.activeModal.dismiss('cancel');
     // window.history.back();
    }
    
    save() {
        /*if ( this.regroupement.codeRegroupement !== undefined ) {
            this.subscribeToSaveResponse(this.regroupementService.update(this.regroupement));
        } else {*/
            this.subscribeToSaveResponse(this.regroupementService.create(this.regroupement));
        // }
    }
    
    edit() {
        this.subscribeToSaveResponse(this.regroupementService.update(this.regroupement));
    }
    
    subscribeToSaveResponse(result: Observable<Regroupement>) {
      result.subscribe((res: Regroupement) => {
          this.onSaveSuccess(res);
      }, err => {
          console.log(err);
      }); // this.onSaveError(res));
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'regroupementListModification'} );
        this.router.navigateByUrl('/regroupement');
        // this.activeModal.dismiss( result );
    }
    
    onError(error) {
        console.log(error.message);
        // return (error.message); // return error(error.message, null, null);
    }
}

@Component({
    selector: 'app-regroupement-popup',
    template: ''
})
export class RegroupementDialogPopupComponent implements OnInit, OnDestroy {

    routeSub: any;
    regroupement: Regroupement;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private regroupementService: RegroupementService,
        private regroupementPopupService: RegroupementPopupService,
        public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.regroupementPopupService.open(RegroupementDialogComponent as Component, params['id']);
                 // this.modalRef = this.regroupementPopupService.open(RegroupementDialogComponent as Component, params['id']);
            } else {
                this.regroupementPopupService.open(RegroupementDialogComponent as Component);
                 // this.modalRef = this.regroupementPopupService.open(RegroupementDialogComponent as Component);
            }
        });
    }

    load(id) {
        this.regroupementService.find(id).subscribe((regroupement) => {
            this.regroupement = regroupement;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
