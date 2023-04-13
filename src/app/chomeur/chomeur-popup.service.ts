import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ChomeurService } from './chomeur.service';
import { Chomeur } from './chomeur.model';

@Injectable()
export class ChomeurPopupService {

private ngbModalRef: NgbModalRef;
private isOpen = false;

  constructor(
          private datePipe: DatePipe,
          private modalService: NgbModal,
          private router: Router,
          private chomeurService: ChomeurService
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
              this.chomeurService.find(id).subscribe((chomeur) => {
                  chomeur.dateNaissChomeur= this.datePipe
                  .transform(chomeur.dateNaissChomeur, 'yyyy-MM-dd');
                  chomeur.dateCinChomeur = this.datePipe
                      .transform(chomeur.dateCinChomeur, 'yyyy-MM-dd');
                  this.ngbModalRef = this.chomeurModalRef(component, chomeur);
                  resolve(this.ngbModalRef);
              });
          } else {
              // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
              setTimeout(() => {
                  this.ngbModalRef = this.chomeurModalRef(component, new Chomeur());
                  resolve(this.ngbModalRef);
              }, 0);
          }
      });
  }


  chomeurModalRef(component: Component, chomeur: Chomeur): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
      modalRef.componentInstance.chomeur = chomeur;
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
