import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview/src';
import { NodeSelectEventArgs, TreeViewComponent, NodeCheckEventArgs, DragAndDropEventArgs, NodeEditEventArgs, NodeKeyPressEventArgs, NodeClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DataManager, UrlAdaptor, WebMethodAdaptor, Query } from '@syncfusion/ej2-data';
import { EventManagerService } from '../event-manager.service';
import { Subscription, Observable } from 'rxjs';
import { LiaisonsRegroupementService } from '../liaisons-regroupement/liaisons-regroupement.service';
import { LiaisonsRegroupement } from '../liaisons-regroupement/liaisons-regroupement.model';
import { HierarchieService } from '../hierarchie/hierarchie.service';
import { TypeChaineLocService } from '../type-chaine-loc/type-chaine-loc.service';
import { Hierarchie } from '../hierarchie/hierarchie.model';
import { TypeChaineLoc } from '../type-chaine-loc/type-chaine-loc.model';
import { TypeRegroupementService } from '../type-regroupement/type-regroupement.service';
import { RegroupementService } from '../regroupement/regroupement.service';
import { TypeRegroupement } from '../type-regroupement/type-regroupement.model';
import { Regroupement } from '../regroupement/regroupement.model';
import { AuthService } from '../auth.service';
import { TypeSecteur } from '../type-secteur/type-secteur.model';
import { TypeSecteurService } from '../type-secteur/type-secteur.service';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-liaisons-regroupement',
  templateUrl: './liaisons-regroupement.component.html',
  styleUrls: ['./liaisons-regroupement.component.css']
})
export class LiaisonsRegroupementComponent implements OnInit {

    liaisonsRegroupement: LiaisonsRegroupement = new LiaisonsRegroupement();
    liaisonsRegroupements: LiaisonsRegroupement;
    hierarchie: Hierarchie = new Hierarchie();
    hierarchies: Hierarchie;
    typeChaineLocs: TypeChaineLoc;
    typeRegroupement: TypeRegroupement = new TypeRegroupement();
    regroupement: Regroupement = new Regroupement();
    regroupements = new Array<Regroupement>();
    typeSecteurs: TypeSecteur;
    typeSecteur: TypeSecteur;    
    typeRegroupements = new Array<TypeRegroupement>();
     
    subscription: Subscription;
    id:number;
    c: number;
    mode: number;
    paramChaine = 'id';
    typeLoc: string = null;
    typeCodeLoc: number = 0;
    reg = new FormControl();
    treeData = new Array<any>();
    treeD = 0;
    currentTreeD = null;
    checkArray: any = [];
    form: FormGroup;
    currentIdChaine: number = 0;
    currentIdTypeReg: number = 0;
    nodeId: string = null; // : number = 0;
    nodeName: string = null;
    node = null;
    
/**************************************************** Treeview *************************************************/

    @ViewChild ('tree', {static: false}) treeObj: TreeViewComponent;
    public index: number = 1;
    
    public treeT: Object[] =[{ regroupement : {codeRegroupement:0, libelleRegroupement:'', ordreRegroupement:0, codeRegroupPays:0, codeTypeRegroupement:0},
                               codeRegroupementParent:0, listRegFils:[{  regroupement : {codeRegroupement:0, libelleRegroupement:'', ordreRegroupement:0, codeRegroupPays:0, codeTypeRegroupement:0},
                                                                         codeRegroupementParent:0, listRegFils:[{ codeRegroupementParent:0, regroupement : {codeRegroupement:0, libelleRegroupement:'', ordreRegroupement:0, codeRegroupPays:0, codeTypeRegroupement:0}
                                                                                                                 }]   
                                                                       }]
                              }];
   
