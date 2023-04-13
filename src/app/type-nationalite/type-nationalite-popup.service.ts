import { Injectable, Component } from '@angular/core';
import { TypeNationalite } from './type-nationalite.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TypeNationaliteService } from './type-nationalite.service';

@Injectable()
export class TypeNationalitePopupService {

  private ngbModalRef: NgbModalRef;
  private isOpen = false;

  constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private typeNationaliteService: TypeNationaliteService
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
                // console.log('*##############Dans le popup numéro sélectionné: ' + id + '############');
                this.typeNationaliteService.find(id).subscribe((typeNationalite) => {
                    console.log('*##############Contenu de la ligne sélectionnée: ' + typeNationalite + '############');
                    this.ngbModalRef = this.typeNationaliteModalRef(component, typeNationalite);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.typeNationaliteModalRef(component, new TypeNationalite());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


  typeNationaliteModalRef(component: Component, typeNationalite: TypeNationalite): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.typeNationalite = typeNationalite;
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
