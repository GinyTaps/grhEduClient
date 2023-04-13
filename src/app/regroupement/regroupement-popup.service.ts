import { Injectable, Component } from '@angular/core';
import { Regroupement } from './regroupement.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { RegroupementService } from './regroupement.service';

@Injectable()
export class RegroupementPopupService {

    private ngbModalRef: NgbModalRef;
    private isOpen = false;
    
    constructor(
            private datePipe: DatePipe,
            private modalService: NgbModal,
            private router: Router,
            private regroupementService: RegroupementService
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
                this.regroupementService.find(id).subscribe((regroupement) => {
                    this.ngbModalRef = this.regroupementModalRef(component, regroupement);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.regroupementModalRef(component, new Regroupement());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    regroupementModalRef(component: Component, regroupement: Regroupement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.regroupement = regroupement;
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