    public treeF: Object = {
            dataSource: null, // this.treeT,
            pid: 'codeRegroupementParent',
            text: 'regroupement.libelleRegroupement',
            id: 'regroupement.codeRegroupement',
            text2: 'regroupement.ordreRegroupement',
            text3: 'regroupement.codeRegroupPays',
            text4: 'regroupement.codeTypeRegroupement',
            child:'listRegFils'
    };
                           
   
    
    
/************************************************* fin treeview definition *****************************************/
    
    
    constructor(
          private liaisonsRegroupementService: LiaisonsRegroupementService,
          private hierarchieService: HierarchieService,
          private typeChaineLocService: TypeChaineLocService,
          private typeRegroupementService: TypeRegroupementService,
          private typeSecteurService: TypeSecteurService,
          private regroupementService: RegroupementService,
          private fb: FormBuilder,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private router: Router,
          public activatedRoute: ActivatedRoute
          ) {
        this.form = this.fb.group({
            checkArray: this.fb.array([], [Validators.required])
          })
    }
    
    ngOnInit() {
        this.loadAll();
        this.subscription = this.activatedRoute.params.subscribe((params) => {
          this.id = +params['id'];
          this.c = params['c'];
      });
      
    }
       
/**************************************** Gestion des évènements du Treeview ************************************/

    nodeChecked(args: NodeCheckEventArgs) {
        /*console.log(args);
        console.log(args.data[0].id);*/
        if(args.data) {
            this.treeD = +args.data[0].id;
            this.getTypeByReg(this.treeD);
        }
    }
    
   
    nodeSelected(args: NodeSelectEventArgs) {
        // console.log(args);
            if(args.nodeData.id) {
                this.treeD = +args.nodeData.id;
                this.getTypeByReg(this.treeD);
            }
    }
    
    /**** Gestion du glisser déposer (drap and drop) ****/
    nodeDragStart(args: DragAndDropEventArgs) {
        // console.log(args.draggedNodeData);
        var ele = args.draggedNode.querySelector('.e-list-text');
        args.clonedNode.querySelector<HTMLElement>('.e-list-text').style.color = window.getComputedStyle(ele).color;
    }
    
    nodeDropped(args: DragAndDropEventArgs) {
        /*console.log('********* Dropped **********');
        console.log(args.draggedNodeData);
        console.log(args.draggedNodeData.id);
        console.log(args.droppedNodeData);
        console.log(args.droppedNodeData.id);*/
        if(!(args.draggedParentNode.querySelector('.e-icons'))) {
            args.draggedParentNode.classList.add('e-custom');
          }
        this.liaisonsRegroupement.id.codeRegroupement = args.draggedNodeData.id.toString();
        this.liaisonsRegroupement.id.codeRegroupementParent = args.droppedNodeData.id.toString();
        this.liaisonsRegroupementService.create(this.liaisonsRegroupement).subscribe(res => {
            if(res.status == 200) {
                this.onSaveSuccess(res);
            }
        });
    }
    
    /******* Gestion de la suppression d'un noeud ****/
    public iconClick(e: any) {
            this.node = e.target.closest('li.e-list-item');
     }
    
    deleteNode(d) {
        /*console.log(d);
        console.log(d.regroupement.codeRegroupement);
        console.log(d.codeRegroupementParent);*/
        this.liaisonsRegroupementService.delete(d.regroupement.codeRegroupement, d.codeRegroupementParent).subscribe(res => {
            this.onSaveSuccess(res);
          //suppression du noeud sélectionné
            this.treeObj.removeNodes([this.node]); 
          //mise à jour de l'arbre
            for(var i = 0; i < Array(this.treeT).length; i++) {
                Array(this.treeT)[i].splice(this.node, 1);
            }
        })
        
    }  
    
/************************************** Fin de la gestion des évènements **********************************/ 
    
 /*******************==== Gestion des localités ====*************************/
    
    getChaineBySecteur(id: number) {
        this.typeChaineLocService.findBySecteur(id).subscribe(data => {
            this.typeChaineLocs = data;
        })
    }
    
