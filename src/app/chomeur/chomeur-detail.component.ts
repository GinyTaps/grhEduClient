import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChomeurService } from './chomeur.service';
import { Chomeur } from './chomeur.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';

@Component({
  selector: 'app-chomeur',
  templateUrl: './chomeur-detail.component.html',
  styleUrls: ['./chomeur.component.css']
})

export class ChomeurDetailComponent implements OnInit, OnDestroy {
    
    chomeur: Chomeur;
    id:number;
    routeData: any;
    // typeNationalite: TypeNationalite;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    
    constructor(
    public activeModal: NgbActiveModal,
    private chomeurService: ChomeurService,
    private eventManager: EventManagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
    }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['cho']);
            // this.id = params['id'];
        });
        this.registerChangeInChomeurs();
    }

    load(cho: number) {
        this.chomeurService.find(cho).subscribe((chomeur) => {
            this.chomeur = chomeur;
        });
    }

    registerChangeInChomeurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'chomeurListModification', ( response ) => this.load(this.chomeur.codeChomeur) );
    }

    previousState() {
        this.router.navigateByUrl( '/chomeur' );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    
}
