import { OnInit, Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { EmployeConge } from '../employe-conge/employe-conge.model';
import { Employe } from '../employe/employe.model';
import { TypeMotifConge } from '../type-motif-conge/type-motif-conge.model';
import { EmployeCongeService, ResponseWrapper } from '../employe-conge/employe-conge.service';
import { EmployeService } from '../employe/employe.service';
import { TypeMotifCongeService } from '../type-motif-conge/type-motif-conge.service';
import { EventManagerService } from '../event-manager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth.service';
import { EmployeSituation } from '../employe-situation/employe-situation.model';
import { EmployeSituationService } from '../employe-situation/employe-situation.service';

@Component({
    selector: 'app-conge-employe',
    templateUrl: './conge-employe.component.html',
    styleUrls: ['./employe.component.css']
  })
export class CongeEmployeComponent implements OnInit, OnDestroy {
    
    pageEmployeConges: any;
    motCle: any;
    employeConges: EmployeConge;
    employeConge: EmployeConge = new EmployeConge();
    // employes: Employe;
    employe: Employe;
    employeSituation: EmployeSituation;
    typeMotifConges: TypeMotifConge[] = [];
    typeConges: TypeMotifConge;
    typeMotifConge: TypeMotifConge;
    typeMotifCongeId: any;
    congeEmpSelected: number;
    routeData: any;
    subscription: Subscription;
    id: number;
    d: string;
    mode: number;
    header: string;
    conge: any;
    errorEmpExists: string;
    errorDateExists: string;
    errorDureeExists: string;
    testF: String = 'false';
    testT: String = 'true';
    dateValid: String;
    dureeValid: String;
    codeTypeSituation: number = 2;
    p: number = 1; //pour la pagination
    idT:number = 0; 
    dT: string = '';
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

    constructor(
            private employeCongeService: EmployeCongeService,
            private employeService: EmployeService,
            private employeSituationService: EmployeSituationService,
            private typeMotifCongeService: TypeMotifCongeService,
            private eventManager: EventManagerService,
            private activatedRoute: ActivatedRoute,
            private location: Location,
            private loginService: LoginService,
            private authService: AuthService,
            private router: Router
            ) {
            this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
            /*this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.loadAll(params['id']);
                console.log(params['id']);
            });*/ 
          }
    
    ngOnInit() {
        
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
            this.loadEmp(this.id);
           
            
        } else {
            this.mode = 1;
            this.subscription = this.activatedRoute.params.subscribe((params) => {
                this.id = params['id'];
                this.congeEmpSelected = +this.id;
                this.loadAll(this.congeEmpSelected);
                this.loadConge();
                this.loadEmp(this.congeEmpSelected); //pour afficher le nom de l'employé concerné
                
            });
        }
        this.registerChangeInEmployes();
        
        /*this.employeService.query()
        .subscribe(( res: ResponseWrapper ) => {
            this.employes = res.json;
            },  err => {
                this.onError(err);
                });

        this.typeMotifCongeService.query()
        .subscribe(( res: ResponseWrapper ) => {
            this.typeMotifConges = res.json; }, ( res: ResponseWrapper ) => this.onError( res.json ));*/

      }
    
    loadAll(id) {
        this.employeCongeService.findAll(id).subscribe((employeConges) => { 
              this.employeConges = employeConges;
              // console.log(this.employeConges);
              for(let i = 0; i <= Array.of(employeConges).length; i++){
                  for(let j in Array.of(employeConges)[i] ){
                      this.typeMotifCongeId = this.employeConges[j].id.codeTypeMotifConge;
                  
                      // console.log(this.typeMotifCongeId);
                      this.loadMotifConge(this.typeMotifCongeId);
                      // console.log(this.loadMotifConge(this.employeConges[i][this.typeMotifCongeId]));// pour afficher le libellé du congé
                  }
                  // this.loadMotifConge(this.typeMotifCongeId);
              }
              
              /*for(let i = 0; i <= Array.of(employeConges).length; i++){
                  this.typeMotifCongeId = this.employeConges[i].id.codeTypeMotifConge;
                  for(this.typeMotifCongeId in Array.of(employeConges)[i] ){
                      console.log(this.typeMotifCongeId);
                      // this.loadMotifConge(this.typeMotifCongeId);
                      // console.log(this.loadMotifConge(this.employeConges[i][this.typeMotifCongeId]));// pour afficher le libellé du congé
                  }
                  this.loadMotifConge(this.typeMotifCongeId);
              }*/
              
              /*for(let i = 0; i <= Array.of(employeConges).length; i++){
                  this.typeMotifCongeId = this.employeConges[i].id.codeTypeMotifConge;
                  console.log(this.typeMotifCongeId);
                  this.loadMotifConge(this.employeConges[i].id.codeTypeMotifConge); // pour afficher le libellé du congé
              }*/
   
              });/*, err => { 
                  console.log(err); 
           });
         
        if (! this.motCle) {
          this.employeCongeService.getAll()
          .subscribe(data => { this.pageEmployeConges = data; }, err => { console.log(err); });
        } else {
          this.employeCongeService.getAll()
          .subscribe(data => { this.pageEmployeConges = data; }, err => { console.log(err); });
        }*/
      }
    
    loadEmp(id) {
        this.employeService.find(id).subscribe((employe) => {
            // console.log(employe);
            this.employe = employe;
        });
    }
    
    loadMotifConge(id: number) {
        this.typeMotifCongeService.find(id).subscribe(data => {
            this.typeMotifConges = Array(data);
        });
    }
    
    loadConge() {
        // console.log(id);
        this.typeMotifCongeService.getAll().subscribe(data => {
            this.typeConges = data;
        });
    }
    
    deleteEmp(emp: EmployeConge) {
        this.employeCongeService.delete(+emp.id.codeEmploye, emp.id.dateDebutConge).subscribe(res => {
            this.onSaveSuccess(res);
        })
    }
    
    
    /*previousState() {
        window.history.back();
    }*/

    registerChangeInEmployes() {
          this.eventManager.subscribe( 'employeListModification', ( response ) => this.loadAll(this.congeEmpSelected));
    }
    
    private onSuccess( data, headers ) {
          this.employeConges = data;
      }

    onError(error) {
        console.log(error);
          // error(error.message, null, null);
      }

    ngOnDestroy() {
          // this.routeData.unsubscribe();
      }
    
    trackId(index: number, item: EmployeConge) {
        // console.log('********* Contenu de lid: ' + item.id + '******');
            return item.id;
        }

    trackEmployeById( index: number, item: Employe ) {
            return item.codeEmploye;
        }

    trackTypeMotifCongeById( index: number, item: TypeMotifConge ) {
            return item.codeTypeMotifConge;
        }
    
    clear() {
        this.mode = 1;
        // this.location.back();
     }
    
    /****************************** Gestion de la vue détails **************************************/

    displayDetails(empC: EmployeConge) {
        this.mode = 2;
        this.load(empC);
        this.id = +empC.id.codeEmploye;
        /*this.subscription = this.activatedRoute.params.subscribe(( params ) => {
            this.load( params['id'], params['d'] );
            this.id = +params['id'];
        } );*/
    }

    load(empC: EmployeConge) {
        this.employeCongeService.find(empC).subscribe(data => {
            this.employeConge = data;
            this.typeMotifCongeId = +this.employeConge.id.codeTypeMotifConge;
            this.loadTypeMotifConge(this.typeMotifCongeId);
        } );
    }

    loadTypeMotifConge(id) {
        this.typeMotifCongeService.find(id).subscribe(data => {
            this.typeMotifConge = data;
        } );
    }

    previousState() {
        this.ngOnInit();
        // this.mode = 1;
        // window.history.back();
    }
    
    /**************************** Gestion de la création ********************************/
    create(code: number) {
        this.conge =null;
        this.mode = 3;
        this.header = 'Créer le congé de lemployé';
        this.id = code;
        // console.log(this.id);
    }
    
    save() {
        
        this.employeCongeService.getBetweenDates(this.employeConge).subscribe(data =>{
            
            this.conge = data;
            
            if(this.conge === this.testT) {
                // console.log('********* Veuillez choisir une autre date ******************');
                this.errorEmpExists = '1';
                this.errorDateExists = '1';
            } 
            else {
                this.employeCongeService.verifDates(this.employeConge).subscribe( data =>{
                this.dateValid = data;
                // console.log('******* La réponse est: '+this.dateValid);
                
                if(this.dateValid === this.testF ) {
                    // console.log('********* Contenu de la variable de validation des dates: '+this.employeCongeService.validDates+' ******************');
                    // console.log('********* Veuillez choisir une date valide ******************');
                    this.errorEmpExists = '2';
                    this.errorDateExists = '2';
                }
                else { // (this.employeCongeService.getBetweenDates(+this.employeConge.id.codeEmploye, this.employeConge.id.dateDebutConge) === 404) {
                    this.employeCongeService.verifDureeConge(this.employeConge).subscribe(data =>{
                        this.dureeValid = data;
                        // console.log('******* La réponse sur la durée est: '+this.dureeValid);
                        if(this.dureeValid === this.testF) {
                            this.errorDureeExists = '1';
                            this.errorEmpExists = null;
                            this.errorDateExists = null;
                        }
                        else {
                         // Sinon c'est un nouvel enregistrement
                            // console.log('********* Contenu de la variable: '+this.employeCongeService.conge+' ******************');
                            // console.log('********* Création ******************');
                                this.errorEmpExists = null;
                                this.errorDateExists = null;
                            /*this.employeCongeService.create(this.employeConge).subscribe(() => {
                            this.success = true;
                            }, (response) => this.processError(response));*/
                            this.employeConge.id.codeEmploye = this.id.toString();
                            this.employeCongeService.create(this.employeConge).subscribe(data => {
                                this.onSaveSuccess(data);
                            });
                            
                          //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
                            /*console.log(data.id.codeEmploye);
                            console.log(this.id.toString());
                            console.log(this.employeConge.id.codeEmploye);
                            console.log(this.congeEmpSelected.toString());*/
                            this.employeSituation.id.codeEmploye = this.id.toString();
                            this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
                            this.employeSituation.id.dateDebutSituation = this.employeConge.id.dateDebutConge;
                            this.employeSituation.dateFinSituation = this.employeConge.dateFinConge;
                            this.employeSituation.refSituation = this.employeConge.refDebutConge;
                            this.employeSituationService.create(this.employeSituation).subscribe(response => {
                                this.eventManager.broadcast({name: 'employeListModification'});
                            })
                        }
                    });
                    
                    }
                });
            
            }
        });
    }
    
    /********************************** Gestion de l'édition ***********************************/
    
    editConge(empC: EmployeConge) {
        this.mode = 4;
        this.header = 'Modifier le congé de lemployé';
        this.load(empC);
        this.id = +empC.id.codeEmploye;
        this.d = empC.id.dateDebutConge;
    }
    
    edit() {
        this.conge = null;
        
        this.employeCongeService.getBetweenDates(this.employeConge).subscribe(data =>{
            
            this.conge = data;
            
            /*if(this.conge === this.testT) {
                // console.log('********* Veuillez choisir une autre date ******************');
                this.errorEmpExists = '1';
                this.errorDateExists = '1';
            } 
            else {*/
                this.employeCongeService.verifDates(this.employeConge).subscribe(data =>{
                this.dateValid = data;
                // console.log('******* La réponse est: '+this.dateValid);
                
                if(this.dateValid === this.testF ) {
                    // console.log('********* Veuillez choisir une date valide ******************');
                    this.errorEmpExists = '2';
                    this.errorDateExists = '2';
                }
                else { // (this.employeCongeService.getBetweenDates(+this.employeConge.id.codeEmploye, this.employeConge.id.dateDebutConge) === 404) {
                    this.employeCongeService.verifDureeConge(this.employeConge)
                    .subscribe(data =>{
                        this.dureeValid = data;
                        // console.log('******* La réponse sur la durée est: '+this.dureeValid);
                        if(this.dureeValid === this.testF) {
                            this.errorDureeExists = '1';
                            this.errorEmpExists = null;
                            this.errorDateExists = null;
                        }
                        else {
                         // Sinon c'est un nouvel enregistrement
                                this.errorEmpExists = null;
                                this.errorDateExists = null;
                                
                                
                             this.employeCongeService.delete(this.id, this.d).subscribe(response => {
                                 this.eventManager.broadcast({name: 'employeListModification'});
                                 
                                 this.employeCongeService.create(this.employeConge).subscribe(data => {
                                 
                                 this.onSaveSuccess(response);
                                 
                                 /*this.employeCongeService.create(this.employeConge).subscribe(data => {
                                     
                                     //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
                                     this.employeSituation.id.codeEmploye = data.id.codeEmploye;
                                     this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
                                     this.employeSituation.id.dateDebutSituation = data.id.dateDebutConge;
                                     this.employeSituation.dateFinSituation = data.dateFinConge;
                                     this.employeSituation.refSituation = data.refDebutConge;
                                     this.employeSituationService.create(this.employeSituation).subscribe(response => {
                                         this.onSaveSuccess(response);
                                     })
                                 });*/
                                 
                                 })
                             }); 
                            
                                 
                                 this.employeSituationService.delete(this.id, this.d).subscribe(response => {
                                     
                                   //permet de mettre à jour dans la table situation pour gérer l'historique de l'employé
                                     this.employeSituation.id.codeEmploye = this.employeConge.id.codeEmploye;
                                     this.employeSituation.id.codeTypeSituation = this.codeTypeSituation.toString();
                                     this.employeSituation.id.dateDebutSituation = this.employeConge.id.dateDebutConge;
                                     this.employeSituation.dateFinSituation = this.employeConge.dateFinConge;
                                     this.employeSituation.refSituation = this.employeConge.refDebutConge;
                                     this.employeSituationService.create(this.employeSituation).subscribe(response => {
                                        
                                         this.eventManager.broadcast({name: 'employeListModification'});
                                     })
                                 });
                                   
                         }
                        
                    });
                    
                    }
                });
            
            // }
        });
    }
    
    subscribeToSaveResponse(result: Observable<EmployeConge>) {
        result.subscribe((res: EmployeConge) =>
            this.onSaveSuccess(res)); // , (res: Response) => res); // this.onSaveError(res));
      }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'employeListModification'} );
        this.router.navigateByUrl('/employe-detail/'+this.id);
        // this.router.navigateByUrl('/conge-employe/'+this.id);
    }
    
}
