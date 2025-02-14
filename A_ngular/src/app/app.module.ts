import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { json1component } from './json-1/json-1.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    json1component  // Declare the component here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Include HttpClientModule
    RouterModule,  // Include RouterModule if you are using routing
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
