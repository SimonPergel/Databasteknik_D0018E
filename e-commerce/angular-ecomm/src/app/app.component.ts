import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { ProductsListComponent } from "./pages/products-list/products-list.component";
import { json1component } from './components/json-1/json-1.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet, json1component],
  template: ` 
  
  <app-header />
  <router-outlet />
  <app-json-1 />
  ` ,
  styles: ``,
})
export class AppComponent {
  //title = signal('angular-ecomm');
}
