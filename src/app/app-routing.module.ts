import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, PreloadAllModules } from '@angular/router';
// import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http/src/http_module';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'; // pour la pagination
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal, NgbModalModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { TreeviewModule } from 'ngx-treeview';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { ExportAsModule } from 'ngx-export-as';

/*import { CdkTreeModule } from "@angular/cdk/tree";
import { CdkTableModule } from "@angular/cdk/table";
import { MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule,
         MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
         MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
         MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
         MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
         MatSortModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, } from '@angular/material';*/

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AdministrationComponent } from './administration/administration.component';
import { ChomeurComponent } from './chomeur/chomeur.component';
import { ChomeurAffectationComponent } from './chomeur/chomeur-affectation.component';
import { AffectationChomeurComponent } from './chomeur/affectation-chomeur.component';
import { EmployeAffectationComponent } from './employe-affectation/employe-affectation.component';
import { EmployeCongeComponent } from './employe-conge/employe-conge.component';
import { EmployeDecesComponent } from './employe-deces/employe-deces.component';
import { EmployeDemissionComponent } from './employe-demission/employe-demission.component';
import { EmployeDetachementComponent } from './employe-detachement/employe-detachement.component';
import { EmployeDiplomeComponent } from './employe-diplome/employe-diplome.component';
import { EmployeDisponibiliteComponent } from './employe-disponibilite/employe-disponibilite.component';
import { EmployeEtablissementComponent } from './employe-etablissement/employe-etablissement.component';
import { EmployeEtatCivilComponent } from './employe-etat-civil/employe-etat-civil.component';
import { EmployeFonctionComponent } from './employe-fonction/employe-fonction.component';
import { EmployeHandicapComponent } from './employe-handicap/employe-handicap.component';
import { EmployeMutationComponent } from './employe-mutation/employe-mutation.component';
import { EmployePathologieComponent } from './employe-pathologie/employe-pathologie.component';
import { EmployePosteComponent } from './employe-poste/employe-poste.component';
import { EmployeQualificationComponent } from './employe-qualification/employe-qualification.component';
import { EmployeRegroupementComponent } from './employe-regroupement/employe-regroupement.component';
import { EmployeRenvoiComponent } from './employe-renvoi/employe-renvoi.component';
import { EmployeRepAdminComponent } from './employe-rep-admin/employe-rep-admin.component';
import { EmployeRetraiteComponent } from './employe-retraite/employe-retraite.component';
import { EmployeRevocationComponent } from './employe-revocation/employe-revocation.component';
import { EmployeSituationComponent } from './employe-situation/employe-situation.component';
import { EmployeStatutComponent } from './employe-statut/employe-statut.component';
import { EmployeSuspensionComponent } from './employe-suspension/employe-suspension.component';
import { EmployeTransfertComponent } from './employe-transfert/employe-transfert.component';
import { EmployeComponent } from './employe/employe.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { EtablissementRegroupementComponent } from './etablissement-regroupement/etablissement-regroupement.component';
import { EtablissementSecteurComponent } from './etablissement-secteur/etablissement-secteur.component';
import { HierarchieComponent } from './hierarchie/hierarchie.component';
import { LiaisonsRegroupementComponent } from './liaisons-regroupement/liaisons-regroupement.component';
import { PosteComponent } from './poste/poste.component';
import { RegroupementComponent } from './regroupement/regroupement.component';
import { StructureEduComponent } from './structure-education/structure-education.component';
import { TypeCategorieComponent } from './type-categorie/type-categorie.component';
import { TypeChaineLocComponent } from './type-chaine-loc/type-chaine-loc.component';
import { TypeDiplomeComponent } from './type-diplome/type-diplome.component';
import { TypeEchelonComponent } from './type-echelon/type-echelon.component';
import { TypeEtablissementComponent } from './type-etablissement/type-etablissement.component';
import { TypeEtatCivilComponent } from './type-etat-civil/type-etat-civil.component';
import { TypeFonctionComponent } from './type-fonction/type-fonction.component';
import { TypeGradeComponent } from './type-grade/type-grade.component';
import { TypeHandicapComponent } from './type-handicap/type-handicap.component';
import { TypeMilieuComponent } from './type-milieu/type-milieu.component';
import { TypeMotifCongeComponent } from './type-motif-conge/type-motif-conge.component';
import { TypeMotifDecesComponent } from './type-motif-deces/type-motif-deces.component';
import { TypeMotifRenvoiComponent } from './type-motif-renvoi/type-motif-renvoi.component';
import { TypeMotifRetraiteComponent } from './type-motif-retraite/type-motif-retraite.component';
import { TypeMotifSuspensionComponent } from './type-motif-suspension/type-motif-suspension.component';
import { TypeNationaliteComponent } from './type-nationalite/type-nationalite.component';
import { TypePathologieComponent } from './type-pathologie/type-pathologie.component';
import { TypeRegroupementComponent } from './type-regroupement/type-regroupement.component';
import { TypeSecteurComponent } from './type-secteur/type-secteur.component';
import { TypeSexeComponent } from './type-sexe/type-sexe.component';
import { TypeSituationComponent } from './type-situation/type-situation.component';
import { TypeStatutEntiteComponent } from './type-statut-entite/type-statut-entite.component';
import { TypeStatutEtablissementComponent } from './type-statut-etablissement/type-statut-etablissement.component';
import { TypeStatutComponent } from './type-statut/type-statut.component';
import { TypeStructureEduComponent } from './type-structure-edu/type-structure-edu.component';
import { TypeTitreComponent } from './type-titre/type-titre.component';
import { ChefHierarchiePosteComponent } from './chef-hierarchie-poste/chef-hierarchie-poste.component';

