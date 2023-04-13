import { Component, OnInit, OnDestroy } from '@angular/core';
import { Regroupement } from './regroupement.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { RegroupementService } from './regroupement.service';
import { RegroupementPopupService } from './regroupement-popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-regroupement',
  templateUrl: './regroupement-delete.component.html',
  styleUrls: ['./regroupement.component.css']
})

export class RegroupementDeleteComponent implements OnInit {
    
    regroupement: Regroupement;
    subscription: Subscription;

    constructor(
    public activeModal: NgbActiveModal,
    private eventManager: EventManagerService,
    private regroupementService: RegroupementService,
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
        this.regroupementService.find(id).subscribe((regroupement) => {
            this.regroupement = regroupement;
        });
    }
    
    clear() {
        this.router.navigateByUrl('/regroupement');
        // this.activeModal.dismiss('cancel');
        // window.history.back();
    }
    
    confirmDelete(id: number ) {
            console.log('****************** Suppression du regroupement ayant le code: ' + id + '********************');
            this.regroupementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'regroupementListModification'});
            this.router.navigateByUrl('/regroupement');
            // this.activeModal.dismiss(true);
        });
    }
    
    loadAll() {
        this.regroupementService.getAll()
        .subscribe(data => { this.regroupement = data; }, err => { console.log(err); });
    }
}

@Component({
    selector: 'app-regroupement-delete-popup',
    template: ''
})
export class RegroupementDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
    private regroupementPopupService: RegroupementPopupService,
    public activatedRoute: ActivatedRoute 
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.regroupementPopupService.open(RegroupementDeleteComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}