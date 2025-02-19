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

  //Database Editing Methods

  insertProduct(Name: string, Quantity: number, InStock: Number, Price: number): Observable<any> {
    const product = { Name, Quantity, InStock, Price };
    console.log("babababa");
    return this.http.put<any>(`${this.apiUrl}/insertproduct`, product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }


}
