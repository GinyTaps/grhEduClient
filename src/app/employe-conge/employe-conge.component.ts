import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { EmployeConge } from './employe-conge.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeCongeService, ResponseWrapper, DataUtils } from './employe-conge.service';
import { Employe } from '../employe/employe.model';
import { TypeMotifConge } from '../type-motif-conge/type-motif-conge.model';
import { EmployeService } from '../employe/employe.service';
import { TypeMotifCongeService } from '../type-motif-conge/type-motif-conge.service';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component( {
    selector: 'app-employe-conge',
    templateUrl: './employe-conge.component.html',
    styleUrls: ['./employe-conge.component.css']
} )
export class EmployeCongeComponent implements OnInit, OnDestroy {

    pageEmployeConges: any;
    motCle: any;
    currentPage = 0;
    size = 5;
    p: number = 1; //pour la pagination
    pages: Array<number>;
    employeConges; // : EmployeConge;
    employeConge: EmployeConge = new EmployeConge();
    employes: Employe;
    typeMotifConges: TypeMotifConge;
    typeMotifCongeId: number;
    typeMotifConge: TypeMotifConge;
    empCSelected: number;
    routeData: any;
    subscription: Subscription;
    id: number;
    d: string;
    mode: number;
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    constructor(
        public activeModal: NgbActiveModal,
        private employeCongeService: EmployeCongeService,
        private employeService: EmployeService,
        private typeMotifCongeService: TypeMotifCongeService,
        private eventManager: EventManagerService,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private loginService: LoginService,
        private authService: AuthService,
        private router: Router
    ) {
        this.routeData = this.activatedRoute.data.subscribe(( data ) => (data) );
    }


    ngOnInit() {
        this.empCSelected = +this.activatedRoute.snapshot.paramMap.get('id');
        this.subscription = this.activatedRoute.queryParams.subscribe(params => {
            if((params['id']) && (params['d']) ) {
                this.idT = params['id'];
                this.dT = params['d'];
            }
        });
        if(this.base64regex.test(this.idT.toString())) {
            this.mode == 1;
            this.id = +atob(this.idT.toString()); //permet de décoder la valeur encodée
            this.d = atob(this.dT.toString());
            this.employeService.getAll().subscribe(data => {
                this.employes = data;
            });
            
        } else {
            this.mode = 1;
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                // this.d = this.dT;
                this.employeService.find(this.id).subscribe((employe) => {
                    this.employes = employe;
                });
            });
        }
        this.motCle = '';
        this.loadAll();
        this.registerChangeInEmployes();
        
            
        /*this.employeService.query()
            .subscribe(( res: ResponseWrapper ) => {
                this.employes = res.json;
                // console.log('@@@@@@@@@@@@@contenu de la liste déroulante: ' + this.employes +'@@@@@@@@@@');
            }, err => {
                this.onError( err );
            } );*/

        this.typeMotifCongeService.getAll()
            .subscribe(data => {
                this.typeMotifConges = data;
            }, err => this.onError(err) );

    }

    isAdmin() {
        return this.authService.isAdmin();
    }

    loadAll() {
        this.employeCongeService.getAll()
            .subscribe( data => { this.employeConges = data; }, err => { console.log( err ); } );
        if ( !this.motCle ) {
            this.employeCongeService.getAll()
                .subscribe( data => { this.pageEmployeConges = data; }, err => { console.log( err ); } );
        } else {
            this.employeCongeService.getAll()
                .subscribe( data => { this.pageEmployeConges = data; }, err => { console.log( err ); } );
        }
    }

    registerChangeInEmployes() {
        this.eventManager.subscribe( 'employeListModification', ( response ) => this.loadAll() );
    }

    private onSuccess( data, headers ) {
        this.employeConges = data;
    }
    
    deleteEmpConge(empC: EmployeConge) {
        this.employeCongeService.delete(+empC.id.codeEmploye, empC.id.dateDebutConge).subscribe(res => {
            this.onSaveSuccess(res);
        });
    }

    onError( error ) {
        console.log( error );
        // error(error.message, null, null);
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeListModification'} );
        this.loadAll();
      }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }


    onSearch() {
        if ( this.motCle ) {
            this.employeCongeService.search( this.motCle, this.currentPage, this.size )
                .subscribe( data => {
                    console.log( data );
                    this.employeConges = data;
                    // this.pages = new Array(data.totalPages); 
                }, err => {
                    console.log( JSON.parse( err._body ).message ); // pour vérifier les détails de l'erreur
                } );
        }
    }

    trackId( index: number, item: EmployeConge ) {
        // console.log('********* Contenu de lid: ' + item.id + '******');
        return item.id;
    }

    trackEmployeById( index: number, item: Employe ) {
        return item.codeEmploye;
    }

    trackTypeMotifCongeById( index: number, item: TypeMotifConge ) {
        return item.codeTypeMotifConge;
    }

    goToPage( i: number ) {
        this.currentPage = i;
        this.onSearch();
    }

    clear() {
        this.router.navigateByUrl( '/employe-conge' );
        // this.location.back();
        // this.activeModal.dismiss('cancel');
    }

    /****************************** Gestion de la vue détails **************************************/

    displayDetails(empC: EmployeConge) {
        this.mode == 2;
        this.load(empC);
        this.subscription = this.activatedRoute.params.subscribe(( params ) => {
            this.employeConge.id.codeEmploye = params['id'];
            this.employeConge.id.dateDebutConge= params['d'];
            this.id = +params['id'];
        } );
    }

    load(empC: EmployeConge) {
        this.employeCongeService.find(empC).subscribe(( employeConge ) => {
            this.employeConge = employeConge;
            this.typeMotifCongeId = +this.employeConge.id.codeTypeMotifConge;
            this.loadMotifConge(this.typeMotifCongeId);
        } );
    }

    loadMotifConge(id) {
        this.typeMotifCongeService.find(id).subscribe(( typeMotifConge ) => {
            this.typeMotifConge = typeMotifConge;
        } );
    }

    previousState() {
        this.router.navigateByUrl( '/conge-employe/' + this.id );
        // window.history.back();
    }



}