import { NavbarComponent } from './navbar/navbar.component';
import { LoginService } from "./login/login.service";
import { LoginComponent, LoginPopupComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';

import { ChomeurDialogComponent, ChomeurDialogPopupComponent } from './chomeur/chomeur-dialog.component';
import { ChomeurDetailComponent } from './chomeur/chomeur-detail.component';
import { ChomeurDeleteComponent, ChomeurDeletePopupComponent } from './chomeur/chomeur-delete.component';
import { ChomeurService } from './chomeur/chomeur.service';
import { ChomeurPopupService } from './chomeur/chomeur-popup.service';

import { EmployeDialogComponent, EmployeDialogPopupComponent } from './employe/employe-dialog.component';
import { EmployeDetailComponent } from './employe/employe-detail.component';
import { EmployeDeletePopupComponent, EmployeDeleteComponent } from './employe/employe-delete.component';
import { EmployeService } from './employe/employe.service';
import { EmployePopupService } from './employe/employe-popup.service';
import { CongeEmployeComponent } from './employe/conge-employe.component';

import { RegroupementDialogComponent, RegroupementDialogPopupComponent } from './regroupement/regroupement-dialog.component';
import { RegroupementDetailComponent } from './regroupement/regroupement-detail.component';
import { RegroupementDeletePopupComponent, RegroupementDeleteComponent } from './regroupement/regroupement-delete.component';
import { RegroupementService } from './regroupement/regroupement.service';
import { RegroupementPopupService } from './regroupement/regroupement-popup.service';

import { EmployeCongeDialogComponent, EmployeCongeDialogPopupComponent } from './employe-conge/employe-conge-dialog.component';
import { EmployeCongeEditComponent, EmployeCongeEditPopupComponent } from'./employe-conge/employe-conge-edit.component';
import { EmployeCongeDetailComponent } from './employe-conge/employe-conge-detail.component';
import { EmployeCongeDeletePopupComponent, EmployeCongeDeleteComponent } from './employe-conge/employe-conge-delete.component';
import { EmployeCongeService } from './employe-conge/employe-conge.service';
import { EmployeCongePopupService } from './employe-conge/employe-conge-popup.service';


import { EmployeEtatCivilService } from './employe-etat-civil/employe-etat-civil.service';

import { TypeEtatCivilDeleteComponent, TypeEtatCivilDeletePopupComponent } from './type-etat-civil/type-etat-civil-delete.component';
import { TypeEtatCivilDetailComponent } from './type-etat-civil/type-etat-civil-detail.component';
import { TypeEtatCivilDialogComponent, TypeEtatCivilDialogPopupComponent } from './type-etat-civil/type-etat-civil-dialog.component';
import { TypeEtatCivilService } from './type-etat-civil/type-etat-civil.service';
import { TypeEtatCivilPopupService } from './type-etat-civil/type-etat-civil-popup.service';

import { TypeMotifCongeDeleteComponent, TypeMotifCongeDeletePopupComponent } from './type-motif-conge/type-motif-conge-delete.component';
import { TypeMotifCongeDetailComponent } from './type-motif-conge/type-motif-conge-detail.component';
import { TypeMotifCongeDialogComponent, TypeMotifCongeDialogPopupComponent } from './type-motif-conge/type-motif-conge-dialog.component';
import { TypeMotifCongeService } from './type-motif-conge/type-motif-conge.service';
import { TypeMotifCongePopupService } from './type-motif-conge/type-motif-conge-popup.service';

import { TypeNationaliteDeleteComponent, TypeNationaliteDeletePopupComponent } from './type-nationalite/type-nationalite-delete.component';
import { TypeNationaliteDetailComponent } from './type-nationalite/type-nationalite-detail.component';
import { TypeNationaliteDialogComponent, TypeNationaliteDialogPopupComponent } from './type-nationalite/type-nationalite-dialog.component';
import { TypeNationaliteService } from './type-nationalite/type-nationalite.service';
import { TypeNationalitePopupService } from './type-nationalite/type-nationalite-popup.service';

import { TypeRegroupementDeleteComponent, TypeRegroupementDeletePopupComponent } from './type-regroupement/type-regroupement-delete.component';
import { TypeRegroupementDetailComponent } from './type-regroupement/type-regroupement-detail.component';
import { TypeRegroupementDialogComponent, TypeRegroupementDialogPopupComponent } from './type-regroupement/type-regroupement-dialog.component';
import { TypeRegroupementService } from './type-regroupement/type-regroupement.service';
import { TypeRegroupementPopupService } from './type-regroupement/type-regroupement-popup.service';

import { TypeSexeDeleteComponent, TypeSexeDeletePopupComponent } from './type-sexe/type-sexe-delete.component';
import { TypeSexeDialogComponent, TypeSexeDialogPopupComponent } from './type-sexe/type-sexe-dialog.component';
import { TypeSexeDetailComponent } from './type-sexe/type-sexe-detail.component';
import { TypeSexeService } from './type-sexe/type-sexe.service';
import { TypeSexePopupService } from './type-sexe/type-sexe-popup.service';

import { OrganigrammeComponent } from './organigramme/organigramme.component';

import { EventManagerService } from './event-manager.service';
import { AuthService } from "./auth.service";
import { RegisterComponent } from "./register/register.component";
import { UserComponent } from "./user/user.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from './profile/profile.component';
//import { LocaliteComponent } from './localite/localite.component';

import { PageComponent } from './page/page.component';

import { TypeMethodeAutoriseComponent } from './type-methode-autorise/type-methode-autorise.component';

import { GroupePageComponent } from './groupe-page/groupe-page.component';

import { EmployeRGComponent } from './employe/employe-rg.component';
import { EmployeRPComponent } from './employe/employe-rp.component';


/***************************** Définitions des routes dans l'interfaces principales **************************/
const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full' }, //la première page sera le formulaire d'authentification

    { path: 'register', component: RegisterComponent },

	  // { path: 'home', component: HomeComponent},

    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

    {path: 'login', component: LoginComponent},

    {path: 'administration', component: AdministrationComponent},

    {path: 'chomeur', component: ChomeurComponent}, // la liste de tous les chomeurs

    {path: 'chomeur-affectation/:id', component: ChomeurAffectationComponent},

    {path: 'chomeur-affectationEco/:id/:d', component: ChomeurAffectationComponent},

    {path: 'employe', component: EmployeComponent}, // la liste de tous les employés

    {path: 'employe-rg', component: EmployeRGComponent},

    {path: 'employe-rp', component: EmployeRPComponent},

    {path: 'regroupement', component: RegroupementComponent}, // la liste de tous les regroupements

    {path: 'chaine', component: HierarchieComponent}, //pour la gestion des chaines de localités

    {path: 'liaison', component: LiaisonsRegroupementComponent}, //pour la gestion de la liaison des chaines de localité

    {path: 'employe-affectation', component: EmployeAffectationComponent},

    /**/  {path: 'employe-affectation/:id', component: EmployeAffectationComponent},

      {path: 'employe-affectation/:id/:d', component: EmployeAffectationComponent},

    {path: 'employe-conge', component: CongeEmployeComponent}, // EmployeCongeComponent},

    /*{path: 'employe-deces', component: EmployeDecesComponent},*/

    /**/  {path: 'employe-deces/:id', component: EmployeDecesComponent},

    {path: 'employe-demission', component: EmployeDemissionComponent},

    /**/  {path: 'employe-demission/:id', component: EmployeDemissionComponent},

    {path: 'employe-detachement', component: EmployeDetachementComponent},

    /**/  {path: 'employe-detachement/:id', component: EmployeDetachementComponent},

    {path: 'employe-detachement/:id/:d', component: EmployeDetachementComponent},

    {path: 'employe-disponibilite', component: EmployeDisponibiliteComponent},

    /**/  {path: 'employe-disponibilite/:id', component: EmployeDisponibiliteComponent},

    {path: 'employe-disponibilite/:id/:d', component: EmployeDisponibiliteComponent},

    {path: 'employe-etablissement', component: EmployeEtablissementComponent},

    {path: 'employe-etat-civil/:id', component: EmployeEtatCivilComponent},

    {path: 'employe-fonction', component: EmployeFonctionComponent},

    /**/  {path: 'employe-fonction/:id', component: EmployeFonctionComponent},

    {path: 'employe-handicap', component: EmployeHandicapComponent},

    /**/  {path: 'employe-handicap/:id', component: EmployeHandicapComponent},

    {path: 'employe-handicap/:id/:d', component: EmployeHandicapComponent},

    {path: 'employe-mutation', component: EmployeMutationComponent},

    /**/  {path: 'employe-mutation/:id', component: EmployeMutationComponent},

    {path: 'employe-pathologie', component: EmployePathologieComponent},

    /**/  {path: 'employe-pathologie/:id', component: EmployePathologieComponent},

    {path: 'employe-pathologie/:id/:d', component: EmployePathologieComponent},

    {path: 'employe-poste', component: EmployePosteComponent},

    /**/  {path: 'employe-poste/:id', component: EmployePosteComponent},

    {path: 'employe-qualification', component: EmployeQualificationComponent},

    /**/  {path: 'employe-qualification/:id', component: EmployeQualificationComponent}, //pour pouvoir revenir sur la page précédente avec le paramètre id

    {path: 'employe-renvoi', component: EmployeRenvoiComponent},

    /**/  {path: 'employe-renvoi/:id', component: EmployeRenvoiComponent},

    {path: 'employe-retraite', component: EmployeRetraiteComponent},

    {path: 'employe-rep-admin', component: EmployeRepAdminComponent},

    /**/  {path: 'employe-retraite/:id', component: EmployeRetraiteComponent},

    {path: 'employe-revocation', component: EmployeRevocationComponent},

    /**/  {path: 'employe-revocation/:id', component: EmployeRevocationComponent},

    {path: 'employe-suspension', component: EmployeSuspensionComponent},

    /**/  {path: 'employe-suspension/:id', component: EmployeSuspensionComponent},

    {path: 'employe-transfert', component: EmployeTransfertComponent},

    /**/  {path: 'employe-transfert/:id', component: EmployeTransfertComponent},

    {path: 'employe-transfert/:id/:d', component: EmployeTransfertComponent},

    {path: 'employe-transfertEco/:id/:d', component: EmployeTransfertComponent},

    {path: 'etablissement', component: EtablissementComponent},

    {path: 'poste', component: PosteComponent},

    {path: 'structure-edu', component: StructureEduComponent},

    {path: 'typeCategorie', component: TypeCategorieComponent},

    {path: 'typeChaineLoc', component: TypeChaineLocComponent},

    {path: 'typeDiplome', component: TypeDiplomeComponent},

    {path: 'typeEchelon', component: TypeEchelonComponent},

    {path: 'typeEtablissement', component: TypeEtablissementComponent},

    {path: 'typeEtatCivil', component: TypeEtatCivilComponent},

    {path: 'typeFonction', component: TypeFonctionComponent},

    {path: 'typeGrade', component: TypeGradeComponent},

    {path: 'typeHandicap', component: TypeHandicapComponent},

    {path: 'typeMilieu', component: TypeMilieuComponent},

    {path: 'typeMotifConge', component: TypeMotifCongeComponent},

    {path: 'typeMotifDeces', component: TypeMotifDecesComponent},

    {path: 'typeMotifRenvoi', component: TypeMotifRenvoiComponent},

    {path: 'typeMotifRetraite', component: TypeMotifRetraiteComponent},

    {path: 'typeMotifSuspension', component: TypeMotifSuspensionComponent},

    {path: 'typeNationalite', component: TypeNationaliteComponent},

    {path: 'typePathologie', component: TypePathologieComponent},

    {path: 'typePathologie/:id', component: TypePathologieComponent}, // test pour récupérer les pathologies dans les recherches

    {path: 'typeRegroupement', component: TypeRegroupementComponent},

    {path: 'typeSecteur', component: TypeSecteurComponent},

    {path: 'typeSexe', component: TypeSexeComponent},

    {path: 'typeSituation', component: TypeSituationComponent},

    {path: 'typeStatut', component: TypeStatutComponent},

    {path: 'typeStatutEntite', component: TypeStatutEntiteComponent},

    {path: 'typeStatutEtablissement', component: TypeStatutEtablissementComponent},

    {path: 'typeStructureEdu', component: TypeStructureEduComponent},

    {path: 'typeTitre', component: TypeTitreComponent},

    {path: 'organigramme', component: OrganigrammeComponent},

    /********************************** Définition des routes de la table Employe *****************************/

    {path: 'employe', component: EmployeDialogComponent}, // l'interface intermédiaire permettant d'ouvrir celle pour enregistrer sur la principale

    {path: 'conge-employe/:id', component: CongeEmployeComponent},

    {path: 'employe-dialog', // l'interface pour enregistrer un employé
    component: EmployeDialogComponent},

    {path: 'employe-detail/:id', component: EmployeDetailComponent}, // l'interface pour afficher les détails d'un employé
    {path: 'employe-detail/:id/:dl', component: EmployeDetailComponent}, //pour gérer le retour à partir de l'interface des recheches

    {path: 'employe-dialog/:id', // l'interface pour modifier un employé
     component: EmployeDialogComponent},

    {path: 'employe-delete/:id', // l'interface pour supprimer un employé
    component: EmployeDeleteComponent},

    /******************************* Définition des routes de la table Chomeur ******************************/

    {path: 'chomeur', component: ChomeurDialogComponent}, // l'interface intermédiaire permettant d'ouvrir celle pour enregistrer sur la principale

    {path: 'chomeur-dialog', // l'interface pour enregistrer un employé
        component: ChomeurDialogComponent},

     {path: 'chomeur-detail/:id', component: ChomeurDetailComponent}, // l'interface pour afficher les détails d'un employé

     {path: 'chomeur-dialog/:id', // l'interface pour modifier un employé
         component: ChomeurDialogComponent},

     {path: 'chomeur-delete/:id', // l'interface pour supprimer un employé
             component: ChomeurDeleteComponent},

     /************************** Définition des routes de la table Regroupement ********************/

     {path: 'regroupement', component: RegroupementDialogComponent}, // l'interface intermédiaire permettant d'ouvrir celle pour enregistrer sur la principale

     {path: 'regroupement-dialog', // l'interface pour enregistrer un employé
         component: RegroupementDialogComponent},

      {path: 'regroupement-detail/:id', component: RegroupementDetailComponent}, // l'interface pour afficher les détails d'un employé

      {path: 'regroupement-dialog/:id', // l'interface pour modifier un employé
          component: RegroupementDialogComponent},

      {path: 'regroupement-delete/:id', // l'interface pour supprimer un employé
              component: RegroupementDeleteComponent},

    /***************** Définition des routes pour la table Employe-conge *********************/

    {path: 'employe-conge', component: EmployeCongeDialogComponent},

    {path: 'employe-conge-dialog/:id', //pour créer un congé à partir des informations de l'employé directement
    component: EmployeCongeDialogComponent},

    {path: 'employe-conge-detail/:id/:d', component: EmployeCongeDetailComponent},

    {path: 'employe-conge-dialog/:id/:d',
    component: EmployeCongeEditComponent},

    {path: 'employe-conge-delete/:id/:d',
     component: EmployeCongeDeleteComponent},

    /***************** Définition des routes pour la table Type-etat-civil *********************/

    {path: 'typeEtatCivil', component: TypeEtatCivilDialogComponent},

    {path: 'typeEtatCivil-dialog',
        component: TypeEtatCivilDialogComponent},

    {path: 'typeEtatCivil-detail/:id', component: TypeEtatCivilDetailComponent},

    {path: 'typeEtatCivil-dialog/:id',
        component: TypeEtatCivilDialogComponent},

    {path: 'typeEtatCivil-delete/:id',
    component: TypeEtatCivilDeletePopupComponent,
    outlet: 'popup'},

    /***************** Définition des routes pour la table Type-motif-conge *********************/

    {path: 'typeMotifConge', component: TypeMotifCongeDialogComponent},

    {path: 'typeMotifConge-dialog',
        component: TypeMotifCongeDialogComponent},

    {path: 'typeMotifConge-detail/:id', component: TypeMotifCongeDetailComponent},

    {path: 'typeMotifConge-dialog/:id',
        component: TypeMotifCongeDialogComponent},

    {path: 'typeMotifConge-delete/:id',
            component: TypeMotifCongeDeleteComponent},

     /***************** Définition des routes pour la table Type-nationalite *********************/

    {path: 'typeNationalite', component: TypeNationaliteDialogComponent},

    {path: 'typeNationalite-dialog',
        component: TypeNationaliteDialogComponent},

    {path: 'typeNationalite-detail/:id', component: TypeNationaliteDetailComponent},

    {path: 'typeNationalite-dialog/:id',
        component: TypeNationaliteDialogComponent},

    {path: 'typeNationalite-delete/:id',
            component: TypeNationaliteDeleteComponent},

    /***************** Définition des routes pour la table Type-regroupement *********************/

    {path: 'typeRegroupement', component: TypeRegroupementDialogComponent},

    {path: 'typeRegroupement-dialog',
        component: TypeRegroupementDialogComponent},

    {path: 'typeRegroupement-detail/:id', component: TypeRegroupementDetailComponent},

    {path: 'typeRegroupement-dialog/:id',
        component: TypeRegroupementDialogComponent},

    {path: 'typeRegroupement-delete/:id',
            component: TypeRegroupementDeleteComponent},

    /***************** Définition des routes pour la table Type-sexe *********************/

    {path: 'typeSexe', component: TypeSexeDialogComponent},

    {path: 'typeSexe-dialog',
        component: TypeSexeDialogComponent},

    {path: 'typeSexe-detail/:id', component: TypeSexeDetailComponent},

    {path: 'typeSexe-dialog/:id',
        component: TypeSexeDialogComponent},

    {path: 'typeSexe-delete/:id',
            component: TypeSexeDeleteComponent},


    /***************** Définition des routes pour la partie Administration, paramétrage, droits d'accès *********************/

    {path: 'page', component: PageComponent},

    {path: 'groupePage', component: GroupePageComponent},

    {path:'typeMethodeAutorise', component: TypeMethodeAutoriseComponent},

    {path: 'profils', component: ProfileComponent},

    {path: 'user', component: UserComponent},
];




