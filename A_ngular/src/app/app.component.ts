import { Component } from '@angular/core';
import { DataService } from './data.service';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { json1component } from './json-1/json-1.component';
import { Router } from 'express';

@Component({
  selector: 'app-root',
  imports: [json1component], // Add Json1Component and HttpClientModule
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'A_ngular';
}
