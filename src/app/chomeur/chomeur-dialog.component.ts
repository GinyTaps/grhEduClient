
import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChomeurService, ResponseWrapper } from './chomeur.service';
import { Chomeur } from './chomeur.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ChomeurPopupService } from './chomeur-popup.service';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';
import { TypeNationaliteService } from '../type-nationalite/type-nationalite.service';
import { TypeSexeService } from '../type-sexe/type-sexe.service';
import { TypeSexe } from '../type-sexe/type-sexe.model';
import { EventManagerService } from '../event-manager.service';
import { TypeEtatCivil } from '../type-etat-civil/type-etat-civil.model';
import { Regroupement } from '../regroupement/regroupement.model';
import { TypeEtatCivilService } from '../type-etat-civil/type-etat-civil.service';
import { RegroupementService } from '../regroupement/regroupement.service';
import { TypeDiplomeService } from '../type-diplome/type-diplome.service';
import { TypeDiplome } from '../type-diplome/type-diplome.model';

@Component({
  selector: 'app-chomeur',
  templateUrl: './chomeur-dialog.component.html',
  styleUrls: ['./chomeur.component.css'],
  providers: [DatePipe]
})

export class ChomeurDialogComponent implements OnInit {
    
    chomeur: Chomeur= new Chomeur();
    typeNationalites: TypeNationalite;
    typeEtatCivils: TypeEtatCivil;
    regroupements: Regroupement;
    typeSexes: TypeSexe;
    typeDiplomes: TypeDiplome;
    subscription: Subscription;
    mode: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private chomeurService: ChomeurService,
        private typeNationaliteService: TypeNationaliteService,
        private typeSexeService: TypeSexeService,
        private typeDiplomeService: TypeDiplomeService,
        private typeEtatCivilService: TypeEtatCivilService,
        private regroupementService: RegroupementService,
        private datePipe: DatePipe,
        private eventManager: EventManagerService,
        public activatedRoute: ActivatedRoute,
        private router: Router
        ) {
      }

    ngOnInit() {

        this.typeNationaliteService.getAll().subscribe(data => {
                this.typeNationalites = data; },  err => {
                    this.onError(err)
                    });
        
        this.typeSexeService.getAll().subscribe(data => {
                this.typeSexes = data; },  err => {
                    this.onError( err )
                });
        this.regroupementService.getAll().subscribe(data => {
                this.regroupements = data; }, err => {
                    this.onError(err)
                });
        this.typeDiplomeService.getAll().subscribe(data =>{
            this.typeDiplomes = data;
        });
        
        this.typeEtatCivilService.getAll().subscribe(data => {
                this.typeEtatCivils = data; }, ( res: ResponseWrapper ) => this.onError( res.json ));
        
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            if(params['id']) {
                // console.log(params['id']);
                this.load(params['id']);
                this.mode = false;
            }
            else {
                this.mode = true;
            }
        });
    }
    
    load(id:number) {
        this.chomeurService.find(id).subscribe((chomeur) => {
            this.chomeur = chomeur;
            this.chomeur.dateCinChomeur = this.datePipe.transform(chomeur.dateCinChomeur, 'yyyy-MM-dd');
        });
    }

    clear() {
        this.router.navigateByUrl('/chomeur');
     // this.activeModal.dismiss('cancel');
     // window.history.back();
    }

    save() {
        /*if ( this.chomeur.codeChomeur !== undefined ) {
            this.subscribeToSaveResponse(this.chomeurService.update(this.chomeur));
            // this.chomeurService.update( this.chomeur ).subscribe(( response ) => this.onSaveSuccess( response ) );
            // , () => this.onSaveError() );
        } else {*/
            this.subscribeToSaveResponse(this.chomeurService.create(this.chomeur));
            // this.chomeurService.create( this.chomeur ).subscribe(( response ) => this.onSaveSuccess( response ) );
            // , () => this.onSaveError() );
        // }
    }
    
    edit() {
        this.subscribeToSaveResponse(this.chomeurService.update(this.chomeur));
    }

    subscribeToSaveResponse(result: Observable<Chomeur>) {
      result.subscribe((res: Chomeur) => {
          this.onSaveSuccess(res);
      },err => {
          console.log(err);
      });// this.onSaveError(res));
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'chomeurListModification'} );
        this.router.navigateByUrl('/chomeur');
        // this.activeModal.dismiss( result );
    }

     onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.onError(error);
    }

    onError(error) {
        console.log(error.message);
        return (error.message); 
    }
}

@Component({
    selector: 'app-chomeur-popup',
    template: ''
})
export class ChomeurDialogPopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    chomeur: Chomeur;
    subscription: Subscription;
    modalRef: NgbModalRef;

    constructor(
        private chomeurService: ChomeurService,
        private chomeurPopupService: ChomeurPopupService,
        private datePipe: DatePipe,
        public activatedRoute: ActivatedRoute 
    ) {
  }

    ngOnInit() {
        this.routeSub = this.activatedRoute.params.subscribe((params) => {
            if ( params['id'] ) {
                this.chomeurPopupService.open(ChomeurDialogComponent as Component, params['id']);
            } else {
                this.chomeurPopupService.open(ChomeurDialogComponent as Component);
            }
        });
    }

    load(id) {
        this.chomeurService.find(id).subscribe((chomeur) => {
            this.chomeur = chomeur;
            this.chomeur.dateCinChomeur = this.datePipe.transform(chomeur.dateCinChomeur, 'yyyy-MM-dd');
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }


}
