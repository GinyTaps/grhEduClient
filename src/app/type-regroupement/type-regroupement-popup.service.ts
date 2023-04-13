import { Injectable, Component } from '@angular/core';
import { TypeRegroupement } from './type-regroupement.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TypeRegroupementService } from './type-regroupement.service';

@Injectable()
export class TypeRegroupementPopupService {

    private ngbModalRef: NgbModalRef;
    private isOpen = false;
    
    constructor(
            private datePipe: DatePipe,
            private modalService: NgbModal,
            private router: Router,
            private typeRegroupementService: TypeRegroupementService
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
                this.typeRegroupementService.find(id).subscribe((typeRegroupement) => {
                    this.ngbModalRef = this.typeRegroupementModalRef(component, typeRegroupement);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.typeRegroupementModalRef(component, new TypeRegroupement());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }
    
    
    typeRegroupementModalRef(component: Component, typeRegroupement: TypeRegroupement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.typeRegroupement = typeRegroupement;
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
