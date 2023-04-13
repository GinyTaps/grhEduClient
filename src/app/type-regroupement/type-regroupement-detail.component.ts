import { Component, OnInit } from '@angular/core';
import { TypeRegroupement } from './type-regroupement.model';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute } from '@angular/router';
import { TypeRegroupementService } from './type-regroupement.service';

@Component({
  selector: 'app-type-regroupement',
  templateUrl: './type-regroupement-detail.component.html',
  styleUrls: ['./type-regroupement.component.css']
})

export class TypeRegroupementDetailComponent implements OnInit {
    
    typeRegroupement: TypeRegroupement;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    
    constructor(
    public activeModal: NgbActiveModal,
    private typeRegroupementService: TypeRegroupementService,
    private eventManager: EventManagerService,
    private activatedRoute: ActivatedRoute
    ) {
    }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
    
    }
    
    load(id) {
        this.typeRegroupementService.find(id).subscribe((typeRegroupement) => {
            this.typeRegroupement = typeRegroupement;
        });
    }
    
    registerChangeInTypeRegroupements() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typeRegroupementListModification', ( response ) => this.load(this.typeRegroupement.codeTypeRegroupement) );
    }
    
    previousState() {
        window.history.back();
    }
    
    clear() {
        this.activeModal.dismiss('cancel');
    }
}