@NgModule({
  imports: [BrowserModule,
            FormsModule,
            ReactiveFormsModule,
            NgxPaginationModule,
            // RouterModule.forRoot(routes, { useHash: true }),
            // RouterModule.forRoot(routes, { enableTracing: true }),
			      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
            HttpClientModule,
            // HttpModule,
            NgbModalModule,
            Ng2SearchPipeModule,
            Ng2OrderModule,
            FilterPipeModule,
            TreeviewModule.forRoot(),
            NgbModule.forRoot(),
            NgxPermissionsModule.forRoot(), // gestion de la permission des pages

            ExportAsModule, //pour les exportation en pdf ou excel

			SweetAlert2Module.forRoot({
                buttonsStyling: false,
                customClass: 'modal-content',
                confirmButtonClass: 'btn btn-primary',
                cancelButtonClass: 'btn'
            } as any)
          ],

  declarations: [AppComponent,
                 HomeComponent,
                 FooterComponent,
                 MenuComponent,
                 NavbarComponent,
                 LoginComponent, LoginPopupComponent,
                 RegisterComponent,
                 TreeViewComponent,

                 AdministrationComponent,
                 UserComponent,
                 ChomeurComponent,
                 ChomeurAffectationComponent,
                 AffectationChomeurComponent,
                 EmployeAffectationComponent,
                 EmployeCongeComponent,
                 EmployeDecesComponent,
                 EmployeDemissionComponent,
                 EmployeDetachementComponent,
                 EmployeDiplomeComponent,
                 EmployeDisponibiliteComponent,
                 EmployeEtablissementComponent,
                 EmployeEtatCivilComponent,
                 EmployeFonctionComponent,
                 EmployeHandicapComponent,
                 EmployeMutationComponent,
                 EmployePathologieComponent,
                 EmployePosteComponent,
                 EmployeQualificationComponent,
                 EmployeRegroupementComponent,
                 EmployeRenvoiComponent,
                 EmployeRepAdminComponent,
                 EmployeRetraiteComponent,
                 EmployeRevocationComponent,
                 EmployeSituationComponent,
                 EmployeStatutComponent,
                 EmployeSuspensionComponent,
                 EmployeTransfertComponent,
                 EmployeComponent,
                 EtablissementComponent,
                 EtablissementRegroupementComponent,
                 EtablissementSecteurComponent,
                 HierarchieComponent,
                 LiaisonsRegroupementComponent,
                 PosteComponent,
                 RegroupementComponent,
                 StructureEduComponent,
                 TypeCategorieComponent,
                 TypeChaineLocComponent,
                 TypeDiplomeComponent,
                 TypeEchelonComponent,
                 TypeEtablissementComponent,
                 TypeEtatCivilComponent,
                 TypeFonctionComponent,
                 TypeGradeComponent,
                 TypeHandicapComponent,
                 TypeMilieuComponent,
                 TypeMotifCongeComponent,
                 TypeMotifDecesComponent,
                 TypeMotifRenvoiComponent,
                 TypeMotifRetraiteComponent,
                 TypeMotifSuspensionComponent,
                 TypeNationaliteComponent,
                 TypePathologieComponent,
                 TypeRegroupementComponent,
                 TypeSecteurComponent,
                 TypeSexeComponent,
                 TypeSituationComponent,
                 TypeStatutEntiteComponent,
                 TypeStatutEtablissementComponent,
                 TypeStatutComponent,
                 TypeStructureEduComponent,
                 TypeTitreComponent,

                 ChefHierarchiePosteComponent,

                 ChomeurDialogComponent,
                 ChomeurDialogPopupComponent,
                 ChomeurDetailComponent,
                 ChomeurDeleteComponent,
                 ChomeurDeletePopupComponent,

                 EmployeDialogComponent,
                 EmployeDialogPopupComponent,
                 EmployeDetailComponent,
                 EmployeDeleteComponent,
                 EmployeDeletePopupComponent,
                 CongeEmployeComponent,

                 EmployeCongeDialogComponent,
                 EmployeCongeDialogPopupComponent,
                 EmployeCongeEditComponent,
                 EmployeCongeEditPopupComponent,
                 EmployeCongeDetailComponent,
                 EmployeCongeDeletePopupComponent,
                 EmployeCongeDeleteComponent,

                 RegroupementDialogComponent,
                 RegroupementDialogPopupComponent,
                 RegroupementDetailComponent,
                 RegroupementDeleteComponent,
                 RegroupementDeletePopupComponent,

                 TypeEtatCivilDeleteComponent,
                 TypeEtatCivilDeletePopupComponent,
                 TypeEtatCivilDetailComponent,
                 TypeEtatCivilDialogComponent,
                 TypeEtatCivilDeletePopupComponent,
                 TypeEtatCivilDialogPopupComponent,

                 TypeMotifCongeDeleteComponent,
                 TypeMotifCongeDeletePopupComponent,
                 TypeMotifCongeDetailComponent,
                 TypeMotifCongeDialogComponent,
                 TypeMotifCongeDeletePopupComponent,
                 TypeMotifCongeDialogPopupComponent,

                 TypeNationaliteDetailComponent,
                 TypeNationaliteDeleteComponent,
                 TypeNationaliteDeletePopupComponent,
                 TypeNationaliteDialogComponent,
                 TypeNationaliteDialogPopupComponent,

                 TypeRegroupementDetailComponent,
                 TypeRegroupementDeleteComponent,
                 TypeRegroupementDeletePopupComponent,
                 TypeRegroupementDialogComponent,
                 TypeRegroupementDialogPopupComponent,

                 TypeSexeDetailComponent,
                 TypeSexeDeleteComponent,
                 TypeSexeDeletePopupComponent,
                 TypeSexeDialogComponent,
                 TypeSexeDialogPopupComponent,

                 OrganigrammeComponent,
                 ProfileComponent,
                 PageComponent,
                 GroupePageComponent,
                 TypeMethodeAutoriseComponent,

                 EmployeRGComponent,
                 EmployeRPComponent


               ],
               entryComponents: [LoginComponent, LoginPopupComponent,

                                 EmployeDeleteComponent,
                                 ChomeurDeleteComponent,
                                 EmployeCongeDeleteComponent,
                                 EmployeCongeEditComponent,
                                 RegroupementDeleteComponent,
                                 TypeEtatCivilDeleteComponent,
                                 TypeNationaliteDeleteComponent,
                                 TypeSexeDeleteComponent,
                                 TypeMotifCongeDeleteComponent,
                                 TypeRegroupementDeleteComponent,
                                 OrganigrammeComponent
            ],

  exports: [RouterModule,
            EmployeDeleteComponent,
            TypeNationaliteDeleteComponent,
            TypeSexeDeleteComponent,
            NgxPermissionsModule,

            /*CdkTableModule,
            CdkTreeModule,
            MatAutocompleteModule,
            MatBadgeModule,
            MatBottomSheetModule,
            MatButtonModule,
            MatButtonToggleModule,
            MatCardModule,
            MatCheckboxModule,
            MatChipsModule,
            MatStepperModule,
            MatDatepickerModule,
            MatDialogModule,
            MatDividerModule,
            MatExpansionModule,
            MatGridListModule,
            MatIconModule,
            MatInputModule,
            MatListModule,
            MatMenuModule,
            MatNativeDateModule,
            MatPaginatorModule,
            MatProgressBarModule,
            MatProgressSpinnerModule,
            MatRadioModule,
            MatRippleModule,
            MatSelectModule,
            MatSidenavModule,
            MatSliderModule,
            MatSlideToggleModule,
            MatSnackBarModule,
            MatSortModule,
            MatTableModule,
            MatTabsModule,
            MatToolbarModule,
            MatTooltipModule,
            MatTreeModule*/

            ],

  providers: [NgbActiveModal,
              NgbDropdownModule,
              FormBuilder,
              LoginService,
              LoginComponent, // pour pouvoir utiliser la fonction qui vérifie l'accès des pages
              AuthService, AuthGuard,
              EmployeService,
              EmployePopupService,
              EmployeEtatCivilService,
              ChomeurService,
              ChomeurPopupService,
              EmployeCongeService,
              EmployeCongePopupService,
              RegroupementService,
              RegroupementPopupService,
              TypeEtatCivilService,
              TypeNationalitePopupService,
              TypeRegroupementService,
              TypeRegroupementPopupService,
              TypeSexeService,
              TypeSexePopupService,
              TypeMotifCongeService,
              TypeMotifCongePopupService,
              EventManagerService,
              DatePipe
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class AppRoutingModule { }
