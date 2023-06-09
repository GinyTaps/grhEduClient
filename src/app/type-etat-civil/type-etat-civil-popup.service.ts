import { Injectable, Component } from '@angular/core';
import { TypeEtatCivil } from './type-etat-civil.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TypeEtatCivilService } from './type-etat-civil.service';

@Injectable()
export class TypeEtatCivilPopupService {

    private ngbModalRef: NgbModalRef;
    private isOpen = false;
    
    constructor(
             private datePipe: DatePipe,
             private modalService: NgbModal,
             private router: Router,
             private typeEtatCivilService: TypeEtatCivilService
        ) {
         this.ngbModalRef = null;
        }
    
    open(component: Component, id?: number | any): Promise<NgbModalRef> {
         return new Promise<NgbModalRef>((resolve, reject) => {
             const isOpen = this.ngbModalRef !== null;
             if (isOpen) {
                 resolve(this.ngbModalRef);
             }
    
             if (id) {
                 this.typeEtatCivilService.find(id).subscribe((typeEtatCivil) => {
                     this.ngbModalRef = this.typeEtatCivilModalRef(component, typeEtatCivil);
                     resolve(this.ngbModalRef);
                 });
             } else {
                 // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                 setTimeout(() => {
                     this.ngbModalRef = this.typeEtatCivilModalRef(component, new TypeEtatCivil());
                     resolve(this.ngbModalRef);
                 }, 0);
             }
         });
     }
    
    
    typeEtatCivilModalRef(component: Component, typeEtatCivil: TypeEtatCivil): NgbModalRef {
         const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
         modalRef.componentInstance.typeEtatCivil = typeEtatCivil;
         modalRef.result.then((result) => {
             this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
             this.ngbModalRef = null;
         }, (reason) => {
             this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
             this.ngbModalRef = null;
         });
         return modalRef;
     }
}
