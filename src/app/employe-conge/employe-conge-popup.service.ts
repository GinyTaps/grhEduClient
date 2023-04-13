import { Injectable, Component } from '@angular/core';
import { EmployeCongeService } from './employe-conge.service';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeConge } from './employe-conge.model';

@Injectable()
export class EmployeCongePopupService {

    private ngbModalRef: NgbModalRef;
    private isOpen = false;
    dateOld: String = null;
    typeCongeOld: number = 0;
    employeOld: number = 0;
    employeConge: EmployeConge;
    employeCongeT: EmployeConge;

  constructor(
      private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private employeCongeService: EmployeCongeService
  ) {
    this.ngbModalRef = null;
  }

  
  open(component: Component, id?: number | any, d?: string): Promise<NgbModalRef> {
      this.dateOld = d;
      this.employeOld = id;
      /*console.log('********** Code du congé de la ligne récupéré dans le service : ' + this.typeCongeOld + ' *******');
      console.log('********** Date de la ligne récupérée dans le service: ' + this.dateOld + ' *******');*/
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id && d) {
                this.employeConge.id.codeEmploye = id;
                this.employeConge.id.dateDebutConge = d;
                this.employeCongeT = this.employeConge;
                this.employeCongeService.find(this.employeCongeT).subscribe((employeConge) => {
                    /*employeConge.id.codeEmploye = Number(employeConge.id.codeEmploye);
                    employeConge.id.codeTypeMotifConge = Number(employeConge.id.codeTypeMotifConge);*/
                    employeConge.id.dateDebutConge = this.datePipe
                        .transform(employeConge.id.dateDebutConge, 'yyyy-MM-dd');
                    employeConge.dateFinConge = this.datePipe
                        .transform(employeConge.dateFinConge, 'yyyy-MM-dd');
                    this.ngbModalRef = this.employeModalRef(component, employeConge);
                    resolve(this.ngbModalRef);
                    this.typeCongeOld = + employeConge.id.codeTypeMotifConge;
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeModalRef(component, new EmployeConge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    employeModalRef(component: Component, employeConge: EmployeConge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employeConge = employeConge;
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
