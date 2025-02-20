import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual endpoint

  constructor(private http: HttpClient) { }

    //OBSERVER METHODS

  getProductsAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getproductsadmin`);
  }

  getProductsUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getproductsuser`);
  }

  getRunning(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/running`);
  }

  depleteStockQuantity(Name: string, minusQuantity: number): Observable<any> {
    const sale = { Name, minusQuantity };
    console.log("babababa");
    return this.http.put<any>(`${this.apiUrl}/depleteStockQuantity`, sale, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  //Database Editing Methods

}
