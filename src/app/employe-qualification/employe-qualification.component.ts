import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { EmployeService } from '../employe/employe.service';
import { Employe } from '../employe/employe.model';
import { EmployeQualification } from './employe-qualification.model';
import { TypeCategorie } from '../type-categorie/type-categorie.model';
import { TypeDiplome } from '../type-diplome/type-diplome.model';
import { TypeGrade } from '../type-grade/type-grade.model';
import { TypeEchelon } from '../type-echelon/type-echelon.model';
import { EmployeQualificationService } from '../employe-qualification/employe-qualification.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';
import { TypeDiplomeService } from '../type-diplome/type-diplome.service';
import { TypeGradeService } from '../type-grade/type-grade.service';
import { TypeEchelonService } from '../type-echelon/type-echelon.service';
import { EventManagerService } from '../event-manager.service';
import { TypeTitreService } from '../type-titre/type-titre.service';
import { TypeTitre } from '../type-titre/type-titre.model';
import { EmployeDiplome } from '../employe-diplome/employe-diplome.model';
import { EmployeDiplomeService } from '../employe-diplome/employe-diplome.service';

@Component({
  selector: 'app-employe-qualification',
  templateUrl: './employe-qualification.component.html',
  styleUrls: ['./employe-qualification.component.css']
})
export class EmployeQualificationComponent implements OnInit {

    routeData: any;
    id:number; idC: number; idT: number; idD: number; idG: number; idE: number;
    mode: number;
    subscription: Subscription;
    employe: Employe;
    employeId: number;
    employeQualifications: EmployeQualification;
    employeQualification = new EmployeQualification();
    employeDiplome = new EmployeDiplome();
    typeCategorie: TypeCategorie = new TypeCategorie();
    typeCategories: TypeCategorie;
    typeCategorieId: any;
    typeDiplome: TypeDiplome = new TypeDiplome();
    typeDiplomeId: any;
    typeDiplomes: TypeDiplome;
    typeGrade: TypeGrade = new TypeGrade();
    typeGradeId: any;
    typeGrades: TypeGrade;
    typeEchelon: TypeEchelon  = new TypeEchelon();
    typeEchelonId: any;
    typeEchelons: TypeEchelon;
    typeTitre: TypeTitre  = new TypeTitre();
    typeTitreId: any;
    typeTitres: TypeTitre;
    employeQualificationId: any;
    diplomeDate: string = '';
    idTT:number = 0; 
    base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    
  constructor(
          private employeService: EmployeService,
          private employeQualificationService: EmployeQualificationService,
          private employeDiplomeService: EmployeDiplomeService,
          private typeCategorieService: TypeCategorieService,
          private typeDiplomeService: TypeDiplomeService,
          private typeGradeService: TypeGradeService,
          private typeEchelonService: TypeEchelonService,
          private typeTitreService: TypeTitreService,
          private eventManager: EventManagerService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) {
      this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
  }

  ngOnInit() {
      this.mode = 1;
      /*this.loadAllCategorie();
      this.loadAllDiplome();
      this.loadAllGrade();
      this.loadAllEchelon();
      this.loadAllTitre();*/
      /*this.subscription = this.activatedRoute.queryParams.subscribe((params) => {
          this.idTT = params['id'];
      });
      if(this.base64regex.test(this.idTT.toString())) {
          this.id = +atob(this.idTT.toString()); //permet de décoder la valeur encodée
          this.loadAll(this.id);
          this.loadEmp(this.id);
          
      } else {*/
          this.subscription = this.activatedRoute.params.subscribe((params) => {
              this.id = params['id'];
              this.loadEmp(this.id);
              this.loadAll(this.id);
          });
          
      // }
  }
  
  loadEmp(id) {
      this.employeService.find(id).subscribe((employe) => {
          // console.log(employe);
          this.employe = employe;
      });
  }
  
  load(empQ: EmployeQualification) {
      this.employeQualificationService.find(empQ).subscribe((employeQualification) => {
          this.employeQualification = employeQualification; //pour la création
          this.employeQualifications = employeQualification; //pour la liste
          this.idC = +this.employeQualification.id.codeTypeCategorie;
          this.idD = +this.employeQualification.id.codeTypeDiplome;
          this.idE = +this.employeQualification.id.codeTypeEchelon;
          this.idG = +this.employeQualification.id.codeTypeGrade;
          this.idT = +this.employeQualification.id.codeTypeTitre;
          
          this.employeId = +empQ.id.codeEmploye;
          this.typeCategorieId = this.employeQualification.id.codeTypeCategorie;
          this.loadCategorie(this.typeCategorieId);
          this.typeDiplomeId = this.employeQualification.id.codeTypeDiplome;
          this.loadDiplome(this.typeDiplomeId);
          this.typeGradeId = this.employeQualification.id.codeTypeGrade;
          this.loadGrade(this.typeGradeId);
          this.typeEchelonId = this.employeQualification.id.codeTypeEchelon;
          this.loadEchelon(this.typeEchelonId);
          this.employeQualificationId = this.employeQualification.id.codeEmploye;
          this.loadTitre(this.employeQualificationId);
      });
  }
  
