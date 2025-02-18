import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { ProductsListComponent } from "./pages/products-list/products-list.component";


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  template: ` 
  
  <app-header />
  <router-outlet />
  ` ,
  styles: ``,
})
export class AppComponent {
  //title = signal('angular-ecomm');
}
