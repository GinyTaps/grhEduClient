import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
/*import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';*/
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService, ResponseWrapper } from './employe.service';
import { Employe } from './employe.model';
import { EventManagerService } from '../event-manager.service';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth.service';
import { EmployePathologie } from '../employe-pathologie/employe-pathologie.model';
import { EmployeHandicap } from '../employe-handicap/employe-handicap.model';
import { EmployeEtatCivil } from '../employe-etat-civil/employe-etat-civil.model';
import { EmployeFonction } from '../employe-fonction/employe-fonction.model';
import { EmployeDiplome } from '../employe-diplome/employe-diplome.model';
import { EmployePoste } from '../employe-poste/employe-poste.model';
import { EmployeStatut } from '../employe-statut/employe-statut.model';
import { Poste } from '../poste/poste.model';
import { TypeStatut } from '../type-statut/type-statut.model';
import { TypeEtatCivil } from '../type-etat-civil/type-etat-civil.model';
import { TypeFonction } from '../type-fonction/type-fonction.model';
import { TypeDiplome } from '../type-diplome/type-diplome.model';
import { TypeHandicap } from '../type-handicap/type-handicap.model';
import { TypePathologie } from '../type-pathologie/type-pathologie.model';
import { EmployePathologieService } from '../employe-pathologie/employe-pathologie.service';
import { EmployeHandicapService } from '../employe-handicap/employe-handicap.service';
import { EmployeEtatCivilService } from '../employe-etat-civil/employe-etat-civil.service';
import { EmployeFonctionService } from '../employe-fonction/employe-fonction.service';
import { EmployePosteService } from '../employe-poste/employe-poste.service';
import { EmployeDiplomeService } from '../employe-diplome/employe-diplome.service';
import { EmployeStatutService } from '../employe-statut/employe-statut.service';
import { TypeStatutService } from '../type-statut/type-statut.service';
import { TypeEtatCivilService } from '../type-etat-civil/type-etat-civil.service';
import { TypeFonctionService } from '../type-fonction/type-fonction.service';
import { TypeDiplomeService } from '../type-diplome/type-diplome.service';
import { TypeHandicapService } from '../type-handicap/type-handicap.service';
import { TypePathologieService } from '../type-pathologie/type-pathologie.service';
import { Regroupement, Chaine } from '../regroupement/regroupement.model';
import { RegroupementService } from '../regroupement/regroupement.service';
import { TypeRegroupement } from '../type-regroupement/type-regroupement.model';
import { TypeRegroupementService } from '../type-regroupement/type-regroupement.service';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit, OnDestroy {


    p: number = 1;
    
    // paged items
    pageEmployes: any[] = new Array(); //pour éviter cette erreur 'Cannot read property '0' of undefined'

  currentPage = 0;
  size = 5;
  pages: Array<number>;
  employes: Employe = new Employe();
  postes: Poste;
  employees: Employe; // [] = new Array();
  employePathologie: EmployePathologie = new EmployePathologie();
  employeHandicap: EmployeHandicap = new EmployeHandicap();
  employeEtatCivil: EmployeEtatCivil = new EmployeEtatCivil();
  employeFonction: EmployeFonction = new EmployeFonction();
  employeDiplome: EmployeDiplome = new EmployeDiplome();
  employePoste: EmployePoste = new EmployePoste();
  employeStatut: EmployeStatut = new EmployeStatut();
  empSelected: number;
  // t: number;
  routeData: any;
  checkContent: boolean;
  checkedT: boolean;
  choiceP = null;
  choiceAE = null;
  
  typeStatuts: TypeStatut;
  typeEtatCivils: TypeEtatCivil;
  typeFonctions: TypeFonction;
  typeDiplomes: TypeDiplome;
  typeHandicaps: TypeHandicap;
  typePathologies: TypePathologie;
  
  typeRegroupements: TypeRegroupement;
  regroupements: Chaine // [];
  regroupementChaines: { [id: number]: Regroupement[] } = {}; // Regroupement[] = new Array();
  regroupementFils: { [id: number]: Regroupement[] } = {};
  regroupementSousFils: { [id: number]: Regroupement[] } = {};
  regroupementSousSFils: { [id: number]: Regroupement[] } = {};
  
  regChaines = null;
  regFils = null;
  regSousFils = null;
  
  codeRegroupement = null;
  codeRegroupementA = null;
  codeRegroupementUnder = null;
  regSelected: number;
  data: any = [{Employe}]; // pour l'exportation
  
  exportAsPdf: ExportAsConfig = {
          type: 'pdf', // the type you want to download
          elementId: 'pdfTable', // the id of html/table element
        
  }
  exportAsXls: ExportAsConfig = {
          type: 'xlsx', // the type you want to download
          elementId: 'pdfTable', // the id of html/table element
        
  }

  constructor(
    public activeModal: NgbActiveModal,
    private employeService: EmployeService,
    private regroupementService: RegroupementService,
    private typeRegroupementService: TypeRegroupementService,
    private employePathologieService: EmployePathologieService,
    private employeHandicapService: EmployeHandicapService,
    private employeEtatCivilService: EmployeEtatCivilService,
    private employeFonctionService: EmployeFonctionService,
    private employeDiplomeService: EmployeDiplomeService,
    private employePosteService: EmployePosteService,
    private employeStatutService: EmployeStatutService,
    private typeStatutService: TypeStatutService,
    private typeEtatCivilService: TypeEtatCivilService,
    private typeFonctionService: TypeFonctionService,
    private typeDiplomeService: TypeDiplomeService,
    private typeHandicapService: TypeHandicapService,
    private typePathologieService: TypePathologieService,
    private eventManager: EventManagerService,
    private excelService:ExcelService,
    private exportAsService: ExportAsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private router: Router
    ) {
      this.routeData = this.activatedRoute.data.subscribe(( data ) => (data));
  }

  
  ngOnInit() {
    // this.empSelected = +this.activatedRoute.snapshot.params.get('id');
      this.checkedT = true;
      this.getTypeRegroupement();
      // this.checkContent = false;
      this.empSelected = +this.activatedRoute.snapshot.params['id'];
      this.loadAll();
      this.registerChangeInEmployes();
      // this.listStatusChange.emit(this.employes.codeEmploye);

  }
  
  isAuthenticated() {
      return this.authService.isAuthenticated();
  }   
  
  getTypeRegroupement() {
      this.typeRegroupementService.getAll().subscribe(data => {
          this.typeRegroupements = data;
      })
  }
  
  getChaineRegroupement(t : TypeRegroupement) {
      this.regroupementService.getChaineReg(t.codeTypeRegroupement).subscribe(data => {
          this.regroupementChaines[t.codeTypeRegroupement] = data;
          this.regChaines = this.regroupementChaines[t.codeTypeRegroupement];
      });
  }
  
  getRegroupement(r :Regroupement) {
      this.regroupementService.getChaineRegFils(r.codeRegroupement).subscribe(data => {
          this.regroupementFils[r.codeRegroupement] = data;
          this.regFils =  this.regroupementFils[r.codeRegroupement];
      })
      
  }
  
  getARegroupement(r :Regroupement) {
      this.regroupementService.getChaineRegFils(r.codeRegroupement).subscribe(data => {
          this.regroupementSousFils[r.codeRegroupement] = data;
          this.regSousFils = this.regroupementSousFils[r.codeRegroupement];
      })
      this.regSelected = r.codeRegroupement;
  }
  
  getUnderRegroupement(r :Regroupement) {
      /*this.regroupementService.getChaineRegFils(r.codeRegroupement).subscribe(data => {
          this.regroupementSousSFils[r.codeRegroupement] = data;
      })*/
      this.regSelected = r.codeRegroupement;
      /*console.log('************ Regroupement sélectionné *******:');
      console.log(this.regSelected);
      console.log('***************************************************');*/
  }
  
  /************************** Exportation sous excel ou pdf **********************/
  /*exportAsXLSX() {
      this.excelService.exportAsExcelFile(this.data, 'sample');
    }
  
  @ViewChild('content', {static: false}) content: ElementRef;

  makePdf() { 
    let doc = new jsPDF();
    doc.addHTML(this.content.nativeElement, function() {
       doc.save('filename.pdf');
    });
  }
  
  generatePdf(data) {
      html2canvas(data, { allowTaint: true }).then(canvas => {
       let HTML_Width = canvas.width;
       let HTML_Height = canvas.height;
       let top_left_margin = 15;
       let PDF_Width = HTML_Width + (top_left_margin * 2);
       let PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
       let canvas_image_width = HTML_Width;
       let canvas_image_height = HTML_Height;
       let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
       canvas.getContext('2d');
       let imgData = canvas.toDataURL("image/jpeg", 1.0);
       let pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
       pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
       for (let i = 1; i <= totalPDFPages; i++) {
         pdf.addPage([PDF_Width, PDF_Height], 'p');
         pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
       }
        // pdf.save("HTML-Document.pdf");
       pdf.save('filename.pdf');
     });
   }
  
  exportAsPDF() {
    let data = document.getElementById('pdfTable');  
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
      pdf.save('Filename.pdf');   
    }); 
  }*/
  
  exportAsPDF() {
      // download the file using old school javascript method
      this.exportAsService.save(this.exportAsPdf, 'PdfFileName').subscribe(() => {
        // save started
      });
      // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
      /*this.exportAsService.get(this.config).subscribe(content => {
        console.log(content);
      });*/
    }
  
  exportAsExcel() {
      this.exportAsService.save(this.exportAsXls, 'XlsxFileName').subscribe(() => {
        });
  }
  
/********************************* Fin exportation *********************************/

  
  loadAll() {
      
      this.getTypeRegroupement();
      
      this.employeService.getAll().subscribe(data => { 
              // this.employes = data;
              this.employees = data; // Array(data);
              this.data = this.employees;
              });
      
      this.typeStatutService.getAll().subscribe(data => {
          this.typeStatuts = data;
      })
      
      this.typeDiplomeService.getAll().subscribe(data => {
          this.typeDiplomes = data;
      })
      
      this.typeEtatCivilService.getAll().subscribe(data => {
          this.typeEtatCivils = data;
      })
      
      this.typeFonctionService.getAll().subscribe(data => {
          this.typeFonctions = data;
      })
      
      this.typeHandicapService.getAll().subscribe(data => {
          this.typeHandicaps = data;
      })
      
      this.typePathologieService.getAll().subscribe(data => {
          this.typePathologies = data;
      })
      
  }
 

  registerChangeInEmployes() {
        this.eventManager.subscribe( 'employeListModification', ( response ) => this.loadAll() );
    }
  
  
  ifChecked(event) {
      if(event.target.checked) { // this.checkContent) {
          this.checkedT = false;
      } else
          this.checkedT = true;
  }
  /*ifChecked(event) {
      if(event.target.checked) {
          this.checkContent = true;
          this.checkedT = false;
          console.log('******** Requête sur la table EmployePoste *********');
          this.employeService.searchViaPoste().subscribe(data => {
              this.employes = data;
              console.log(this.employes);
              this.employees = Array(data);
              console.log(this.employees);
          });
      } else
          this.checkContent = false;
  }*/
  
  deleteEmploye(id: number) {
      this.employeService.delete(id).subscribe(res => {
          this.onSaveSuccess(res);
      })
  }
  
  reset() {
      this.employes.matriculeEmploye = null;
      this.employes.nomEmploye = null;
      this.employes.dateEngEmploye = null;
      this.employeStatut.id.codeTypeStatut = null;
      this.employePathologie.id.codeTypePathologie = null;
      this.employeEtatCivil.id.codeTypeEtatCivil = null;
      this.employeFonction.id.codeTypeFonction = null;
      this.employeDiplome.id.codeTypeDiplome = null;
      this.employeHandicap.id.codeTypeHandicap = null;
      this.choiceP = null;
      this.choiceAE = null;
      this.codeRegroupement = null
      this.codeRegroupementA = null;
      this.codeRegroupementUnder = null;
      this.regSelected = null;
      this.loadAll();
  }
  
  applySearch() {    
      // this.choice = '';
      
      this.employeService.search(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
              +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
              +this.employeDiplome.id.codeTypeDiplome).subscribe(data => {
          this.employees = data;
      });
      
      /*if( this.choiceP.match('poste') ) {
          
          console.log(this.employes.matriculeEmploye);
          console.log(this.employes.nomEmploye);
          console.log(this.employes.dateEngEmploye);
          console.log(this.employeStatut.id.codeTypeStatut);
          console.log(this.employePathologie.id.codeTypePathologie);
          console.log(this.employeEtatCivil.id.codeTypeEtatCivil);
          console.log(this.employeFonction.id.codeTypeFonction);
          console.log(this.employeDiplome.id.codeTypeDiplome);
          console.log(this.employeHandicap.id.codeTypeHandicap);
          
          
          if(this.choiceAE.match('administration')) {
              console.log('******** Requête avec la prise en compte du poste et des administrations *********');
          } 
          else if(this.choiceAE.match('ecole')) {
              console.log('******** Requête avec la prise en compte du poste et des écoles *********');
          }
          else {
              console.log('******** Requête avec la prise en compte du poste *********');
              
              this.employeService.searchWithP(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
                      +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                      +this.employeDiplome.id.codeTypeDiplome).subscribe(data => {
                  this.employees = data; // Array(data);
                  // console.log(this.employees);
              });
          } 
      } 
      else {
          
          if(this.choiceAE.match('administration')) {
              console.log('******** Requête sans la prise en compte du poste et des administrations *********');
          } 
          else if(this.choiceAE.match('ecole')) {
              console.log('******** Requête sans la prise en compte du poste et des écoles *********');
          }
          else {
              console.log('******** Requête sans la prise en compte du poste *********');
              this.employeService.searchWithOP(this.employes.nomEmploye, this.employes.matriculeEmploye, this.employes.dateEngEmploye, +this.employeEtatCivil.id.codeTypeEtatCivil,
                      +this.employeFonction.id.codeTypeFonction, +this.employeStatut.id.codeTypeStatut, +this.employePathologie.id.codeTypePathologie, +this.employeHandicap.id.codeTypeHandicap,
                      +this.employeDiplome.id.codeTypeDiplome).subscribe(data => {
                  this.employees = data; // Array(data);
                  // console.log(this.employees);
              });
          }
      } */
      
  }
  
  
  /*public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
      this.pageEmployes.filter = value.trim().toLocaleLowerCase();
    }*/
  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'employeListModification'} );
      this.loadAll();
    }

  onError(error) {
        error(error.message, null, null);
    }

  ngOnDestroy() {
        this.routeData.unsubscribe();
    }


  trackId(index: number, item: Employe) {
        return item.codeEmploye;
    }

   clear() {
       this.location.back();
        // this.activeModal.dismiss('cancel');
    }

    
  /* sort() {
        const result = [this.predicate + ',' + ( this.reverse ? 'asc' : 'desc' )];
        if ( this.predicate !== 'id' ) {
            result.push( 'id' );
        }
        return result;
    }

  loadPage( page: number ) {
        if ( page !== this.previousPage ) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate( ['/employe'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + ( this.reverse ? 'asc' : 'desc' )
            }
        } );
        this.loadAll();
    }

    private onSuccess( data, headers ) {
        this.links.parse( headers.get( 'link' ) );
        this.totalItems = headers.get( 'X-Total-Count' );
        this.queryCount = this.totalItems;
        this.employes = data;
    }

  clearSearch() {
        this.employees = [];
        this.links = {
            last: 0
        };
        this.page = 0;
        this.predicate = 'id';
        this.reverse = true;
        this.motCle = null;
        this.currentSearch = null;
        this.loadAll();
    } */


  /* this.http.get('http://localhost:8080/api/employes')
    .map(res => res.json())*/

    /*if(this.employes.enseigne_Y_N) //this.employes[24]
    { this.employes.enseigne_Y_N = 'Oui'; }
    else
      { this.employes.enseigne_Y_N = 'Non'; }

      if(this.employes.confirme_Y_N) //this.employes[25]
      { this.employes.confirme_Y_N = 'Oui'; }
    else
      { this.employes.confirme_Y_N = 'Non'; }
    return this.employes = this.employeService.getAllEmploye();*/

  /*ajouterEmp(employe){
    this.employeService.saveEmploye(employe);
    employe={CODE_EMPLOYE:null , Matricule:'',Nom:'',Prenom:'',
    Enseigne:'',Confirme:'',Date_Naissance:'',Cin:'',Date_Cin:'',Tel:'',Adresse:'',Email:'',
        Date_Eng:'',Date_Tit:'', Employe_Affectation:''};

    //this.employes = this.employeService.getAllEmploye();
  }*/
    /*this.http.get('http://localhost/8080/api/chercherEmployes?mot='+dataS.motCle)
    .map(res => res.json())*/
  /*this.http.get('http://localhost:8080/api/chercherEMPLOYEs?mot='+dataS.motCle)
    .map((resp: Response) => resp.json().employes)
    .subscribe((data) =>{
      console.log(data);
      this.employes = data;
     //this.pageEmployes=data;
    }) */



}
