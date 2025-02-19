import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
//import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-json-1',
  imports: [CommonModule],
  templateUrl: './json-1.component.html',
  styleUrl: './json-1.component.css'  
})
export class json1component implements OnInit {
  data: any;

  constructor(
    private dataService: DataService,
    private http: HttpClient  // Inject HttpClient via constructor
  ) {}

  ngOnInit(): void {
    this.dataService.getProductsAdmin().subscribe(response => {
      this.data = response;
      return this.data;
    }, error => {
      console.error('Error fetching data:', error);
    });
  }
}
