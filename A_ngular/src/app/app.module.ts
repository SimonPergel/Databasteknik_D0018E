import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { json1component } from './json-1/json-1.component';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import{ routes} from  './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    json1component  // Declare the component here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  // Include HttpClientModule
    RouterModule.forRoot(routes),  // Include RouterModule if you are using routing
    CommonModule,
    AppRoutingModule, 
  ],
  providers: [HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
