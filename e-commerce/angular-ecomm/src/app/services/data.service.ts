import { booleanAttribute, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.models';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.models';

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
  

isProductSoldOut(cartID: number): Promise<boolean> {
    return fetch(`http://localhost:5201/api/mycontroller/isProductSoldOut?cartID=${cartID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return data.Message === "Cart is empty!";
        })
        .catch(error => {
            console.error("Error checking cart:", error);
            return false; // Default to false in case of an error
        });
}



checkProductAvailability(productID: number, desiredQuantity: number): Promise<boolean> {
  return fetch('http://localhost:5201/api/mycontroller/checkProductAvailability?productID=' + productID + '&desiredQuantity=' + desiredQuantity)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then((data: boolean) => {
          return data
      })
      .catch(error => {
          console.error("Error checking cart:", error);
          return false; // Default to false in case of an error
      });
}
  //Database Editing Methods


depleteStockQuantity( productID: number, minusQuantity: number){      //MIGHT NOT BE NEEDED IN THIS SCOPE
  fetch('http://localhost:5201/api/mycontroller/depleteStockQuantity?productID='+productID+'&minusQuantity='+ minusQuantity)
  .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log("API Response:", data))
  .catch(error => console.error("API call failed:", error));
} 
cartCheckout(cartID: number, productID: number, desiredQuantity: number){
  fetch('http://localhost:5201/api/mycontroller/cartcheckout?cartID='+cartID+'&productID='+productID +'&desiredQuantity='+desiredQuantity)
  .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log("API Response:", data))
  .catch(error => console.error("API call failed:", error));

}
  checkAdmin(id: number): Promise<boolean> {
    return fetch('http://localhost:5201/api/mycontroller/checkadmin?UserID='+id)
    .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: boolean) => {
      return data
    })
    .catch(error => {
      console.error("API call failed:", error)
      return false;
    });
  }
}
