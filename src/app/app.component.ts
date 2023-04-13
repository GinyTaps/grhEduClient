import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { GroupePageService } from './groupe-page/groupe-page.service';
import { GroupePage } from './groupe-page/groupe-page.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbTooltipConfig]
})
export class AppComponent {

  title = 'GRH';
  isNavbarCollapsed: boolean;
  display: boolean = false;

  constructor(
          private router: Router,
          private authService: AuthService
  ) {
      this.isNavbarCollapsed = true;

  }

  ngOnInit() {
      // this.display = false;
    // this.isNavbarCollapsed = true;
    if(this.isAuthenticated()) {
      this.router.navigate(['/home']);
      this.authService.loadToken();
    } else {
      this.router.navigate(['/login']);
      localStorage.clear();
    }
  }

  isAuthenticated() {
      this.display = true;
    // console.log('*********** Login **********');
    if(localStorage.length > 0) {
      return (localStorage.getItem('Groupes').indexOf('STAFF') >= 0 || localStorage.getItem('Groupes').indexOf('CUSTOMER') >= 0);
    }
		// console.log('*********** Login **********');
		/*if(this.authService.isAuthenticated() || this.authService.jwtToken) {
			return true; // this.authService.isAuthenticated();
		}
	    else {
			return false;
		}*/
  }

}
