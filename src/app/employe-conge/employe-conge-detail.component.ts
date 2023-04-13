import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmployeConge } from './employe-conge.model';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeCongeService } from './employe-conge.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMotifCongeService } from '../type-motif-conge/type-motif-conge.service';
import { TypeMotifConge } from '../type-motif-conge/type-motif-conge.model';

@Component({
  selector: 'app-employe-conge',
  templateUrl: './employe-conge-detail.component.html',
  styleUrls: ['./employe-conge.component.css']
})
export class EmployeCongeDetailComponent implements OnInit {

    // employeConge: EmployeConge;
    employeConge: EmployeConge = new EmployeConge();
    employeCongeT: EmployeConge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    id: number;
    typeMotifCongeId: number;
    typeMotifConge: TypeMotifConge;

    constructor(
    public activeModal: NgbActiveModal,
    private employeCongeService: EmployeCongeService,
    private typeMotifCongeService: TypeMotifCongeService,
    private eventManager: EventManagerService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
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
            this.typeMotifCongeId = +this.employeConge.id.codeTypeMotifConge;
        });
    }
    
    loadMotifConge(id) {
        this.typeMotifCongeService.find(id).subscribe((typeMotifConge) => {
            this.typeMotifConge = typeMotifConge;
        });
    }

    registerChangeInEmployes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeListModification', ( response ) => this.load(this.employeConge) );
    }

    previousState() {
        this.router.navigateByUrl('/conge-employe/'+this.id);
        // window.history.back();
    }

  clear() {
      this.router.navigateByUrl('/conge-employe/'+this.id);
      // window.history.back();
        // this.location.back(); // pour retourner à l'interface précédente
        // this.activeModal.dismiss('cancel');
    }

}
