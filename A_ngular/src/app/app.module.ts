import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { json1component } from './json-1/json-1.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    json1component  // Declare the component here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Include HttpClientModule
    RouterModule.forRoot(Routes),  // Include RouterModule if you are using routing
    CommonModule,
    AppRoutingModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
