import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../data.service';
//import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    this.dataService.getData().subscribe(response => {
      this.data = response;
    }, error => {
      console.error('Error fetching data:', error);
    });
  }
}
