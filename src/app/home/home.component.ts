import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService, Customer, Card } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


    show: boolean;
    user: string;
    mode: boolean;
    hideV: boolean;
    hideO: boolean;
    statut: boolean;
    customer: Customer = new Customer();
    card: Card = new Card();
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvc: string;
    amount: number;
    message: string;
    errorCreditNumb: string;
    errorExpM: string;
    errorExpY: string;
    errorCvc: string;
    errorAmount: string;
    errorCustomer: string;
    errorOtp: string;
    errorCustAmount: string;


  constructor(
          private homeService: HomeService,
          private zone: NgZone,
          private router: Router,
          private authService: AuthService,
          private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.show = false;
      this.mode = false;
      /*this.hideV = false;
      this.hideO = false;*/
  }

isAuthenticated() {
    // console.log('*********** Login **********');
    if(localStorage.length > 0) {
      return (localStorage.getItem('Groupes').indexOf('STAFF') >= 0 || localStorage.getItem('Groupes').indexOf('CUSTOMER') >= 0);
    }
  }

  payWithVisa() {
      this.hideV = true;
  }
  payWithOrange() {
      this.hideO = true;
  }



  creditCard() {
      /*console.log(this.cardNumber);
      console.log(this.expMonth);
      console.log(this.expYear);
      console.log(this.cvc);
      console.log(this.amount);*/
      if(this.cardNumber.toString().length != 16) {
          this.mode = true;
          this.errorCreditNumb = 'Le numéro de la carte est incorrecte';

      } else if(this.expMonth.toString().length > 2) {
          this.mode = true;
          this.errorExpM = 'Ce champ doit contenir 2 caractères (11)';
      }
      else {
          if(this.expYear.toString().length != 4) {
              this.mode = true;
              this.errorExpY = 'Ce champ doit contenir 4 caractères (2019)';
          } else if( this.cvc.toString().length !=3) {
              this.mode = true;
              this.errorCvc = 'Ce champ doit comporter 3 caractères';
          } else {
              if( this.amount < 300) {
                  this.mode = true;
                  this.errorAmount = 'Le montant minimum autorisé est de 300';
              } else {
                  this.mode = false;
                  (<any>window).Stripe.card.createToken({
                      number: this.cardNumber,
                      exp_month: this.expMonth,
                      exp_year: this.expYear,
                      cvc: this.cvc
                    }, (status: number, response: any) => {
                        this.zone.run(() => {
                          // if (status === 200) {
                            let token = response.id;
                            this.homeService.chargeCard(token, this.amount).subscribe(result => {
                                console.log(result);
                                if(result.toString().match('succeeded')) {
                                    return this.statut = true;
                                } else {
                                    return this.statut = false;
                                }
                            });
                            if (status === 200 && this.statut) {
                            console.log(this.statut);
                            this.message = 'Payment effectué avec succès';
                            this.cardNumber = null;
                            this.expMonth = null;
                            this.expYear = null;
                            this.cvc = null;
                            this.amount = null;
                            this.hideV = false;
                          } else {
                              // console.log(response.error.message);
                              this.message = 'Echec du payment';
                            }
                         });
                    });
              }

          }
        }
    }

  orangeMoney() {
      /*console.log(this.customer.customer_msisdn);
      console.log(this.customer.amount);
      console.log(this.customer.otp);*/
      if(this.customer.customer_msisdn.toString().length != 8) {
          this.show = true;
          this.errorCustomer = 'Le numéro est incorrecte';
      } else if(this.customer.otp.toString().length != 6) {
          this.show = true;
          this.errorOtp = 'Le champ doit comporter 6 caractères';
      }
      else {
          if(this.customer.amount < 100) {
              this.show = true;
              this.errorCustAmount = 'Le montant minimun est de 100';
          } else {
              this.show = false;
              this.homeService.orangeMoney(this.customer).subscribe( res => {
                  console.log(res.status);
                  if(res.status == 200) {
                      return this.statut = true;
                      /*this.customer = null;
                      this.message = 'Payment réussi';
                      this.hideO = false;*/
                  } else {
                      return this.statut = false;
                      // this.message = 'Echec du payment';
                  }
              });
              console.log(this.statut);
              if(this.statut) {
                  this.customer = null;
                  this.message = 'Payment réussi';
                  this.hideO = false;
              } else {
                  this.message = 'Echec du payment';
              }
          }
      }

  }


  isUser() {
      return this.authService.isUser();
  }

  isAdmin() {
      return this.authService.isAdmin();
  }


}
