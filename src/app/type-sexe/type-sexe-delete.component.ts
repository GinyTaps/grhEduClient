import { Component, OnDestroy, OnInit } from '@angular/core';
import { TypeSexe } from './type-sexe.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { TypeSexeService } from './type-sexe.service';
import { TypeSexePopupService } from './type-sexe-popup.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-sexe',
  templateUrl: './type-sexe-delete.component.html',
  styleUrls: ['./type-sexe.component.css']
})

export class TypeSexeDeleteComponent {

    typeSexe: TypeSexe;

    constructor(
    public activeModal: NgbActiveModal,
    private eventManager: EventManagerService,
    private typeSexeService: TypeSexeService,
    ) {

    }

   clear() {
        this.activeModal.dismiss('cancel');
        // window.history.back();
    }

    confirmDelete(id: number ) {
        console.log('****************** Suppression de lemploye ayant le code: ' + id + '********************');
        this.typeSexeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'employeListModification'});
            this.activeModal.dismiss(true);
        });
    }

    loadAll() {
    this.typeSexeService.getAll()
        .subscribe(data => { this.typeSexe = data; }, err => { console.log(err); });
    }
}

@Component({
    selector: 'app-type-sexe-delete-popup',
    template: ''
})
export class TypeSexeDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
    private typeSexePopupService: TypeSexePopupService,
    public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.typeSexePopupService.open(TypeSexeDeleteComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

