import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { EventManagerService } from '../event-manager.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChefHierarchiePoste } from '../chef-hierarchie-poste/chef-hierarchie-poste.model';
import { ChefHierarchiePosteService } from '../chef-hierarchie-poste/chef-hierarchie-poste.service';

@Component({
  selector: 'app-chef-hierarchie-poste',
  templateUrl: './chef-hierarchie-poste.component.html',
  styleUrls: ['./chef-hierarchie-poste.component.css']
})
export class ChefHierarchiePosteComponent implements OnInit {

    chefHierarchiePoste: ChefHierarchiePoste = new ChefHierarchiePoste();
    chefHierarchiePostes: ChefHierarchiePoste;
    posteSelected: number;
    routeData: any;
    subscription: Subscription;
    mode: number;
    id: number;
    c: number;
    
    constructor(
          private chefHierarchiePosteService: ChefHierarchiePosteService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute,
          private router: Router
          ) { }
    
    ngOnInit() {
      this.mode = 1;
      this.load();
      this.registerChangeInChefHierarchiePostes();
    }
    
    load() {
        this.chefHierarchiePosteService.getAll().subscribe(data => { 
            this.chefHierarchiePostes = data;
        });  
    }
    
    registerChangeInChefHierarchiePostes() {
      this.eventManager.subscribe( 'chefHierarchiePostesListModification', ( response ) => this.load() );
    }
    
    /************************************* Détais et suppression  ***********************************/
    detailsChefHierarchiePoste() {
      this.mode = 4;   
    }
    
    
    // Fonction permettant de supprimer la ligne cochée
    deleteChefHierarchiePoste(chp) {
          this.chefHierarchiePosteService.delete(chp).subscribe((response) => {
              this.eventManager.broadcast({name: 'chefHierarchiePostesListModification'});
              this.ngOnInit();
          });
    }
    
    /****************************** Création *************************************/
    createChefHierarchiePoste() {
      this.mode = 2;   
    }
    
    save() {
      // this.chefHierarchiePoste.codeChefHierarchiePoste = this.id;
      this.subscribeToSaveResponse(this.chefHierarchiePosteService.create(this.chefHierarchiePoste));
    }
    
    subscribeToSaveResponse(result: Observable<ChefHierarchiePoste>) {
      result.subscribe((res: ChefHierarchiePoste) => {
          // console.log(res);
          this.onSaveSuccess(res);
          }); 
    }
    
    close() {
      this.mode = 1;
    }
    
    private onSaveSuccess( result ) {
      this.eventManager.broadcast( { name: 'chefHierarchiePostesListModification'} );
      this.ngOnInit();
    }
    
    /****************************** Edition *************************************/
    editChefHierarchiePoste(chp: ChefHierarchiePoste) {
      this.mode = 3;
      this.chefHierarchiePosteService.find(chp).subscribe( (chefHierarchiePoste) => {
          this.chefHierarchiePoste = chefHierarchiePoste;
      });
      // this.edit();
    }
    
    edit() {
      this.chefHierarchiePosteService.delete(this.chefHierarchiePoste).subscribe( (response) => {
          this.eventManager.broadcast({name: 'chefHierarchiePostesListModification'});
      });
      this.subscribeToSaveResponse(this.chefHierarchiePosteService.create(this.chefHierarchiePoste));
    }

}
