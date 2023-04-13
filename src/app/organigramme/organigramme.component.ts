import { Component, OnInit, Input, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { Employe } from '../employe/employe.model';
import { EmployeService } from '../employe/employe.service';
import { TypeSexeService } from '../type-sexe/type-sexe.service';
import { TypeNationaliteService } from '../type-nationalite/type-nationalite.service';
import { TypeNationalite } from '../type-nationalite/type-nationalite.model';
import { TypeSexe } from '../type-sexe/type-sexe.model';
import { Organigramme } from './organigramme.model';
import { OrganigrammeService } from './organigramme.service';
// import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

@Component({
  selector: 'app-organigramme',
  templateUrl: './organigramme.html',
  styleUrls: ['./organigramme.component.css'],
  providers: []
})

export class OrganigrammeComponent implements OnInit {
    
   /* data: any[] = [ {id:'first', children: Array(Employe)}];*/ /*=[
           id: "first",
           children: Employe[] /Array<Employe>()
           ]*/

    @Input() data: Array<Organigramme> = [];
    @Input() remoteData: boolean = false;
    @Output() onClickNode: EventEmitter<Organigramme> = new EventEmitter()
    @Output() onDragNode: EventEmitter<any> = new EventEmitter()
    
    /**************** ng-organization-chart-list ************************/
    @Input() nodeList: Array<Organigramme> =[];
    
    
    /**************** ng-organization-chart-node ************************/
    @Input() node: Organigramme

    private childrenStyleClass: string = "horizontal"
    private isChildrenVisible: boolean = true;
    
      
    
    /*@Input() node: Array<Organigramme> = [];
    @Output() onClickNode: EventEmitter<Organigramme> = new EventEmitter()
    @Output() onDragNode: EventEmitter<any> = new EventEmitter()*/
    
    /*private childrenStyleClass: string = "horizontal"
    private isChildrenVisible: boolean = true;*/
    
    /*orgChartCollapsed: boolean;
    show: boolean;
    niveau: number;
    fst: boolean;
    details: boolean;
    employe: Employe = new Employe();
    employes: Employe;
    organigramme: Organigramme;
    typeNationalites: TypeNationalite;
    typeSexes: TypeSexe;*/
    
    /*orgChart: GoogleChartInterface = {
            chartType: 'OrgChart',
            dataTable: [
              ['Name',   'Manager', 'Tooltip'],
              [{v: 'Mike', f: 'Mike<div style='color:red; font-style:italic'>President</div>'}, '', 'The President'],
              [{v: 'Jim', f: 'Jim<div style='color:red; font-style:italic'>Vice President</div>'}, 'Mike', 'VP'],
              ['Alice', 'Mike', ''],
              ['Bob', 'Jim', 'Bob Sponge'],
              ['Carol', 'Bob', '']
            ],
            options: {
              allowHtml: true,
              allowCollapse: true
            }
          };*/
    
    constructor(
            private employeService: EmployeService,
            private typeNationaliteService: TypeNationaliteService,
            private typeSexeService: TypeSexeService,
            private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }
          
    ngOnInit() {
        /*this.organigramme.children = Array(this.employes);
        this.niveau = 0;
        this.show = false;
        this.fst = false;
        this.details = false;*/
        // this.orgChartCollapsed = false;
        //this.orgChartCollapsed = true;
        // this.collapseOrgChart();
        
        // this.load(1);
    }
    
    onClickDeepNode(node) {
        this.onClickNode.emit(node);
      }

      onDragDeepNode(transfer) {
        this.onDragNode.emit(transfer)
      }
    
    /*clickNode(node) {
        this.onClickNode.emit(node);
        console.log(node.id +'sélectionné');
      }
    
    dragNode(transfer) {
            let helper = new OrganigrammeService(this.data);
            helper.moveNode(transfer.node.id, transfer.destination.id);
            let data = helper.getData();
            this.data = data
      }*/
  
      /**************** ng-organization-chart ************************/
      
    clickNode(node) {
        this.onClickNode.emit(node);
      }
    
    dragNode(transfer) {
        this.onDragNode.emit(transfer)
      }
    
    /**************** ng-organization-chart-node ************************/
    
    changeChildrenStyleToVertical() {
        this.childrenStyleClass = "vertical"
      }

      changeChildrenStyleToHorizontal() {
        this.childrenStyleClass = "horizontal"
      }

      hideChildren() {
        this.isChildrenVisible = false;
      }
    
    /*dropNode(event) {
        let transfer = {
          node: event.dragData,
          destination: this.node
        }
        this.onDragNode.emit(transfer)
      }*/
    
    /*load(id) {
        this.employeService.find( id ).subscribe(employe => {
            this.employes = employe;
        });
        
        this.typeNationaliteService.getAll().subscribe(data => {
            this.typeNationalites = data; 
            });
    
    this.typeSexeService.getAll().subscribe(data => {
            this.typeSexes = data; 
            });
    }*/
        
    /*add() {
        // this.show = true;
        this.fst = true;
        this.niveau = 1;*/
        
        /*for(var n=1; n++ ) {
            switch(n) {
            case(n = 1): {
                this.niveau = n;
                break;
            }
            default: {
                this.niveau = 0;
            }
            
            }
    }*/
        
        // return this.niveau = true;
        // return this.show = 1;
        
    /*}
    
    remove() {
        return this.niveau = 0;
        // this.show = false;
        // return this.show = 0;
    }
    
    showDetails(id) {
        this.details = true;
        this.load(id);
    }
    
    close() {
        this.details = false;
    }*/
           
    /*public collapseOrgChart() {
        this.orgChartCollapsed = !this.orgChartCollapsed;
        const orgChartWrapper = this.orgChart.component.wrapper;
        orgChartWrapper.getChart().collapse(0, this.orgChartCollapsed);
        }*/
          
}