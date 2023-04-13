import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { TypeRegroupement } from '../type-regroupement/type-regroupement.model';
import { TypeRegroupementService } from '../type-regroupement/type-regroupement.service';
import { RegroupementService } from '../regroupement/regroupement.service';
import { Regroupement, Type_loc, Localite } from '../regroupement/regroupement.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagerService } from '../event-manager.service';
import { LiaisonsRegroupement } from '../liaisons-regroupement/liaisons-regroupement.model';

@Component({
  selector: 'app-regroupement',
  templateUrl: './regroupement.component.html',
  styleUrls: ['./regroupement.component.css']
})

/*@Pipe({
  name: 'filter'
})*/

export class RegroupementComponent implements OnInit {
    
    regroupement: Regroupement = new Regroupement();
    typeRegroupements: TypeRegroupement;
    typeRegroupementFs: TypeRegroupement;
    typeRegroupement: TypeRegroupement = new TypeRegroupement();
    liaisonRegroupement: LiaisonsRegroupement;
    regroupements: Regroupement; // [] = new Array();
    searchText: string;
    regroupFilter: any = {codeTypeRegroupement: null}; // this.search};
    p: number  = 1; // pour la pagination
    
  create_loc: boolean; //  = false;
  edit_loc: boolean; //  = false;
  create_type_loc: boolean = false;
  edit_type_loc: boolean = false;

  type_loc_array: Array<Type_loc> = [];
  loc_array: Array<Localite> = [];

  type_loc_form: FormGroup = new FormGroup({
    id: new FormControl(),
    lib: new FormControl(),
    order: new FormControl()
  });

  loc_form: FormGroup = new FormGroup({
    id: new FormControl(),
    lib: new FormControl(),
    ordre: new FormControl(),
    codeRP: new FormControl(),
    type_loc: new FormControl()
  });


  constructor(
          private regroupementService: RegroupementService,
          private typeRegroupementService: TypeRegroupementService,
          private eventManager: EventManagerService,
          private router: Router,
          private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.loadAll();
    /*this.fetch_type_loc();
    this.fetch_localite();*/
    /*let t = new Type_loc();
    t.id = 1;
    t.lib = 'ANY TYPE FOR TEST';
    t.ordre = 100;
    this.type_loc_array.push(t);*/
  }
  
  loadAll() {
      this.typeRegroupementService.getAll().subscribe(data => { 
          // this.typeRegroupements = Array(data); 
          this.typeRegroupements = data;
          });
      this.regroupementService.getAll().subscribe(data => {
          // this.regroupements = Array(data);
          this.regroupements = data;
          /*for(let t in this.regroupements.codeTypeRegroupement) {
              this.typeRegroupementService.find(+t).subscribe(data => {
                  this.typeRegroupement = data;
              })
          }*/
      })
  }
  
  /*transform(items: any[], searchText: TypeRegroupement): any[] {
          if(!items) return [];
          if(!searchText) return items;
      searchText = searchText.libelleTypeRegroupement.toLowerCase();
      return items.filter( it => {
            return it.toLowerCase().includes(searchText);
      });
  }*/
  
  onKey(e: any) { 
      console.log(e.target.value);
      if(e.target.value) {
          this.typeRegroupementService.findByLibel(e.target.value).subscribe(data => {
              this.typeRegroupementFs = data;
              console.log(this.typeRegroupementFs);
              if(this.typeRegroupementFs) {
                  // console.log(this.typeRegroupementFs);
                  this.regroupementService.findTR(this.typeRegroupementFs.codeTypeRegroupement).subscribe(data => {
                      this.regroupements = data; 
                  })
                  this.regroupFilter = this.typeRegroupementFs.codeTypeRegroupement;
                  // console.log(this.typeRegroupementFs.codeTypeRegroupement);
                  console.log(this.regroupFilter);
              }
              console.log(this.regroupFilter);
          });
      }
      
    }
  
  /*filtre(m: string) {
      console.log(m);
      for(let t of Array(this.typeRegroupements)) {
          if(m.match(t.libelleTypeRegroupement)) {
              this.search = t.codeTypeRegroupement;
              this.regroupFilter = t.codeTypeRegroupement;
              console.log(t.codeTypeRegroupement);
          }
      }
      
  }*/

  change(e){
    this.loc_form.contains['type_loc'].setValue(e.target.value);
  }

  edit_type_localite(t): void{
    this.type_loc_form.controls['id'].setValue(t.id);
    this.type_loc_form.controls['lib'].setValue(t.lib);
    this.type_loc_form.controls['order'].setValue(t.ordre);
    this.edit_type_loc = true;
    this.typeRegroupement = t;
    
  }

