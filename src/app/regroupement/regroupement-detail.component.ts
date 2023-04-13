import { Component, OnInit } from '@angular/core';
import { Regroupement } from './regroupement.model';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute } from '@angular/router';
import { RegroupementService } from './regroupement.service';

@Component({
  selector: 'app-regroupement',
  templateUrl: './regroupement-detail.component.html',
  styleUrls: ['./regroupement.component.css']
})

export class RegroupementDetailComponent implements OnInit {
    
    regroupement: Regroupement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    
    constructor(
    public activeModal: NgbActiveModal,
    private regroupementService: RegroupementService,
    private eventManager: EventManagerService,
    private activatedRoute: ActivatedRoute
    ) {
    }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegroupements();
    }
    
    load(id) {
        this.regroupementService.find(id).subscribe((regroupement) => {
            this.regroupement = regroupement;
        });
    }
    
    registerChangeInRegroupements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'regroupementListModification', ( response ) => this.load(this.regroupement.codeRegroupement) );
    }
    
    previousState() {
        window.history.back();
    }
    
    clear() {
        this.activeModal.dismiss('cancel');
    }
}
