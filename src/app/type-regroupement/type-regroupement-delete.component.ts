import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeRegroupement } from './type-regroupement.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { TypeRegroupementService } from './type-regroupement.service';
import { TypeRegroupementPopupService } from './type-regroupement-popup.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-type-regroupement',
  templateUrl: './type-regroupement-delete.component.html',
  styleUrls: ['./type-regroupement.component.css']
})

export class TypeRegroupementDeleteComponent {
    
    typeRegroupement: TypeRegroupement;

    constructor(
    public activeModal: NgbActiveModal,
    private eventManager: EventManagerService,
    private typeRegroupementService: TypeRegroupementService,
    ) {
    
    }
    
    clear() {
        this.activeModal.dismiss('cancel');
        // window.history.back();
    }
    
    confirmDelete(id: number ) {
        console.log('****************** Suppression du type de regroupement ayant le code: ' + id + '********************');
        this.typeRegroupementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeRegroupementListModification'});
            this.activeModal.dismiss(true);
        });
    }
    
    loadAll() {
        this.typeRegroupementService.getAll()
        .subscribe(data => { this.typeRegroupement = data; }, err => { console.log(err); });
    }
}

@Component({
selector: 'app-type-regroupement-delete-popup',
template: ''
})

export class TypeRegroupementDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;
    
    constructor(
    private typeRegroupementPopupService: TypeRegroupementPopupService,
    public activatedRoute: ActivatedRoute
    ) {
    }
    
    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.typeRegroupementPopupService.open(TypeRegroupementDeleteComponent as Component, params['id']);
        });
    }
    
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
