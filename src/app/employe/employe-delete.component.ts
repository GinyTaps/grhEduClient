import { OnInit, Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Employe } from './employe.model';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from './employe.service';
import { EmployePopupService } from './employe-popup.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { Subscription } from 'rxjs';
// import { Scope } from '@angular/core/src/profile/wtf_impl';
// import { EventManager } from '../event-manager';

@Component({
  selector: 'app-employe',
  templateUrl: './employe-delete.component.html',
  styleUrls: ['./employe.component.css']
})

export class EmployeDeleteComponent implements OnInit {

    employe: Employe;
    employes: Employe[] = [];
    routeData: any;
    private subscription: Subscription;

    constructor(
    public activeModal: NgbActiveModal,
    private eventManager: EventManagerService,
    private employeService: EmployeService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
    }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
    }
    
    load(id) {
        this.employeService.find(id).subscribe((employe) => {
            this.employe = employe;
        });
    }

   clear() {
       this.router.navigateByUrl('/employe');
       // this.location.back();
        // this.activeModal.dismiss('cancel');
    }

    confirmDelete(emp: number ) {
        // console.log('****************** Suppression de lemploye ayant le code: ' + id + '********************');
        this.employeService.delete(emp).subscribe((response) => {
            this.eventManager.broadcast({name: 'employeListModification'});
            this.router.navigateByUrl('/employe');
            // this.location.back();
            // this.activeModal.dismiss(true);
        });
    }

    /*loadAll() {
    this.employeService.getAll()
    .subscribe(data => { this.employe = data; }, err => { console.log(err); });
    }*/
}

@Component({
    selector: 'app-employe-delete-popup',
    template: ''
})
export class EmployeDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
    private employePopupService: EmployePopupService,
    public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            this.employePopupService.open(EmployeDeleteComponent as Component, params['id']);
             // this.modalRef = this.employePopupService.open(EmployeDeleteComponent as Component, params['id']);
        });
    }    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }


}
