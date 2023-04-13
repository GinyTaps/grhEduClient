import { OnInit, OnDestroy, Component } from '@angular/core';
import { TypeNationalite } from './type-nationalite.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { TypeNationaliteService } from './type-nationalite.service';
import { TypeNationalitePopupService } from './type-nationalite-popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { Location } from '@angular/common';

@Component({
  selector: 'app-type-nationalite',
  templateUrl: './type-nationalite-delete.component.html',
  styleUrls: ['./type-nationalite.component.css']
})

export class TypeNationaliteDeleteComponent implements OnInit {

    typeNationalite: TypeNationalite;
    typeNationalites: TypeNationalite[] = [];
    private subscription: Subscription;

    constructor(
    public activeModal: NgbActiveModal,
    private eventManager: EventManagerService,
    private typeNationaliteService: TypeNationaliteService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

    }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
    }
    
    load(id) {
        this.typeNationaliteService.find(id).subscribe((typeNationalite) => {
            this.typeNationalite = typeNationalite;
        });
    }

   clear() {
       this.router.navigateByUrl('/typeNationalite');
        // this.activeModal.dismiss('cancel');
       // this.location.back();
        // window.history.back();
    }

    confirmDelete(id: number ) {
        console.log('****************** Suppression de la nationalite ayant le code: ' + id + '********************');
        this.typeNationaliteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeNationaliteListModification'});
            this.router.navigateByUrl('/typeNationalite');
            // this.activeModal.dismiss(true);
            // this.location.back();
        });
    }

}

@Component({
    selector: 'app-type-nationalite-delete-popup',
    template: ''
})
export class TypeNationaliteDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
    private typeNationalitePopupService: TypeNationalitePopupService,
    public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.typeNationalitePopupService.open(TypeNationaliteDeleteComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
