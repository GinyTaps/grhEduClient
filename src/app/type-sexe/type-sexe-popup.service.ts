import { Injectable, Component } from '@angular/core';
import { TypeSexe } from './type-sexe.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TypeSexeService } from './type-sexe.service';

@Injectable()
export class TypeSexePopupService {

  private ngbModalRef: NgbModalRef;
  private isOpen = false;

  constructor(
      private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private typeSexeService: TypeSexeService
  ) {
    this.ngbModalRef = null;
  }

  open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (Number(id)) {
                this.typeSexeService.find(id).subscribe((typeSexe) => {
                    this.ngbModalRef = this.employeModalRef(component, typeSexe);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeModalRef(component, new TypeSexe());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    employeModalRef(component: Component, typeSexe: TypeSexe): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.typeSexe = typeSexe;
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
