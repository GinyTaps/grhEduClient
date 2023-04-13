import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginPopupService } from './login-popup.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { User } from '../user/user.model';
import { EventManagerService } from '../event-manager.service';
import { Observable } from 'rxjs';
import { GroupePageService } from '../groupe-page/groupe-page.service';
import { GroupePage } from '../groupe-page/groupe-page.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    routeSub: any;
    modalRef: NgbModalRef;
    recover_key: boolean = false;
    key_step: boolean = false;
    email_sent: boolean = false;
    email_valid: boolean = false;
    groupePages: GroupePage;
    public groupePagesL: GroupePage;
    authorityRes: boolean;
username: string; password: string;

    user:User = new User();
    users:User;
    check: boolean;

    keyForm = new FormGroup({
      code: new FormControl('', Validators.required),
      newpass: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confpass: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', Validators.email)
    });
  constructor(
          private groupePageService: GroupePageService,
          private loginService: LoginService,
          private loginPopupService: LoginPopupService,
          private eventManager: EventManagerService,
          private authService: AuthService,
          private router: Router,
          public activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
	this.key_step = true;

  }

isAuthenticated() {
  // console.log('*********** Login **********');
  if(localStorage.length > 0) {
    return (localStorage.getItem('Groupes').indexOf('STAFF') >= 0 || localStorage.getItem('Groupes').indexOf('CUSTOMER') >= 0);
  }
  }

  previousState() {
      window.history.back();
      // this.location.back();
  }

  onLogin(d){
	// console.log('******** connexion en cours **********');
      this.loginService.login(d).subscribe( (res) => {
          let jwt = res.headers.get('Authorization');
          this.authService.saveToken(jwt);
          if(res.status == 200) {
				// console.log(res.status);
          		// this.router.navigateByUrl('home');
              this.router.navigate(['/home']);
              /*for(let g of this.authService.getGroupes()) {
                  this.groupePageService.getPages(g).subscribe( (res) => {
                      if(res.status == 200) {
                          this.grPages = res.body;*/

                          /*this.groupePageService.getAll().subscribe( (data) => {
                              this.groupePages = data;
                              this.hasAuthority(this.groupePages);*/

                              /*console.log(this.groupePages);
                              return this.groupePages;*/
                          // });
                      }
						else{
							console.log(res.status);
						}
                  /*});
              }*/

              // récupérer les données concernant les droits d'accès dès le démarrage de l'application ici
              /*this.groupePageService.getAll().subscribe( (data) => {
                  this.groupePages = data;
                  console.log(this.groupePages);
              });
              return this.groupePages;*/
            //}
          // }, err => {
      });
  }

  /******************* Gestion de l'accès des pages ********************/

  hasAuthority(groupeP: GroupePage) {
      this.groupePagesL = groupeP;
      // console.log(this.groupePagesL);
      /*for(let gp of Array(this.groupePagesL)) {
      // for(let gp of Array(groupeP)) {
          console.log(gp.groupe.nomGroupe);
          // if(this.groupePage.groupe.nomGroupe.match(this.groupes[0])){
          if(this.authService.getGroupes().includes(gp.groupe.nomGroupe)){
              // console.log(this.authService.getGroupes());
              this.authorityRes = true;
          } else {
              this.authorityRes =  false;
          }
      }
      console.log(this.authorityRes);
      return this.authorityRes;*/
  }

  /*isAuthorised() {
      console.log(this.groupePagesL);
      console.log(this.groupePagesL.groupe);
      for(var gp of Array(this.groupePagesL)) {
          console.log(gp.groupe.nomGroupe);
      // for(let i=0; i<Array(this.groupePagesL).length; i++) {
              // console.log(Array(this.groupePagesL)[i].groupe.nomGroupe);
              // if(this.groupePage.groupe.nomGroupe.match(this.groupes[0])){
          if(this.authService.getGroupes().includes(gp.groupe.nomGroupe)){
          // if(this.authService.getGroupes().includes(Array(this.groupePagesL)[i].groupe.nomGroupe)){
                  // console.log(this.authService.getGroupes());
                  this.authorityRes = true;
              } else {
                  this.authorityRes =  false;
              }
          }
          console.log(this.authorityRes);
          return this.authorityRes;
  }*/

  //user pass recovery step 1 show the section
  RecoverKey(){
    this.recover_key = !this.recover_key;
    this.email_sent = false;
  }

  CheckEmail(email: string): boolean{
    ////Request to check if the entered email is valid ---------------------------------------
    return true;
  }

  //user pass recovery step 2:: send email
  SendEmail(){
    this.email_valid = (this.keyForm.controls['email'].valid  && this.CheckEmail(this.keyForm.controls['email'].value));
    if(this.email_valid) {
        this.loginService.recupPass(this.user.email).subscribe(res => {
            if(res) {
                // console.log(res)
                this.email_sent = true;
            } else {
                this.email_sent = false;
            }
        });
        // console.log(this.email_sent);
        return this.email_sent; //  = this.check;

    /*if(this.email_valid){
      //Send email request here ------------------------------------------------
      console.log('Email sent!!!');
      this.email_sent = true;
    }*/
    }
  }

  //code sent to email. The users enterd the right key
  KeyStep(){
    //Checking key here -------------------------------------------------
    //this.key_step = this.authService.username === 'mykey'; //replace username by user code (sample)
    // this.key_step = this.keyForm.controls['code'].value === 'mykey';
      this.loginService.verifCode(this.user.email, this.user.renewPasswordCode).subscribe(data => {
          if(data) {
              this.key_step = this.keyForm.controls['code'].value === this.user.renewPasswordCode;
          } else {
              this.key_step = false;
          }
      });
  }

  //FINAL STEP ON PASSWORD RECOVERY
  changePass(){
    //checking that the two passwords aren't diffrent
    if(this.keyForm.controls['newpass'].value != this.keyForm.controls['confpass'].value)
      console.log('An error occured');

      else{
          this.loginService.reInitPass(this.user, this.keyForm.controls['confpass'].value,
                  this.keyForm.controls['email'].value, this.keyForm.controls['code'].value).subscribe(res => {
                      // console.log(res);
                      this.onSaveSuccess(res);
                  });
        console.log('password change success!');
        this.recover_key = !this.recover_key;
      }
  }

  subscribeToSaveResponse(result: Observable<User>) {
      result.subscribe((res: User) => {
          this.onSaveSuccess(res);
      });
    }
    private onSaveSuccess( result ) {
        this.eventManager.broadcast( { name: 'userListModification'} );
        // this.ngOnInit();
        this.router.navigateByUrl('/login');
    }

}


@Component({
    selector: 'app-login-popup',
    template: ''
})
export class LoginPopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    modalRef: NgbModalRef;

    constructor(
            private loginPopupService: LoginPopupService,
            public activatedRoute: ActivatedRoute
    ) {
  }

    ngOnInit() {
        // this.modalRef = this.loginPopupService.open();
        // open(LoginComponent as Component);
    }


    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