  loadAll(id) {
      this.employeQualificationService.findAll(id).subscribe((employeQualification) => {
          this.employeQualifications = employeQualification;
          
          /*this.employeId = id;
          this.typeCategorieId = this.employeQualifications.id.codeTypeCategorie;
          this.loadCategorie(this.typeCategorieId);
          this.typeDiplomeId = this.employeQualifications.id.codeTypeDiplome;
          this.loadDiplome(this.typeDiplomeId);
          this.typeGradeId = this.employeQualifications.id.codeTypeGrade;
          this.loadGrade(this.typeGradeId);
          this.typeEchelonId = this.employeQualifications.id.codeTypeEchelon;
          this.loadEchelon(this.typeEchelonId);
          this.employeQualificationId = this.employeQualifications.id.codeEmploye;
          this.loadTitre(this.employeQualificationId);*/
      })
      this.loadAllCategorie();
      this.loadAllDiplome();
      this.loadAllGrade();
      this.loadAllEchelon();
      this.loadAllTitre();
  }
  
  loadAllCategorie() {
      this.typeCategorieService.getAll().subscribe((typeCategorie) => {
          this.typeCategories = typeCategorie;
      });
  }
  
  loadAllDiplome() {
      this.typeDiplomeService.getAll().subscribe((typeDiplome) => {
          this.typeDiplomes = typeDiplome;
      });
  }
  
  loadAllGrade() {
      this.typeGradeService.getAll().subscribe((typeGrade) => {
          this.typeGrades = typeGrade;
      });
  }
  
  loadAllEchelon() {
      this.typeEchelonService.getAll().subscribe((typeEchelon) => {
          this.typeEchelons = typeEchelon;
      });
  }
  
  loadAllTitre() {
      this.typeTitreService.getAll().subscribe((typeTitre) => {
          this.typeTitres = typeTitre;
      });
  }
  
  loadCategorie(id) {
      this.typeCategorieService.find(id).subscribe((typeCategorie) => {
          this.typeCategorie = typeCategorie;
          // this.typeCategories = Array(typeCategorie);
      });
  }
  
  loadDiplome(id) {
      this.typeDiplomeService.find(id).subscribe((typeDiplome) => {
          this.typeDiplome = typeDiplome;
          // this.typeDiplomes = Array(typeDiplome);
      });
  }
  
  loadGrade(id) {
      this.typeGradeService.find(id).subscribe((typeGrade) => {
          this.typeGrade = typeGrade;
          // this.typeGrades = Array(typeGrade);
      });
  }
  
  loadEchelon(id) {
      this.typeEchelonService.find(id).subscribe((typeEchelon) => {
          this.typeEchelon = typeEchelon;
          // this.typeEchelons = Array(typeEchelon);
      });
  }
  
  loadTitre(id) {
      this.typeTitreService.find(id).subscribe((typeTitre) => {
          this.typeTitre = typeTitre;
          // this.typeTitres = Array(typeTitre);
      });
  }
  
  trackTypeCategorieById(index: number, item: TypeCategorie) {
      return item.codeTypeCategorie;
  }
  
  trackTypeTitreById(index: number, item: TypeCategorie) {
      return item.codeTypeCategorie;
  }
  
  trackTypeDiplomeById(index: number, item: TypeDiplome) {
      return item.codeTypeDiplome;
  }
  
  trackTypeGradeById(index: number, item: TypeGrade) {
      return item.codeTypeGrade;
  }
  
  trackTypeEchelonById(index: number, item: TypeEchelon) {
      return item.codeTypeEchelon;
  }
  
  /**************************** Création **************************/
  
  createQualification() {
      this.mode = 2;
      this.employeQualification = new EmployeQualification;
  }
  
