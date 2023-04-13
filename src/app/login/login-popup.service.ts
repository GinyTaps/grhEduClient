import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from "../login/login.component";

@Injectable({
  providedIn: 'root'
})
export class LoginPopupService {

    private ngbModalRef: NgbModalRef;
    private isOpen = false;

  constructor(
      private modalService: NgbModal,
      private router: Router
  ) {
    this.ngbModalRef = null;
  }
  
  open(component: Component): NgbModal {
      if (this.isOpen) {
          return;
      }
  /*open(): NgbModalRef {
      if (this.isOpen) {
          return;
      }
      this.isOpen = true;
      
      const modalRef = this.modalService.open(LoginComponent, {
          container: 'app-navbar'
      });
      modalRef.result.then((result) => {
          this.isOpen = false;
      }, (reason) => {
          this.isOpen = false;
      });
      
      return modalRef;*/
      
      // return this.ngbModalRef = this.loginModalRef(component);
      
      /*return new Promise<NgbModalRef>((resolve, reject) => {
          const isOpen = this.ngbModalRef !== null;
          if (isOpen) {
              resolve(this.ngbModalRef);
          }*/

              // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
          /*setTimeout(() => {
              this.ngbModalRef = this.loginModalRef(component);
              resolve(this.ngbModalRef);
              }, 0);
          });*/
  }


  loginModalRef(component: Component): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
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
