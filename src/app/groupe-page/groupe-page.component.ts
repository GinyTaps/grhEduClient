import { Component, OnInit } from '@angular/core';
import { EventManagerService } from '../event-manager.service';
import { Router } from '@angular/router';
import { GroupePage, Droit } from '../groupe-page/groupe-page.model';
import { Profile } from '../profile/profile.model';
import { Page } from '../page/page.model';
import { TypeMethodeAutorise } from '../type-methode-autorise/type-methode-autorise.model';
import { GroupePageService } from '../groupe-page/groupe-page.service';
import { ProfileService } from '../profile/profile.service';
import { PageService } from '../page/page.service';
import { TypeMethodeAutoriseService } from '../type-methode-autorise/type-methode-autorise.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-groupe-page',
  templateUrl: './groupe-page.component.html',
  styleUrls: ['./groupe-page.component.css']
})
export class GroupePageComponent implements OnInit {

    groupePage: GroupePage = new GroupePage();
    groupeP: GroupePage;
    groupePages: GroupePage; //[] = new Array();
    // droits: Array<Droit> = [];
    groupes: Profile;
    groupe: Profile = new Profile();
    page: Page;
    pages: Page;
    typeMethodeAutorises: TypeMethodeAutorise;
    g: Profile;
    pa: Page;
    t: TypeMethodeAutorise;
    mode: number;
    p: number  = 1; // pour la pagination
    header: string;
    priv = this.pages; //pour gérer automatiquement la méthode autorisée pour chaque page
    regroupFilter: any = [{idGroupe: 0}, {idGroupe:0, nomGroupe: null}];
    
    
    constructor(
        private groupePageService: GroupePageService,
        private groupeService: ProfileService,
        private pageService: PageService,
        private typeMethodeAutoriseService: TypeMethodeAutoriseService,
        private eventManager: EventManagerService,
        private router: Router
        
    ) { }
    
    ngOnInit() {
        this.mode = 1;
        this.loadAll();
        // this.registerChangeInGroupePages();
        // console.log("Affichage ok");
    }
    
    registerChangeInGroupePages() {
        this.eventManager.subscribe( 'groupePageListModification', ( response ) => this.loadAll() );
    }
    
    loadAll() {
        this.groupeService.getAll().subscribe( data => {
            this.groupes = data;
        } );
    
        this.pageService.getAll().subscribe( data => {
            this.pages = data;
        } );
    
        this.typeMethodeAutoriseService.getAll().subscribe( data => {
            this.typeMethodeAutorises = data;
        } );
        
        this.groupePageService.getAll().subscribe(data => {
            this.groupeP = data;
            // console.log(this.groupeP);
        });
        /*this.groupePageService.getAllT().subscribe( item => {
            this.groupeP = item;
            console.log(this.groupeP);
				item.forEach(data => {
					let gp = new GroupePage();
					let pr = new Profile();
					let id = data[0];
					
					pr.idGroupe = data[1]['idGroupe'];
					pr.nomGroupe = data[1]['nomGroupe'];
					
					let pg = new Page();
					pg.idPage = data[2]['idPage'];
					pg.nomPage = data[2]['nomPage'];
					pg.url = data[2]['url']

					let mt = new TypeMethodeAutorise();
					mt.idTypeMethodeAutorise = data[3]['idTypeMethodeAutorise'];
					mt.nomTypeMethodeAutorise = data[3]['nomTypeMethodeAutorise'];
					mt.ordreTypeMethodeAutorise = data[3]['ordreTypeMethodeAutorise'];

					gp.id = id;
					gp.groupe = pr;
					gp.page = pg;
					gp.typeMethodeAutorise = mt;

					this.groupePages.push(gp);

					// console.log(this.groupePages);
				});
        });*/
        
   }
    
    getGroupePage(g: Profile) {
        this.groupePageService.findByG(g.nomGroupe).subscribe(data =>{
            this.groupePages = data;
        });
    }
    
    load(g: GroupePage) {
        this.groupePageService.find(g).subscribe( data => {
            this.groupePage = data;
        });
    }
    
    saveGroupePage() {
        this.mode = 2;
        this.header = "Créer un droit d'accès";
        this.groupePage = new GroupePage;
        // this.load();
    }
    
    close() {
        this.mode = 1;
    }
    
    save() {
        // this.groupePage.id.idPage = this.priv.idPage.toString();
        // console.log(this.groupePage.id.idPage);
        if(this.groupePage.id.idPage != null) {
            this.pageService.find(+this.groupePage.id.idPage).subscribe(data => {
                this.page = data;
                // console.log(this.page);
                this.groupePage.id.idTypeMethodeAutorise = this.page.privilege.toString();
                // console.log(this.groupePage.id.idTypeMethodeAutorise);
                this.groupePageService.create(this.groupePage).subscribe(res => {
                    this.groupeService.findOne(+res.id.idGroupe).subscribe(data => {
                        this.groupePageService.findByG(data.nomGroupe).subscribe(data => {

                            this.mode = 1;
                            this.groupe.idGroupe = +res.id.idGroupe;
                            this.groupePages = data;
                        })
                    })
                });
            });
            // console.log(this.groupePage.id.idTypeMethodeAutorise);
        }
        
        // this.subscribeToSaveResponse( this.groupePageService.create(this.groupePage) );
    }
    
    editGroupePage(gp: GroupePage) {
        this.mode = 3;
        this.header = "Editer un droit d'accès";
        // console.log(gp);
        this.g = gp.groupe;
        this.pa = gp.page;
        this.t = gp.typeMethodeAutorise;
        this.load(gp);
    }
    edit() {
            
            this.groupePageService.delete (this.g, this.pa, this.t).subscribe(response => {
                this.eventManager.broadcast( { name: 'groupePageListModification' } );
                if(this.groupePage.id.idPage != null) {
                    this.pageService.find(+this.groupePage.id.idPage).subscribe(data => {
                        this.page = data;
                        this.groupePage.id.idTypeMethodeAutorise = this.page.privilege.toString();
                        // this.subscribeToSaveResponse(this.groupePageService.create(this.groupePage));
                        this.groupePageService.create(this.groupePage).subscribe(res => {
                            this.groupeService.findOne(+res.id.idGroupe).subscribe(data => {
                                this.groupePageService.findByG(data.nomGroupe).subscribe(data => {

                                    this.mode = 1;
                                    this.groupe.idGroupe = +res.id.idGroupe;
                                    this.groupePages = data;
                                })
                            })
                        });
                    });
                }
          });
        
    }
    
    deleteGroupePage(gp) {
        this.g = gp.groupe;
        this.pa = gp.page;
        this.t = gp.typeMethodeAutorise;
        this.load(gp);
        this.groupePageService.delete(this.g, this.pa, this.t).subscribe(res => {
            this.onSaveSuccess(res);
            this.groupePageService.getAll().subscribe(data => {
                this.groupePages = data;
            });
        });
    }
    delete() {
        this.subscribeToSaveResponse(this.groupePageService.delete(this.g, this.pa, this.t));
    }
    
    subscribeToSaveResponse( result: Observable<GroupePage> ) {
        result.subscribe(( res: GroupePage ) => {
            this.onSaveSuccess( res );
        } );
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'groupePageListModification' } );
        this.ngOnInit();
    }

}
