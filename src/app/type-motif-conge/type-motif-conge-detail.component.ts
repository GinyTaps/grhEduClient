import { Component, OnInit } from '@angular/core';
import { TypeMotifConge } from './type-motif-conge.model';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute } from '@angular/router';
import { TypeMotifCongeService } from './type-motif-conge.service';

@Component({
  selector: 'app-type-motif-conge',
  templateUrl: './type-motif-conge-detail.component.html',
  styleUrls: ['./type-motif-conge.component.css']
})

export class TypeMotifCongeDetailComponent implements OnInit {

    typeMotifConge: TypeMotifConge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
    public activeModal: NgbActiveModal,
    private typeMotifCongeService: TypeMotifCongeService,
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
        this.typeMotifCongeService.find(id).subscribe((typeMotifConge) => {
            this.typeMotifConge = typeMotifConge;
        });
    }

    registerChangeInEmployes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typeMotifCongeListModification', ( response ) => this.load(this.typeMotifConge.codeTypeMotifConge) );
    }

    previousState() {
        window.history.back();
    }

  clear() {
        this.activeModal.dismiss('cancel');
    }
}
