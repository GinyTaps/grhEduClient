import { Component, OnInit } from '@angular/core';
import { TypeSexe } from './type-sexe.model';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeSexeService } from './type-sexe.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-sexe',
  templateUrl: './type-sexe-detail.component.html',
  styleUrls: ['./type-sexe.component.css']
})

export class TypeSexeDetailComponent implements OnInit {

    typeSexe: TypeSexe;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
    public activeModal: NgbActiveModal,
    private typeSexeService: TypeSexeService,
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
        this.typeSexeService.find(id).subscribe((typeSexe) => {
            this.typeSexe = typeSexe;
        });
    }

    registerChangeInEmployes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typeSexeListModification', ( response ) => this.load(this.typeSexe.codeTypeSexe) );
    }

    previousState() {
        window.history.back();
    }

  clear() {
        this.activeModal.dismiss('cancel');
    }

}
