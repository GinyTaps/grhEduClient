import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
    
    private resourceVisaUrl = 'http://localhost:8089/api/charge';
    private resourceOrangeUrl = 'http://localhost:8089/api/createPaymentViaOrange';
    
    customer: Customer;


  constructor(
          private http: HttpClient,
          ) 
          { }
  
  chargeCard(t: string, a: number) {
      const headers = new HttpHeaders({'token': t, 'amount': a.toString()});
      return this.http.post(this.resourceVisaUrl , {}, {headers: headers});
    }
  
  orangeMoney(custom: Customer) { 
      return this.http.post(this.resourceOrangeUrl, custom, {observe: 'response'}); 
  }
}

export class Customer {
    constructor(
            public customer_msisdn?: number,
            public amount?: number,
            public otp?: number
        ) {

        }
}

export class Card {
    cardNumber: number;
    expMonth: number;
    expYear: number;
    cvc: number;
    amount: number;
}
