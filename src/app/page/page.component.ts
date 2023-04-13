import { Component, OnInit } from '@angular/core';
import { Page } from './page.model';
import { PageService } from './page.service';
import { EventManagerService } from '../event-manager.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TypeMethodeAutorise } from '../type-methode-autorise/type-methode-autorise.model';
import { TypeMethodeAutoriseService } from '../type-methode-autorise/type-methode-autorise.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    page: Page = new Page();
    pages: Page; // [] = new Array();
    privileges: TypeMethodeAutorise; // []; // = new Array(); 
    // privileges: any[] = [{id:2, nom:'En lecture'}, {id:3, nom:'En écriture'}];
    radioSelected: number;
    mode: number;
    p: number = 1; // pour la pagination
    header: string;


    constructor(
      private pageService: PageService,
      private privilegeService: TypeMethodeAutoriseService,
      private eventManager: EventManagerService,
      private router: Router
    ) { }

  ngOnInit() {
      this.mode = 1;
      this.pageService.getAll().subscribe(data => {
          // this.pages = Array(data);
          this.pages = data;
          // console.log(this.pages);
      })
      
      /*this.privilegeService.getAll().subscribe(data => {
          this.privileges = data;
      })*/
  }
  
  /*onItemChange(p) {
      console.log(p);
      this.page.privilege = this.radioSelected;
      console.log(this.page.privilege);
      // this.page.privilege = +this.privileges.find(Item => Item.idTypeMethodeAutorise === this.radioSelected);
  }*/
  
  savePage() {
      this.mode = 2;
      this.page = new Page;
      this.header = 'Créer une page';
  }
  
  close() {
      this.mode = 1;
  }
  
  save() {
      // console.log(this.page.privilege);
      this.subscribeToSaveResponse(this.pageService.create(this.page));
  }
  
  editPage(p:Page) {
      this.mode = 3;
      this.header = 'Editer une page';
      this.pageService.find(p.idPage).subscribe(data => {
          this.page = data;
          // console.log(this.page);
      })
  }
  
  edit() {
      this.subscribeToSaveResponse(this.pageService.update(this.page));
  }
  
  deletePage(p) {
      this.subscribeToSaveResponse(this.pageService.delete(p));
  }
  
  subscribeToSaveResponse(result: Observable<Page>) {
      result.subscribe((res: Page) => {
          this.onSaveSuccess(res);
      });
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'pageListModification'} );
        this.ngOnInit();
        // this.router.navigateByUrl('/page');
    }

}
