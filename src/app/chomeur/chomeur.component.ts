import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChomeurService, ResponseWrapper } from './chomeur.service';
import { Chomeur } from './chomeur.model';
import { EventManagerService } from '../event-manager.service';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';
import { TypeSexe } from '../type-sexe/type-sexe.model';
import { TypeEtatCivil } from '../type-etat-civil/type-etat-civil.model';
import { TypeNationaliteService } from '../type-nationalite/type-nationalite.service';
import { TypeSexeService } from '../type-sexe/type-sexe.service';
import { TypeEtatCivilService } from '../type-etat-civil/type-etat-civil.service';
import { TypeDiplome } from '../type-diplome/type-diplome.model';
import { TypeDiplomeService } from '../type-diplome/type-diplome.service';
import { Regroupement } from '../regroupement/regroupement.model';
import { RegroupementService } from '../regroupement/regroupement.service';

@Component({
  selector: 'app-chomeur',
  templateUrl: './chomeur.component.html',
  styleUrls: ['./chomeur.component.css']
})
export class ChomeurComponent implements OnInit {

    pageChomeurs: any;
    motCle: any;
    currentPage = 0;
    size = 5;
    pages: Array<number>;
    chomeur: Chomeur = new Chomeur();
    chomeurs: Chomeur; //[] = new Array();
    regroupements: Regroupement;
    typeNationalites: TypeNationalite;
    typeNationalite: TypeNationalite;
    typeNationaliteId: number;
    typeSexes: TypeSexe;
    typeEtatCivils: TypeEtatCivil;
    empSelected: number;
    routeData: any;
    typeDiplomes: TypeDiplome;
    typeDiplome: TypeDiplome = new TypeDiplome();
    p: number = 1; //pour la pagination
    
  constructor(
          public activeModal: NgbActiveModal,
          private chomeurService: ChomeurService,
          private regroupementService: RegroupementService,
          private eventManager: EventManagerService,
          private typeNationaliteService: TypeNationaliteService,
          private typeSexeService: TypeSexeService,
          private typeDiplomeService: TypeDiplomeService,
          private typeEtatCivilService: TypeEtatCivilService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { 
      this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
  }
  
  ngOnInit() {
      this.empSelected = +this.activatedRoute.snapshot.paramMap.get('id');
      this.motCle = '';
      this.loadAll();
      this.registerChangeInChomeurs();
  }
  
  loadAll() {
      this.chomeurService.getAll().subscribe(data => { 
            this.chomeurs = data; // Array(chomeur);
            /*for(let i = 0; i <= Array.of(chomeur).length; i++){
                for(let j in Array.of(chomeur)[i] ){
                    this.typeNationaliteId = this.chomeur[j].codeTypeNationalite;
                
                    // console.log(this.typeNationaliteId);
                    this.loadNationalite(this.typeNationaliteId); // pour afficher le libellé de la nationalité
                    this.loadEtatCivil(this.chomeur[j].codeTypeEtatCivil);
                    this.loadSexe(this.chomeur[j].codeTypeSexe);
                }
            }*/
          });
      
      this.regroupementService.getAll().subscribe(data => {
          this.regroupements = data;
      })
      
      this.loadDiplome();
      this.loadEtatCivil();
      this.loadNationalite();
      this.loadSexe();
  }
  
  loadNationalite() {
      this.typeNationaliteService.getAll().subscribe((typeNationalite) => {
          this.typeNationalites = typeNationalite;
      });
  }
  
  loadSexe() {
      this.typeSexeService.getAll().subscribe((typeSexe) => {
          this.typeSexes = typeSexe;
      });
  }
  
  loadEtatCivil() {
      this.typeEtatCivilService.getAll().subscribe((typeEtatCivil) => {
          this.typeEtatCivils = typeEtatCivil;
      });
  }
  
  loadDiplome() {
      this.typeDiplomeService.getAll().subscribe((typeDiplome) => {
          this.typeDiplomes = typeDiplome;
      });
  }
  
  onSearch() {
      // console.log('******** Filtrage en cours *********');
      this.chomeurService.searchVia(this.chomeur.nomChomeur, this.chomeur.anneeDipChomeur, this.chomeur.codeTypeNationalite).subscribe(data => {
          this.chomeurs = data;
          console.log(this.chomeurs);
      });
  }
  
  reset() {
      this.chomeur.nomChomeur = null;
      this.chomeur.anneeDipChomeur = null;
      this.chomeur.codeTypeNationalite = null;
      this.typeDiplome.codeTypeDiplome = null;
      this.loadAll();
  }
  
  deleteChomeur(cho: Chomeur) {
      this.chomeurService.delete(cho.codeChomeur).subscribe(response => {
          this.onSaveSuccess(response);
      })
  }
  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'chomeurListModification'} );
      // this.ngOnInit();
      this.loadAll();
    }
  
  /*loadNationalite(id) {
      this.typeNationaliteService.find(id).subscribe((typeNationalite) => {
          this.typeNationalites = typeNationalite;
      });
  }
  
  loadSexe(id) {
      this.typeSexeService.find(id).subscribe((typeSexe) => {
          this.typeSexe = typeSexe;
      });
  }
  
  loadEtatCivil(id) {
      this.typeEtatCivilService.find(id).subscribe((typeEtatCivil) => {
          this.typeEtatCivil = typeEtatCivil;
      });
  }*/
  
  trackId(index: number, item: Chomeur) {
      return item.codeChomeur;
  }
  
  registerChangeInChomeurs() {
      this.eventManager.subscribe( 'chomeurListModification', ( response ) => this.loadAll() );
  }

  private onSuccess( data, headers ) {
          this.chomeur = data;
  }
    
  onError(error) {
          error(error.message, null, null);
  }
    
  ngOnDestroy() {
          this.routeData.unsubscribe();
  }

}
