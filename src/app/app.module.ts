import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // AppComponent
  ],
  imports: [
    // BrowserModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
