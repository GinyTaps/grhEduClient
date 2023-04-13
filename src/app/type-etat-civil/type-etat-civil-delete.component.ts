import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeEtatCivil } from './type-etat-civil.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { TypeEtatCivilService } from './type-etat-civil.service';
import { TypeEtatCivilPopupService } from './type-etat-civil-popup.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-type-etat-civil',
  templateUrl: './type-etat-civil-delete.component.html',
  styleUrls: ['./type-etat-civil.component.css']
})

export class TypeEtatCivilDeleteComponent {
    
    typeEtatCivil: TypeEtatCivil;

    constructor(
    public activeModal: NgbActiveModal,
    private eventManager: EventManagerService,
    private typeEtatCivilService: TypeEtatCivilService,
    private router: Router
    ) {
    
    }
    
    clear() {
        this.router.navigateByUrl('/typeEtatCivil');
        // this.activeModal.dismiss('cancel');
    }
    
    confirmDelete(id: number ) {
        console.log('****************** Suppression de letat civil ayant le code: ' + id + '********************');
        this.typeEtatCivilService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeEtatCivilListModification'});
            this.router.navigateByUrl('/typeEtatCivil');
            // this.activeModal.dismiss(true);
        });
    }
    
    loadAll() {
        this.typeEtatCivilService.getAll()
        .subscribe(data => { this.typeEtatCivil = data; }, err => { console.log(err); });
        }
}

@Component({
    selector: 'app-type-etat-civil-delete-popup',
    template: ''
})
export class TypeEtatCivilDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
    private typeEtatCivilPopupService: TypeEtatCivilPopupService,
    public activatedRoute: ActivatedRoute 
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.typeEtatCivilPopupService.open(TypeEtatCivilDeleteComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
