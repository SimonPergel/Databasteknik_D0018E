import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual endpoint

  constructor (
    private http: HttpClient
  ) { }

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

  isProductSoldOut(cartID: number, productID :number): Promise<boolean> {
    return fetch(`http://localhost:5201/api/mycontroller/isProductSoldOut?cartID=${cartID}&productID=${productID}`)
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

  addProductQuantity(name: string, quantity: number) {
    fetch('http://localhost:5201/api/mycontroller/addproductquantity?name=' + name + '&plusQuantity=' + quantity)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }

  addNewProduct(productName: string, quantity: number, price: number) {
    fetch('http://localhost:5201/api/mycontroller/insertproduct?name=' + productName + '&quantity=' + quantity + '&inStock=1&price=' + price)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }

  deleteProduct(productID: number) {
    fetch('http://localhost:5201/api/mycontroller/deleteProduct?productID='+ productID)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //alert("Product deleted, refresh for new view")
      return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }

  alterProductPrice (productID:number, newPrice: number){
    if(newPrice < 0){
      alert("can't set a negative price")
    } else {
      fetch('http://localhost:5201/api/mycontroller/alterproductprice?productID='+ productID + '&newPrice=' + newPrice)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        //alert("productID " +productID + " has had it's price changed to " + newPrice)
        return response.json();
      })
      .then(data => console.log("API Response:", data))
      .catch(error => console.error("API call failed:", error));
    }
  }

  checkIfUserExists(username: string): Promise<boolean> {
    return fetch('http://localhost:5201/api/mycontroller/checkifuserexists?username='+username)
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

  checkIfEmailExists(email: string): Promise<boolean> {
    return fetch('http://localhost:5201/api/mycontroller/checkifemailexists?email='+email)
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

  createNewUser(email: string, username: string, password: string): Promise<void> {
    return fetch('http://localhost:5201/api/mycontroller/createauthentication?email=' + email + '&username=' + username + '&password=' + password)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }

  createNewProfile(userID: number, username: string): Promise<void> {
    return fetch('http://localhost:5201/api/mycontroller/insertuser?role=customer&balance=0&acctname=' + username + '&userInfo=' + userID)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }
}