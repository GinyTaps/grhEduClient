import { OnInit, Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Chomeur } from './chomeur.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChomeurService } from './chomeur.service';
import { ChomeurPopupService } from './chomeur-popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chomeur',
  templateUrl: './chomeur-delete.component.html',
  styleUrls: ['./chomeur.component.css']
})

export class ChomeurDeleteComponent implements OnInit {
    chomeur: Chomeur;
    chomeurs: Chomeur[] = [];
    subscription: Subscription;
    routeData: any;

constructor(
        public activeModal: NgbActiveModal,
        private eventManager: EventManagerService,
        private chomeurService: ChomeurService,
        private router: Router,
        private activatedRoute: ActivatedRoute
        ) {
            // this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
        }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['cho']);
        });
    }
    
    load(id) {
        this.chomeurService.find(id).subscribe((chomeur) => {
            this.chomeur = chomeur;
        });
    }
    
    clear() {
        this.router.navigateByUrl('/chomeur');
        // this.activeModal.dismiss('cancel');
        // window.history.back();
    }
    
    confirmDelete(cho: number ) {
        this.chomeurService.delete(cho).subscribe((response) => {
            this.eventManager.broadcast({name: 'chomeurListModification'});
            // this.activeModal.dismiss(true);
            this.router.navigateByUrl('/chomeur');
        });
    }
    
    loadAll() {
    this.chomeurService.getAll()
    .subscribe(data => { this.chomeur = data; }, err => { console.log(err); });
    }

}

@Component({
    selector: 'app-chomeur-delete-popup',
    template: ''
})
export class ChomeurDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
    private chomeurPopupService: ChomeurPopupService,
    public activatedRoute: ActivatedRoute
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.chomeurPopupService.open(ChomeurDeleteComponent as Component, params['id']);
             // this.modalRef = this.chomeurPopupService.open(ChomeurDeleteComponent as Component, params['id']);
        });
    }    
    
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }


}
