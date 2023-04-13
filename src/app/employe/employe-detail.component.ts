import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from './employe.service';
import { Employe } from './employe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';
import { TypeSexe } from '../type-sexe/type-sexe.model';
import { TypeNationaliteService } from '../type-nationalite/type-nationalite.service';
import { TypeSexeService, ResponseWrapper } from '../type-sexe/type-sexe.service';
import { TypeEtatCivil } from '../type-etat-civil/type-etat-civil.model';
import { TypeEtatCivilService } from '../type-etat-civil/type-etat-civil.service';
import { EmployeEtatCivil } from '../employe-etat-civil/employe-etat-civil.model';
import { EmployeEtatCivilService } from '../employe-etat-civil/employe-etat-civil.service';
import { EmployePoste } from '../employe-poste/employe-poste.model';
import { EmployePosteService } from '../employe-poste/employe-poste.service';
import { Poste } from '../poste/poste.model';
import { PosteService } from '../poste/poste.service';
import { TypeFonction } from '../type-fonction/type-fonction.model';
import { TypeStatutEntite } from '../type-statut-entite/type-statut-entite.model';
import { TypeStatutEntiteService } from '../type-statut-entite/type-statut-entite.service';
import { TypeFonctionService } from '../type-fonction/type-fonction.service';
import { EmployeAffectation } from '../employe-affectation/employe-affectation.model';
import { EmployeAffectationService } from '../employe-affectation/employe-affectation.service';
import { EmployeTransfert } from '../employe-transfert/employe-transfert.model';
import { EmployeTransfertService } from '../employe-transfert/employe-transfert.service';
import { EmployeDetachement } from '../employe-detachement/employe-detachement.model';
import { EmployeDemission } from '../employe-demission/employe-demission.model';
import { EmployeDisponibilite } from '../employe-disponibilite/employe-disponibilite.model';
import { EmployeSuspension } from '../employe-suspension/employe-suspension.model';
import { EmployeMutation } from '../employe-mutation/employe-mutation.model';
import { EmployeRenvoi } from '../employe-renvoi/employe-renvoi.model';
import { EmployeRetraite } from '../employe-retraite/employe-retraite.model';
import { EmployeRevocation } from '../employe-revocation/employe-revocation.model';
import { EmployeDeces } from '../employe-deces/employe-deces.model';
import { EmployeDetachementService } from '../employe-detachement/employe-detachement.service';
import { EmployeDemissionService } from '../employe-demission/employe-demission.service';
import { EmployeDisponibiliteService } from '../employe-disponibilite/employe-disponibilite.service';
import { EmployeSuspensionService } from '../employe-suspension/employe-suspension.service';
import { EmployeMutationService } from '../employe-mutation/employe-mutation.service';
import { EmployeDecesService } from '../employe-deces/employe-deces.service';
import { EmployeRetraiteService } from '../employe-retraite/employe-retraite.service';
import { EmployeRevocationService } from '../employe-revocation/employe-revocation.service';
import { EmployeRenvoiService } from '../employe-renvoi/employe-renvoi.service';
import { EmployeHandicap } from '../employe-handicap/employe-handicap.model';
import { EmployeHandicapService } from '../employe-handicap/employe-handicap.service';
import { TypeHandicap } from '../type-handicap/type-handicap.model';
import { TypeHandicapService } from '../type-handicap/type-handicap.service';
import { TypePathologieService } from '../type-pathologie/type-pathologie.service';
import { TypePathologie } from '../type-pathologie/type-pathologie.model';
import { EmployePathologieService } from '../employe-pathologie/employe-pathologie.service';
import { EmployePathologie } from '../employe-pathologie/employe-pathologie.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';
import { TypeSituationService } from '../type-situation/type-situation.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { TypeSituation } from '../type-situation/type-situation.model';
import { EmployeRegroupementService } from '../employe-regroupement/employe-regroupement.service';
import { EmployeRegroupement } from '../employe-regroupement/employe-regroupement.model';
import { RegroupementService } from '../regroupement/regroupement.service';
import { Regroupement } from '../regroupement/regroupement.model';

@Component( {
    selector: 'app-employe',
    templateUrl: './employe-detail.component.html',
    styleUrls: ['./employe.component.css']
} )

export class EmployeDetailComponent implements OnInit, OnDestroy {


