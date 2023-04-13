import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeDeleteComponent } from '../employe/employe-delete.component';
import { EmployeCongePopupService } from './employe-conge-popup.service';
import { EmployeCongeService } from './employe-conge.service';
import { EmployeConge } from './employe-conge.model';


@Component({
  selector: 'app-employe-conge',
  templateUrl: './employe-conge-delete.component.html',
  styleUrls: ['./employe-conge.component.css']
})

export class EmployeCongeDeleteComponent implements OnInit {

    employeConge: EmployeConge;
    employeCongeT: EmployeConge;
    routeData: any;
    private subscription: Subscription;

    constructor(
    public activeModal: NgbActiveModal,
    private eventManager: EventManagerService,
    private employeCongeService: EmployeCongeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
    }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.employeConge.id.codeEmploye = params['id'];
            this.employeConge.id.dateDebutConge= params['d'];
            this.employeCongeT = this.employeConge;
            this.load(this.employeCongeT);
            
        });
    }
    
    load(empC: EmployeConge) {
        this.employeCongeService.find(empC).subscribe((employeConge) => {
            this.employeConge = employeConge;
        });
    }

   clear() {
       this.router.navigateByUrl('/employe-conge');
       // window.history.back(); 
       // this.activeModal.dismiss('cancel');
    }

    confirmDelete(empC: EmployeConge) {
        // console.log('****************** Suppression de lemploye ayant le code : ' + id + '********************');
        this.employeCongeService.delete(+empC.id.codeEmploye, empC.id.dateDebutConge).subscribe((response) => {
            // console.log('**************** La réponse de la suppression ' + response + '**********************');
            this.eventManager.broadcast({name: 'employeListModification'});
            // this.router.navigateByUrl('/employe-conge');
            window.history.back();
            // this.activeModal.dismiss(true);
        });
    }

}

@Component({
    selector: 'app-employe-conge-delete-popup',
    template: ''
})
export class EmployeCongeDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
    private employeCongePopupService: EmployeCongePopupService,
    public activatedRoute: ActivatedRoute // public router: Router
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            console.log('********** Code de la ligne à supprimer: ' + params['id'] + '*******');
            console.log('********** Date de la ligne à supprimer: ' + params['d'] + '*******');
            this.employeCongePopupService.open(EmployeCongeDeleteComponent as Component, params['id'], params['d']);
        });
    }    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
