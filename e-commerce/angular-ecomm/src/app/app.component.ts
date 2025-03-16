import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterOutlet],
  template: ` 
  
  <app-header />
  <router-outlet />
  <!-- <app-json-1 /> -->
  ` ,
  styles: ``,
})
export class AppComponent {
  //title = signal('angular-ecomm');
}
