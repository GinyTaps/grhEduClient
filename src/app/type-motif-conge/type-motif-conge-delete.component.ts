import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeMotifConge } from './type-motif-conge.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { TypeMotifCongeService } from './type-motif-conge.service';
import { TypeMotifCongePopupService } from './type-motif-conge-popup.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-type-motif-conge',
  templateUrl: './type-motif-conge-delete.component.html',
  styleUrls: ['./type-motif-conge.component.css']
})

export class TypeMotifCongeDeleteComponent {

    typeMotifConge: TypeMotifConge;

    constructor(
    public activeModal: NgbActiveModal,
    private eventManager: EventManagerService,
    private typeMotifCongeService: TypeMotifCongeService,
    ) {

    }

   clear() {
        this.activeModal.dismiss('cancel');
        // window.history.back();
    }

    confirmDelete(id: number ) {
        console.log('****************** Suppression de lemploye ayant le code: ' + id + '********************');
        this.typeMotifCongeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeMotifCongeListModification'});
            this.activeModal.dismiss(true);
        });
    }

    loadAll() {
    this.typeMotifCongeService.getAll()
    .subscribe(data => { this.typeMotifConge = data; }, err => { console.log(err); });
    }
}

@Component({
    selector: 'app-type-motif-conge-delete-popup',
    template: ''
})
export class TypeMotifCongeDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
    private typeMotifCongePopupService: TypeMotifCongePopupService,
    public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.typeMotifCongePopupService.open(TypeMotifCongeDeleteComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
