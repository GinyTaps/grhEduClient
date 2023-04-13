import { Injectable, Component } from '@angular/core';
import { TypeMotifConge } from './type-motif-conge.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TypeMotifCongeService } from './type-motif-conge.service';

@Injectable()
export class TypeMotifCongePopupService {

   private ngbModalRef: NgbModalRef;
   private isOpen = false;

   constructor(
           private datePipe: DatePipe,
           private modalService: NgbModal,
           private router: Router,
           private typeMotifCongeService: TypeMotifCongeService
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
                this.typeMotifCongeService.find(id).subscribe((typeMotifConge) => {
                    this.ngbModalRef = this.typeMotifCongeModalRef(component, typeMotifConge);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.typeMotifCongeModalRef(component, new TypeMotifConge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


  typeMotifCongeModalRef(component: Component, typeMotifConge: TypeMotifConge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.typeMotifConge = typeMotifConge;
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