  save() {
      this.employeQualification.id.codeEmploye = this.id.toString();
      // this.subscribeToSaveResponse(this.employeQualificationService.create(this.employeQualification));
      this.employeQualificationService.create(this.employeQualification).subscribe(res => {
          
       // pour enregistrer le diplome de l'employé dans la table EmployeDiplome
          this.employeDiplome.id.codeEmploye = this.id.toString();
          this.employeDiplome.id.codeTypeDiplome = this.employeQualification.id.codeTypeDiplome;
          this.employeDiplome.id.dateEmployeDiplome = this.employeQualification.dateDiplome;
          this.employeDiplomeService.create(this.employeDiplome).subscribe((response) => {
              this.onSaveSuccess(response);
          })
          
          
      })
      
   /*// pour enregistrer le diplome de l'employé dans la table EmployeDiplome
      this.employeDiplome.id.codeEmploye = this.id.toString();
      this.employeDiplome.id.codeTypeDiplome = this.employeQualification.id.codeTypeDiplome;
      this.employeDiplome.id.dateEmployeDiplome = this.employeQualification.dateDiplome;
      this.employeDiplomeService.create(this.employeDiplome).subscribe((response) => {
          this.onSaveSuccess(response);
      });*/
  }
  
  subscribeToSaveResponse(result: Observable<EmployeQualification>) {
      result.subscribe((res: EmployeQualification) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeQualificationsListModification'} );
      this.mode = 1;
      this.loadAll(this.id);
    }
  
  close() {
      this.mode = 1;
  }
  
  /**************************** Détails **************************/
  
  detailsQualification(id: number) {
      this.mode = 5;
  }
  
  /**************************** Edition **************************/
  
  editQualification(empQ: EmployeQualification) {
      this.mode = 3;
      this.subscription = this.activatedRoute.params.subscribe((params) => {
          // this.load(params['id']);
          this.id = params['id'];
          /*this.idC = params['idC'];
          this.idT = params['idT'];
          this.idD = params['idD'];
          this.idG = params['idG'];
          this.idE = params['idE'];*/
      });
      this.diplomeDate = empQ.dateDiplome;
      this.load(empQ);
      /*this.employeQualificationService.find(id, idC, idD, idE, idG, idT)
      .subscribe( (employeQualification) => {
          this.employeQualification = employeQualification;
      });*/
  }
  
  edit() {
      this.employeQualificationService.delete(this.id, +this.idC, +this.idD, +this.idE, +this.idG, +this.idT).subscribe( res => {
          
       
          this.eventManager.broadcast({name: 'employeQualificationsListModification'});
          
          this.employeQualificationService.create(this.employeQualification).subscribe(response => {
                      
          })
      });
      
   // pour modifier le diplome de l'employé dans la table EmployeDiplome
      
      this.employeDiplomeService.delete(this.id, this.diplomeDate).subscribe((response) => {
          this.eventManager.broadcast({name: 'employeQualificationsListModification'});
          
       // pour modifier le diplome de l'employé dans la table EmployeDiplome
          this.employeDiplome.id.codeEmploye = this.employeQualification.id.codeEmploye;
          this.employeDiplome.id.codeTypeDiplome = this.employeQualification.id.codeTypeDiplome;
          this.employeDiplome.id.dateEmployeDiplome = this.employeQualification.dateDiplome;
          this.employeDiplomeService.create(this.employeDiplome).subscribe((response) => {
              this.onSaveSuccess(response);
          })
      });
      /*this.employeQualification.id.codePoste = this.id.toString();
      this.employeQualification.id.codePosteParent = this.c.toString();*/
      // this.subscribeToSaveResponse(this.employeQualificationService.create(this.employeQualification));
      
      
  }
  
  /**************************** Suppression **************************/
  
  delete(empQ: EmployeQualification, event: any) {
      this.employeQualificationService.delete(+empQ.id.codeEmploye, +empQ.id.codeTypeCategorie, +empQ.id.codeTypeDiplome, 
              +empQ.id.codeTypeEchelon, +empQ.id.codeTypeGrade, +empQ.id.codeTypeTitre).subscribe( res => {
          
       // pour supprimer le diplome de l'employé dans la table EmployeDiplome
          
          this.employeDiplomeService.delete(+empQ.id.codeEmploye, empQ.dateDiplome).subscribe((response) => {
              this.onSaveSuccess(response);
          });
          this.eventManager.broadcast({name: 'employeListModification'});
          this.mode = 1;
          this.loadAll(this.id);
      });
}
  
  deleteCheck(empQ: EmployeQualification, event: any) {
      this.employeQualificationService.delete(+empQ.id.codeEmploye, +empQ.id.codeTypeCategorie, +empQ.id.codeTypeDiplome, 
              +empQ.id.codeTypeEchelon, +empQ.id.codeTypeGrade, +empQ.id.codeTypeTitre).subscribe(res => {
          
       // pour supprimer le diplome de l'employé dans la table EmployeDiplome  
          this.employeDiplomeService.delete(+res.id.codeEmploye, res.dateDiplome).subscribe((response) => {
              this.onSaveSuccess(response);
          })
          
          this.eventManager.broadcast({name: 'employeListModification'});
          this.mode = 1;
          this.loadAll(this.id);
      });
}
  /*deleteQualification(id: number) {
      this.mode = 4;
  }*/
  
}