  // ######### CREATE - UPDATE
  create_mod_type(): void{
    if(this.type_loc_form.valid){
      if(!this.edit_type_loc){
        let type_loc = new Type_loc();
        type_loc.ordre = this.type_loc_form.controls['order'].value;
        type_loc.lib = this.type_loc_form.controls['lib'].value;
        // ======================== CREATE REQUEST ===========================
        /*this.typeLocServ.create(type_loc);
        this.fetch_type_loc();*/
        this.typeRegroupementService.create(this.typeRegroupement).subscribe(res => {
            this.onSaveSuccess(res);
        })
        this.create_type_loc = false;
      }
      else{
        let type_loc = new Type_loc();
        type_loc.id = this.type_loc_form.controls['id'].value;
        type_loc.ordre = this.type_loc_form.controls['order'].value;
        type_loc.lib = this.type_loc_form.controls['lib'].value;
        
        
        // ========================= UPDATE REQUEST ======================  
        this.edit_type_loc = false;
        this.typeRegroupementService.update(this.typeRegroupement).subscribe(res => {
            this.onSaveSuccess(res);
        })
        /*this.typeLocServ.update(type_loc);
        this.fetch_type_loc();*/
      }
    }
  }
  
  createTypeLoc() {
      this.create_type_loc = true;    
  }
  
  saveTypeLoc() {
      if(this.loc_form.valid) {
          this.typeRegroupementService.create(this.typeRegroupement).subscribe(res => {
              this.onSaveSuccess(res);
              this.create_type_loc = false;
          })
      }
  }
  
  editTypeLoc(t: TypeRegroupement) {
      this.edit_type_loc = true;
      this.typeRegroupementService.find(t.codeTypeRegroupement).subscribe(data => {
          this.typeRegroupement = data;
      })
  }
  
  editType() {
      this.typeRegroupementService.update(this.typeRegroupement).subscribe(res => {
          this.onSaveSuccess(res);
          this.edit_type_loc = false;
      })
  }


  // ############### DELETE ####################
  delete_type(t: TypeRegroupement): void{
    //id :: the key for deleting
    // =========================== DELETE REQUEST ==========================
      this.typeRegroupementService.delete(t.codeTypeRegroupement).subscribe(res => {
          this.onSaveSuccess(res);
      })
    /*let index = this.type_loc_array.findIndex(t=> t.id ==id);
    this.type_loc_array.splice(index, 1);
    this.typeLocServ.delete(this.type_loc_array[index]);*/
  }


  // *********************************** LOCALITES *********************************
  
  edit_localite(loc): void{
      this.loc_form.controls['lib'].value(loc.lib);
      this.loc_form.controls['type_loc'].value(loc.type_loc);
      this.loc_form.controls['id'].value(loc.id);
      this.edit_loc = true;
      this.regroupement = loc;
    }
  
  // ####################### CREATE - UPDATE REQUEST #####################
  create_localite(): void{

      this.create_loc = true;
    /*if(this.loc_form.valid){
      if(!this.edit_loc){
        let l = new Localite();
        l.lib = this.loc_form.controls['lib'].value;
        l.type_loc = this.loc_form.controls['type_loc'].value;
        // =============================== CREATE REQUEST ============================
        this.create_loc = false;
        this.regroupementService.create(this.regroupement).subscribe(res => {
            this.onSaveSuccess(res);
        })
        this.loc_array.push(l); 
        this.locServ.create(l);
      }
      else{
        let l = new Localite();
        l.lib = this.loc_form.controls['lib'].value;
        l.type_loc = this.loc_form.controls['type_loc'].value;
        l.id = this.loc_form.controls['id'].value;
        
        
        // =============================== UPDATE REQUEST ============================
        this.edit_loc = false;
        this.regroupementService.update(this.regroupement).subscribe(res => {
            this.onSaveSuccess(res);
        })
        let tindex = this.loc_array.findIndex(tl=> tl.id==l.id); 
        this.loc_array[tindex] = l;
        this.locServ.update(l);
        //Here the requests must be way more fast because we update the client and send async stuff to the server
      }
    }*/
  }
  
  createLoc() {
      if(this.loc_form.valid) {
          this.regroupementService.create(this.regroupement).subscribe(res => {
              this.onSaveSuccess(res);
              this.create_loc = false;
          })
      }
  }
  
  editLoc(r: Regroupement) {
      this.edit_loc = true;
      this.regroupementService.find(r.codeRegroupement).subscribe(data => {
          this.regroupement = data;
      })
  }
  
  edit() {
      this.regroupementService.update(this.regroupement).subscribe(res => {
          this.onSaveSuccess(res);
          this.edit_loc = false;
      })
  }
 
  // ####################### DELETE REQUEST ###########################
  delete_localite(r: Regroupement) {
      this.regroupementService.delete(r.codeRegroupement).subscribe(res => {
          console.log(res.status);
              /*if(res.status == 400) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Impossible de supprimer cette localité car elle a des sous-localités ou est liée à une autre',
                      showConfirmButton: false,
                      timer: 1500
                    })
              }
              else{
                  Swal.fire({
                      icon: 'success',
                      title: 'Localité supprimée',
                      showConfirmButton: false,
                      timer: 1500
                    })
              }*/
              
          this.onSaveSuccess(res);
      });
    /*let index = this.loc_array.findIndex(t=> t.id ==id);
    this.type_loc_array.splice(index, 1);
    this.locServ.delete(this.loc_array[index]);*/
  }

  
  private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'ListModification'} );
      this.ngOnInit();
    }

}
