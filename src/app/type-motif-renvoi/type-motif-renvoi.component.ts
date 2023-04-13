import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeMotifRenvoi } from '../type-motif-renvoi/type-motif-renvoi.model';
import { TypeMotifRenvoiService } from '../type-motif-renvoi/type-motif-renvoi.service';
import { TypeCategorieService } from '../type-categorie/type-categorie.service';

@Component({
  selector: 'app-type-motif-renvoi',
  templateUrl: './type-motif-renvoi.component.html',
  styleUrls: ['./type-motif-renvoi.component.css']
})
export class TypeMotifRenvoiComponent implements OnInit {

    typeMotifRenvoi: TypeMotifRenvoi = new TypeMotifRenvoi();
    typeMotifRenvois: TypeMotifRenvoi[] = new Array();
    empSelected: number;
    routeData: any;
    subscription: Subscription;
    mode: number;
    id: number;
    title: string;
    typesTable: string[];
    typeSelected: string;
    header: string;
    p: number = 1; //pour la pagination
    
    constructor(
            private typeCategorieService: TypeCategorieService,
          private typeMotifRenvoiService: TypeMotifRenvoiService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.typeSelected = "TypeMotifRenvoi";
      this.loadAll();
      this.loadType();
      this.registerChangeInTypeMotifRenvois();
    }
    
    loadAll() {
        this.typeCategorieService.getTables().subscribe( (data: string[]) => {
            this.typesTable = data;
        })
    }
    
    loadType() {
        this.title = 'Liste des types de motif de renvoi';
        this.typeMotifRenvoiService.getAll().subscribe(data => { 
          this.typeMotifRenvois = Array(data); 
          });
    }
    
    registerChangeInTypeMotifRenvois() {
      this.eventManager.subscribe( 'typeMotifRenvoisListModification', ( response ) => this.loadAll() );
    }
    
    selectType() {
        this.typeCategorieService.selectType(this.typesTable, this.typeSelected, this.mode);
  }
    
    /************************************* Détais et suppression  ***********************************/
    detailsTypeMotifRenvoi() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteCheck(id: number, event: any) {
          this.typeMotifRenvoiService.delete(id).subscribe((response) => {
              this.eventManager.broadcast({name: 'typeMotifRenvoisListModification'});
              this.mode = 1;
              this.loadType();
          });
    }
    
    /****************************** Création *************************************/
    createTypeMotifRenvoi() {
      this.mode = 2;  
      this.header = "Création";
      this.typeMotifRenvoi = new TypeMotifRenvoi;
    }
    
    save() {
      // this.typeMotifRenvoi.codeTypeMotifRenvoi = this.id;
      this.subscribeToSaveResponse(this.typeMotifRenvoiService.create(this.typeMotifRenvoi));
    }
    
    subscribeToSaveResponse(result: Observable<TypeMotifRenvoi>) {
      result.subscribe((res: TypeMotifRenvoi) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'typeMotifRenvoisListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editTypeMotifRenvoi(id:number) {
      this.mode = 3;
      this.header = "Edition";
      this.load(id);
    }
    
    load(id) {
        this.typeMotifRenvoiService.find(id).subscribe( (typeMotifRenvoi) => {
            this.typeMotifRenvoi = typeMotifRenvoi;
        });
    }
    
    edit() {
      /*this.typeMotifRenvoiService.delete(this.id).subscribe( (response) => {
          this.eventManager.broadcast({name: 'typeMotifRenvoisListModification'});
      });
      this.typeMotifRenvoi.codeTypeMotifRenvoi = this.id;*/
      this.subscribeToSaveResponse(this.typeMotifRenvoiService.update(this.typeMotifRenvoi));
    }
    
    /************************************ Delete **********************************/

    deleteType(id: number) {
        this.typeMotifRenvoiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({name: 'typeMotifRenvoisListModification'});
            this.mode = 1;
            this.loadType();
        });
    }

}