    employe: Employe;
    routeData: any;
    id: number;
    d: string;
    url = '';
    poste: Poste;
    posteT: Poste;
    employePosteId: number;
    employePoste: EmployePoste;
    employePostes: EmployePoste;
    employePosteT: EmployePoste;
    employeEtatCivils: EmployeEtatCivil;
    employeEtatCivil: EmployeEtatCivil = new EmployeEtatCivil();
    postes: Poste;
    regroupements: Regroupement;
    typeNationalite: TypeNationalite;
    typeNationaliteId: number;
    typeSexeId: number;
    typeSexe: TypeSexe;
    typeEtatCivils: TypeEtatCivil;
    typeStatutEntite: TypeStatutEntite;
    typeStatutEntiteId: number;
    typeFonction: TypeFonction;
    typeFonctions: TypeFonction;
    typeFonctionId: number;
    typeHandicaps: TypeHandicap;
    typePathologies: TypePathologie;
    typeSituation: TypeSituation;
    typeSituations: TypeSituation;
    employeAffectation: EmployeAffectation;
    employeTransfert: EmployeTransfert;
    employeDetachement: EmployeDetachement;
    employeDemission: EmployeDemission;
    employeDisponibilite: EmployeDisponibilite;
    employeSuspension: EmployeSuspension;
    employeMutation: EmployeMutation;
    employeDeces: EmployeDeces;
    employeRegroupements: EmployeRegroupement;
    employeRetraite: EmployeRetraite;
    employeRevocation: EmployeRevocation;
    employeRenvoi: EmployeRenvoi;
    employeHandicaps: EmployeHandicap;
    employeHandicap: EmployeHandicap = new EmployeHandicap();
    employePathologie: EmployePathologie = new EmployePathologie();
    employePathologies: EmployePathologie;
    employeSituation: EmployeSituation = new EmployeSituation();
    employeSituations: EmployeSituation;
    subscription: Subscription;
    eventSubscriber: Subscription;
    mode: number;
    show: boolean;
    typeSelected: string;
    display: number;
    hide: boolean;
    code: number = 0;
    codeEmp = null;
    dateEmp = null;
    title: string;
    dataLink: string = null;