    getChaine(idTypeChaine: number) {
          if(idTypeChaine) {
              this.regroupementService.findChaine(idTypeChaine).subscribe(data => {
                  this.treeData = data;
                  // console.log(this.treeData);
              });
                let data: Object = new DataManager({
                    url: this.regroupementService.resourceChaineUrl+idTypeChaine, 
                    adaptor: new UrlAdaptor,
                    crossDomain: true,
                    headers: [{ Authorization: this.authService.getHeaderForTree()}]
                }).executeQuery(new Query()).then((r:any) => {
                    /*console.log('*********** Résultat **********');
                    console.log(r.result);
                    console.log('*********************');*/
                    this.treeF = { dataSource: r.result, pid: 'codeRegroupementParent',
                            text: 'regroupement.libelleRegroupement', id: 'regroupement.codeRegroupement',
                            text2: 'regroupement.ordreRegroupement', text3: 'regroupement.codeRegroupPays',
                            text4: 'regroupement.codeTypeRegroupement', child:'listRegFils'
                    }
                });
          }
    }
    
    getTypeByReg(id: number) {
        if(id) {         
            this.currentIdTypeReg = id;
            this.typeRegroupementService.findByReg(id).subscribe(data => {
                this.typeRegroupement = data;
                this.typeRegroupementService.getAll().subscribe(result => {
                    // console.log(data);
                    this.typeRegroupements = new Array<TypeRegroupement>();
                    for(let i=0; i<Array(result).length; i++) {
                    let d = data[i].codeTypeRegroupement;
                    // pour supprimer les types de localités antérieures à celle correspondante à la chaine sélectionnée(dans la liste déroulante)
                    if(Array(this.typeRegroupement).every(t => t.codeTypeRegroupement < d)) {
                        this.typeRegroupements.push(data[i]);
                    }
                } // console.log(this.typeRegroupements);
                    return this.typeRegroupements;
                });
                // pour la gestion de l'affichage du type correspondant dans la liste déroulante
                this.typeCodeLoc = this.typeRegroupement[0].codeTypeRegroupement+1;
                if(this.typeRegroupement) {
                    this.getRegByType(this.typeCodeLoc);
                }
            })  
        } else {
            this.currentIdTypeReg = 0;
        }
        
    }
    
    getRegByType(id: number) {
        // console.log(this.treeData);
        this.regroupementService.findAllByTReg(id).subscribe(data => {
            // console.log(data);
            this.regroupements = new Array<Regroupement>();
            for(let i=0; i<Array(data).length; i++) {
                let d = data[i].codeRegroupement;
				console.log(d);
            // pour gérer l'affichage des localités ne figurant pas déjà dans l'arbre
                if(this.treeData.filter(t => t.codeRegroupement === d).length == 0) {
                    this.regroupements.push(data[i]);
                }
            }
            // console.log(this.regroupements);
            return this.regroupements;
        })
    }
    
    // pour gérer la sélection des localités à ajouter dans l'arbre
    getRegroupement(e:any, r: Regroupement) { 
        // console.log(e);
        this.regroupement = r;
        // this.checkArray = new Array<Regroupement>();
        // console.log(this.regroupement.codeRegroupement);
        const checkArray: FormArray = this.form.get('checkArray') as FormArray;
        if (e.target.checked && r != null) {
            // checkArray.push(r);
            this.checkArray.push(r);
            // console.log(this.checkArray);
        } else if(!e.target.checked) {
         // permet de n'ajouter dans le tableau que les éléments cochés
            this.checkArray.splice(r, 1); // supprime les éléments non cochés du tableau
            // console.log(this.checkArray);
        }
    }
    
