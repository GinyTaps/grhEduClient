import { Component, OnInit } from '@angular/core';
import { TypeEtatCivil } from './type-etat-civil.model';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeEtatCivilService } from './type-etat-civil.service';

@Component({
  selector: 'app-type-etat-civil',
  templateUrl: './type-etat-civil-detail.component.html',
  styleUrls: ['./type-etat-civil.component.css']
})

export class TypeEtatCivilDetailComponent implements OnInit {
    
    typeEtatCivil: TypeEtatCivil;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    
    constructor(
        public activeModal: NgbActiveModal,
        private typeEtatCivilService: TypeEtatCivilService,
        private eventManager: EventManagerService,
        private activatedRoute: ActivatedRoute,
        private router: Router
        ) {
    }
    
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.load(params['id']);
        });
    
    }
    
    load(id) {
        this.typeEtatCivilService.find(id).subscribe((typeEtatCivil) => {
            this.typeEtatCivil = typeEtatCivil;
        });
    }
    
    registerChangeInEmployes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'typeMotifCongeListModification', ( response ) => this.load(this.typeEtatCivil.codeTypeEtatCivil) );
    }
    
    previousState() {
        this.router.navigateByUrl('/typeEtatCivil');
        // window.history.back();
    }
    
    clear() {
        this.router.navigateByUrl('/typeEtatCivil');
        // this.activeModal.dismiss('cancel');
    }
}