    constructor(
        public activeModal: NgbActiveModal,
        private employeService: EmployeService,
        private typeNationaliteService: TypeNationaliteService,
        private typeSexeService: TypeSexeService,
        private typeEtatCivilService: TypeEtatCivilService,
        private typeStatutEntiteService: TypeStatutEntiteService,
        private typeFonctionService: TypeFonctionService,
        private typeHandicapService: TypeHandicapService,
        private typePathologieService: TypePathologieService,
        private typeSituationService: TypeSituationService,
        private employeEtatCivilService: EmployeEtatCivilService,
        private employePosteService: EmployePosteService,
        private employeRegroupementService: EmployeRegroupementService,
        private employeAffectationService: EmployeAffectationService,
        private employeTransfertService: EmployeTransfertService,
        private employeDetachementService: EmployeDetachementService,
        private employeDemissionService: EmployeDemissionService,
        private employeDisponibiliteService: EmployeDisponibiliteService,
        private employeSuspensionService: EmployeSuspensionService,
        private employeMutationService: EmployeMutationService,
        private employeDecesService: EmployeDecesService,
        private employeRetraiteService: EmployeRetraiteService,
        private employeRevocationService: EmployeRevocationService,
        private employeRenvoiService: EmployeRenvoiService,
        private employeHandicapService: EmployeHandicapService,
        private employePathologieService: EmployePathologieService,
        private employeSituationService: EmployeSituationService,
        private posteService: PosteService,
        private regroupementService: RegroupementService,
        private eventManager: EventManagerService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => ( data ) );
    }

    ngOnInit() {
        this.mode = 1;
        this.show = false;
        this.display = 0;
        this.subscription = this.activatedRoute.params.subscribe(( params ) => {
            this.id = +params['id'];
            this.dataLink = params['dl'];
            // console.log(this.id);
        });
        
        this.load(this.id);
        // this.getRoutePoste();
        // this.loadNationalite(this.typeNationaliteId); //pour afficher le libellé de la nationalité
        // this.loadSexe(this.typeSexeId); // pour afficher le libellé du sexe
        this.registerChangeInEmployes();
    }
    
    // pour gérer l'accès des onglets 
    getRoute(emp: EmployeSituation) {
        // console.log(emp);
        this.code = +emp.id.codeTypeSituation;
        this.codeEmp = btoa(emp.id.codeEmploye);
        this.dateEmp = btoa(emp.id.dateDebutSituation);  //permet de coder la valeur dans l'url
        // console.log(this.code);
        /*this.codeEmp = emp.id.codeEmploye;
        this.dateEmp = emp.id.dateDebutSituation;*/
        this.employeService.getRouteEmp(this.code, this.codeEmp, this.dateEmp);
        
    }
    loadEmpSituation(id) {
        this.employeSituationService.findAll(id).subscribe(data => {
            this.employeSituations = data;
        });
    }

    load(id) {
        this.employeService.find(id).subscribe(( employe ) => {
            this.employe = employe;
            this.typeNationaliteId = this.employe.codeTypeNationalite;
            this.loadNationalite( this.typeNationaliteId );
            this.typeSexeId = this.employe.codeTypeSexe;
            this.loadSexe( this.typeSexeId );
            this.loadTypeSituation();
        } );
        
        this.employeSituationService.findAll(id).subscribe(data => {
            this.employeSituations = data;
            /*for(let ts of Array(this.employeSituations)) {
                this.typeSituationService.find(+ts.id.codeTypeSituation).subscribe(data => {
                    this.typeSituations = data;
                    this.navigRoute = '/employe-'+this.typeSituations.libelleTypeSituation;
                    console.log(this.navigRoute);
                })
            }*/
            
        });

        this.employeEtatCivilService.findAll(id).subscribe(data => {
            this.employeEtatCivils = data; // Array(data);
            // console.log(this.employeEtatCivils);
        } );
        
        this.regroupementService.findLast(id).subscribe(data => {
            this.regroupements = data;
        });
        
        this.posteService.findLastP(id).subscribe(data => {
            this.postes = data;
        });
        
        this.typeFonctionService.findLast(id).subscribe(data => {
            this.typeFonctions = data;
        });

        this.employePosteService.getLast(id).subscribe(data => {
            this.employePostes = data.body;
            if(data.status != 404) {
                this.title = 'Ré-affecter à un nouveau poste';
            } else {
                this.title = 'Affecter à un nouveau poste';
            }
            this.employePoste = data.body;
            this.employePosteId = +this.employePoste.id.codePoste;
            // console.log(this.employePosteId);
            this.loadPoste( this.employePosteId );
            } )
        
        this.employePosteService.findAll(id).subscribe(data => {
            this.employePosteT = data;
            // console.log(+this.employePosteT.id.codePoste);
            /*this.posteService.find(+this.employePosteT.id.codePoste).subscribe(data => {
                this.posteT = data;
            });*/
        } )
        
        this.posteService.getAll().subscribe(data => {
            this.posteT = data;
        } )

        this.employeAffectationService.findAll(id).subscribe(data => {
            this.employeAffectation = data;
        } )

        this.employeTransfertService.findAll(id).subscribe(data => {
            this.employeTransfert = data;
        } )

        this.employeDetachementService.findAll(id).subscribe(data => {
            this.employeDetachement = data;
        } )

        this.employeHandicapService.findAll(id).subscribe(data => {
            this.employeHandicaps = data;
        } )

        this.employePathologieService.findAll(id).subscribe(data => {
            this.employePathologies = data;
        } )

        this.typeEtatCivilService.getAll().subscribe(data => {
            this.typeEtatCivils = data;
        } );
        this.typeHandicapService.getAll().subscribe(( data ) => {
            this.typeHandicaps = data;
        } );
        this.typePathologieService.getAll().subscribe(( data ) => {
            this.typePathologies = data;
        } );

    }

    loadPoste(id) {
        this.posteService.find(id).subscribe(poste => {
            this.poste = poste;
            this.typeFonctionId = +this.poste.codeTypeFonction;
            this.loadTypeFonction( this.typeFonctionId );
            this.typeStatutEntiteId = +this.poste.codeTypeStatutEntite;
            this.loadTypeStatut( this.typeStatutEntiteId );
        } )
    }

    loadTypeFonction(id) {
        this.typeFonctionService.find(id).subscribe(( typeFonction ) => {
            this.typeFonction = typeFonction;
        } )
    }

    loadTypeStatut( id ) {
        this.typeStatutEntiteService.find( id ).subscribe(( typeStatutEntite ) => {
            this.typeStatutEntite = typeStatutEntite;
        } )
    }
    
    loadTypeSituation() {
        this.typeSituationService.getAll().subscribe(data => {
            this.typeSituation = data;
        })
    }

    onError( error ) {
        console.log( error.message );
        return ( error.message );
    }

    /*tadmin(){
        this.hide = false;
        this.show = true;
        return class{active};
    }
    
    tecole(){
        this.hide = true;
        this.show = false;
        return class{active};
    }*/

    loadNationalite( id ) {
        this.typeNationaliteService.find( id ).subscribe(( typeNationalite ) => {
            this.typeNationalite = typeNationalite;
        } );
    }

    loadSexe( id ) {
        this.typeSexeService.find( id ).subscribe(( typeSexe ) => {
            this.typeSexe = typeSexe;
        } );
    }

    registerChangeInEmployes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'employeListModification', ( response ) => this.load( this.employe.codeEmploye ) );
    }

    onSelectFile( event: any ) { // called each time file input changes
        if ( event.target.files && event.target.files[0] ) {
            var reader = new FileReader();

            reader.onload = ( event: any ) => {
                this.url = event.target.result;
            }

            reader.readAsDataURL( event.target.files[0] );
        }

        /*if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();

          reader.readAsDataURL(event.target.files[0]); // read file as data url

          reader.onload = (event) => { // called once readAsDataURL is completed
            this.url = event.target.result;
          }
        }*/
    }

    previousState() {
        if(this.dataLink.match('rg')) {
            this.router.navigateByUrl( '/employe-rg' );
        } else if(this.dataLink.match('rp')) {
            this.router.navigateByUrl( '/employe-rp' );
        } else {
            if(this.dataLink.match('ra')) {
                this.router.navigateByUrl( '/employe-rep-admin' );
            } else if(this.dataLink.match('re')) {
                this.router.navigateByUrl( '/employe-etablissement' );
            } else {
                this.router.navigateByUrl( '/employe' );
                // window.history.back();
            }
        }    
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy( this.eventSubscriber );
    }
    
    deletePoste(p: EmployePoste) {
        this.employePosteService.delete(+p.id.codeEmploye, p.id.dateDebutEmployePoste).subscribe(res => {
            this.onSaveSuccess(res);
        });
    }

    /******************************* Liste des état civils ***********************************/

    // Fonction permettant de supprimer la ligne cochée
    deleteEtatCivil(empE: EmployeEtatCivil) { // , event: any ) {
        this.employeEtatCivilService.delete(+empE.id.codeEmploye, empE.id.dateEmployeEtatCivil).subscribe(( response ) => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
            this.ngOnInit();
        } );
    }

    /****************************** Création d'un état civil *************************************/
    createEtatCivil() {
        this.mode = 2;
    }

    save() {
        this.employeEtatCivil.id.codeEmploye = this.id.toString();
        this.employeEtatCivilService.create(this.employeEtatCivil).subscribe(res => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
            this.mode = 1;
        });
    }

    subscribeToSaveResponse(result: Observable<EmployeEtatCivil>) {
        result.subscribe((res: EmployeEtatCivil) => {
            console.log(res);
            this.onSaveSuccess(res);
        } );
    }

    close() {
        this.mode = 1;
        this.typeSelected = null;
        this.show = false;
        this.display = 0;
    }

    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeListModification' } );
        this.ngOnInit();
    }

    /****************************** Edition *************************************/
    editEtatCivil(empE: EmployeEtatCivil) {
        this.mode = 3;
        this.d = empE.id.dateEmployeEtatCivil;
        this.employeEtatCivilService.find(empE).subscribe(( employeEtatCivil ) => {
            this.employeEtatCivil = employeEtatCivil;
        } );
        // this.edit();
    }

    edit() {
        this.employeEtatCivilService.delete(this.id, this.d).subscribe(( response ) => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
        } );
        this.employeEtatCivil.id.codeEmploye = this.id.toString();
        this.subscribeToSaveResponse( this.employeEtatCivilService.create( this.employeEtatCivil ) );
    }

    /******************************************** Suppression *************************************/
    deleteHistorique(empS: EmployeSituation) {
        /*console.log( id );
        console.log( d );*/
        
        this.employeSituationService.delete(+empS.id.codeEmploye, empS.id.dateDebutSituation).subscribe(( response ) => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
            this.ngOnInit();
        } );
    }

    /*deleteEtatCivil(id:number, d: String) {
        this.mode = 4;
        this.employeEtatCivilService.find(id, d).subscribe( (employeEtatCivil) => {
            this.employeEtatCivil = employeEtatCivil;
        });
    }
    
    delete(id: number, d: String) {
        console.log(id);
        console.log(d);
        this.employeEtatCivilService.delete(id, d).subscribe((response) => {
            this.eventManager.broadcast({name: 'employeListModification'});
            this.ngOnInit();
        });
    }*/
    
    /****************************** Edition *************************************/
    

    /*********************************** Informations spécifiques ******************************************/

    create() {
        this.show = true;
    }

    selectedVal() {
        switch ( this.typeSelected ) {
            case ( this.typeSelected = 'employe-handicap' ): {
                this.createHandicap();
                // this.router.navigateByUrl('/'+this.typeSelected+'/'+this.id);
                break;
            } case ( this.typeSelected = 'employe-pathologie' ): {
                this.createPathologie();
                // this.router.navigateByUrl('/'+this.typeSelected+'/'+this.id);
                break;
            } default: {
                break;
            }
        }
    }

    /************@@@@@@@********** Handicap ********@@@@@@@*************/

    createHandicap() {
        this.display = 1;
        this.typeHandicapService.getAll().subscribe( data => {
            this.typeHandicaps = data;
        } );
    }

    saveHandicap() {
        this.employeHandicap.id.codeEmploye = this.id.toString();
        this.employeHandicapService.create( this.employeHandicap ).subscribe(( response ) => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
            this.ngOnInit();
        } );
    }

    editHandicap(empH: EmployeHandicap) {
        this.display = 1;
        this.show = true;
        this.hide = true;
        this.d = empH.id.dateEmployeHandicap;
        this.employeHandicapService.find(empH).subscribe(( employeHandicap ) => {
            this.employeHandicap = employeHandicap;
        } );
    }

    editH() {
        this.employeHandicapService.delete(this.id, this.d).subscribe( res => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
        });
        this.employeHandicap.id.codeEmploye = this.id.toString();
        this.employeHandicapService.create( this.employeHandicap ).subscribe(( response ) => {
            this.onSaveSuccess(response);
        } );
    }

    deleteHandicap(empH: EmployeHandicap) {
        this.employeHandicapService.delete(+empH.id.codeEmploye, empH.id.dateEmployeHandicap).subscribe(( response ) => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
            this.ngOnInit();
        } );
    }

    /***********@@@@@@@@@************ Pathologie **********@@@@@@@@@************/

    createPathologie() {
        this.display = 2;
        this.typePathologieService.getAll().subscribe( data => {
            this.typePathologies = data;
        } );
    }

    savePathologie() {
        // console.log('bouton création');
        // console.log(this.employePathologie);
        this.employePathologie.id.codeEmploye = this.id.toString();
        this.employePathologieService.create( this.employePathologie ).subscribe(( response ) => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
            this.ngOnInit();
        } );
    }


    editPathologie(empP: EmployePathologie) {
        this.display = 2; // pour afficher les deux types de spécification en fonction du choix fait dans la liste
        this.show = true; // pour gérer la liste déroulante
        this.hide = true; // pour gérer le bouton d'enregistrement de l'édition
        this.d = empP.id.dateEmployePathologie;
        this.employePathologieService.find(empP).subscribe(( employePathologie ) => {
            this.employePathologie = employePathologie;
        } );

    }

    editP() {
        this.employePathologieService.delete(this.id, this.d).subscribe(( response ) => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
        } );
        this.employePathologie.id.codeEmploye = this.id.toString();
        this.employePathologieService.create( this.employePathologie ).subscribe(( response ) => {
            this.onSaveSuccess( response );
        } );

    }

    deletePathologie(empP: EmployePathologie) {
        this.employePathologieService.delete(+empP.id.codeEmploye, empP.id.dateEmployePathologie).subscribe(( response ) => {
            this.eventManager.broadcast( { name: 'employeListModification' } );
            this.ngOnInit();
        } );
    }

    
    /**** Essai pour la gestion de l'accès des onglets
     * getRoutePoste() {
        // this.router.navigate(['/employe-poste'], {queryParams: { id: this.id}});
        this.employePosteService.getLast(this.id).subscribe(data => {
            this.statut = data.status;
            if(data.status === 404) {
                this.router.navigate(['/employe-poste'], {queryParams: { id: this.id}});
            } else {
                this.loadEmpSituation(this.id);
                this.router.navigate(['/employe-affectation'], {queryParams: { id: this.id, d: this.employeSituations.id.dateDebutSituation}});
            }
        });
      }
    
    getRouteAffectation() {
        this.router.navigate(['/employe-affectation'], {queryParams: { id: this.id, d: this.employeSituations.id.dateDebutSituation}});
    }
    
     * ****/
}
