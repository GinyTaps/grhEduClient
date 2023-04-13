import { OnInit, Component } from '@angular/core';
import { TypeNationalite } from './type-nationalite.model';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeNationaliteService } from './type-nationalite.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type-nationalite',
  templateUrl: './type-nationalite-detail.component.html',
  styleUrls: ['./type-nationalite.component.css']
})

export class TypeNationaliteDetailComponent implements OnInit {

    typeNationalite: TypeNationalite;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
    public activeModal: NgbActiveModal,
    private typeNationaliteService: TypeNationaliteService,
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
        this.typeNationaliteService.find(id).subscribe((typeNationalite) => {
            this.typeNationalite = typeNationalite;
        });
    }

    registerChangeInTypeNationalites() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typeNationaliteListModification', ( response ) => this.load(this.typeNationalite.codeTypeNationalite) );
    }

    previousState() {
        window.history.back();
    }

  clear() {
        this.activeModal.dismiss('cancel');
    }

}
