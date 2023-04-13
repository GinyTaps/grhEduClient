import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { EmployeService } from './employe.service';
import { Employe } from './employe.model';

@Injectable()
export class EmployePopupService {

private ngbModalRef: NgbModalRef;
private isOpen = false;

  constructor(
      private datePipe: DatePipe,
      private modalService: NgbModal,
      private router: Router,
      private employeService: EmployeService
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
                this.employeService.find(id).subscribe((employe) => {
                    employe.dateNaissEmploye = this.datePipe
                        .transform(employe.dateNaissEmploye, 'yyyy-MM-dd');
                    employe.dateCinEmploye = this.datePipe
                        .transform(employe.dateCinEmploye, 'yyyy-MM-dd');
                    employe.dateEngEmploye = this.datePipe
                        .transform(employe.dateEngEmploye, 'yyyy-MM-dd');
                    employe.dateTitEmploye = this.datePipe
                        .transform(employe.dateTitEmploye, 'yyyy-MM-dd');
                    this.ngbModalRef = this.employeModalRef(component, employe);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeModalRef(component, new Employe());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    employeModalRef(component: Component, employe: Employe): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employe = employe;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }

  /* open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if ( id ) {
            console.log( '@@@@@@@@@@@@@' + id + '@@@@@@@@@@' );
            this.employeService.find(id).subscribe((employe) => {
                console.log( '@@@@@@@@@@@@@' + employe + '@@@@@@@@@@' );
                employe.dateNaissEmploye = this.datePipe
                        .transform(employe.dateNaissEmploye, 'yyyy-MM-dd');
                    employe.dateCinEmploye = this.datePipe
                        .transform(employe.dateCinEmploye, 'yyyy-MM-dd');
                    employe.dateEngEmploye = this.datePipe
                        .transform(employe.dateEngEmploye, 'yyyy-MM-dd');
                    employe.dateTitEmploye = this.datePipe
                        .transform(employe.dateTitEmploye, 'yyyy-MM-dd');
                    this.employeModalRef(component, employe);
                 } );
        } else {
            return  this.employeModalRef(component, new Employe());
        }
    }

    employeModalRef(component: Component, employe: Employe): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employe = employe;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
   */

}