    //pour gérer l'ajout d'une localité dans l'arbre
    addToTree() {
        console.log(this.checkArray);
        for(let a of this.checkArray) {
            // console.log(a);
            this.liaisonsRegroupement.id.codeRegroupementParent = this.treeD.toString();
            this.liaisonsRegroupement.id.codeRegroupement = a.codeRegroupement.toString();
            this.nodeId = a.codeRegroupement.toString(); // pour gérer l'ajout du noeud dans l'arbre
            this.nodeName = a.libelleRegroupement;
            this.liaisonsRegroupementService.create(this.liaisonsRegroupement).subscribe(res => {
                this.onSaveSuccess(res);
            });
            
            /*console.log(this.regroupements);
            const index = this.regroupements.findIndex(r => r.codeRegroupement = a.codeRegroupement);
            console.log(index);
            this.regroupements.splice(index, 1);*/
            
            // this.regroupements.filter(r => r.codeRegroupement !== a.codeRegroupement);

            for(let j =0;  j<this.regroupements.length; j++) {
                // console.log(this.regroupements[j]);
                // console.log(a.codeRegroupement);
                if (this.regroupements[j].codeRegroupement === a.codeRegroupement) {
                    this.regroupements.splice(j--, 1);
                  }
                /*if(this.regroupements[j].codeRegroupement = a.codeRegroupement) {
                    console.log(this.regroupements[j].codeRegroupement);
                    this.regroupements.splice(this.regroupements[j], 1);
                    // this.regroupement
                }*/
                // console.log(this.regroupements);
            }
            // console.log(this.regroupements);
            
            // console.log(this.nodeId);
            // console.log(this.nodeName);
            let item : { [key: string]: Object } = { regroupement:{codeRegroupement:this.nodeId, libelleRegroupement:this.nodeName}, codeRegroupementParent: this.treeD.toString() };
            this.treeObj.addNodes([item], this.treeObj.selectedNodes[0]); // .checkedNodes[0]);
            this.index++;
            //ajout du node sur la vue de l'arbre 
            // Array(this.treeT).push(item);
			this.treeT.push(item);
        } 
            return this.regroupements;
            
    }
    
    loadAll() {
        
        this.hierarchieService.getAll().subscribe(data => {
            this.hierarchies = data;
        });
        
        this.typeSecteurService.getAll().subscribe(data => {
            this.typeSecteurs = data;
        })
        
        
    }
    
    load(lR: LiaisonsRegroupement) {
        this.liaisonsRegroupementService.find(lR).subscribe(data => {
        this.liaisonsRegroupement = data;
        });
    }
    
    /**************************** Création **************************/
    
    createSuspension() {
        this.mode = 2;
    }
    
    save() {
        this.liaisonsRegroupementService.create(this.liaisonsRegroupement).subscribe(res => {
            if(res.status == 200) {
                this.onSaveSuccess(res);
            }
        });
    }
    
    subscribeToSaveResponse(result: Observable<LiaisonsRegroupement>) {
        result.subscribe((res: LiaisonsRegroupement) => {
        // console.log(res);
        this.onSaveSuccess(res);
        }); 
    }
    
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'liaisonsRegroupementListModification'} );
        this.ngOnInit();
    }
    
    close() {
        this.mode = 1;
    }
    
    /**************************** Détails **************************/
    
    detailsAffectation(id: number) {
        this.mode = 5;
    }
    
    /**************************** Edition **************************/
    
    editSuspension(lR: LiaisonsRegroupement) {
        this.mode = 3;
        this.subscription = this.activatedRoute.params.subscribe((params) => {
            this.id = params['id'];
            this.c = params['c'];
        });
        this.liaisonsRegroupementService.find(lR).subscribe( (liaisonsRegroupement) => {
            this.liaisonsRegroupement = liaisonsRegroupement;
        });
    }
    
    edit() {
        this.liaisonsRegroupementService.delete(this.id, this.c).subscribe( (response) => {
            this.eventManager.broadcast({name: 'liaisonsRegroupementListModification'});
            
            this.liaisonsRegroupement.id.codeRegroupement = this.id.toString();
            // this.liaisonsRegroupement.id.codeRegroupementParent = this.c.toString();
            this.liaisonsRegroupementService.create(this.liaisonsRegroupement).subscribe(res => {
                if(res.status == 200) {
                    this.onSaveSuccess(res);
                }
            });
        });
        
    }
    
    /**************************** Suppression **************************/
    
    deleteCheck(lR: LiaisonsRegroupement, event: any) {
        this.liaisonsRegroupementService.delete(+lR.id.codeRegroupement, +lR.id.codeRegroupementParent).subscribe((response) => {
            this.eventManager.broadcast({name: 'liaisonsRegroupementListModification'});
            this.ngOnInit();
        });
    }

}

