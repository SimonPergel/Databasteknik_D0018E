import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { ProductCardComponent } from '../pages/products-list/product-card/product-card.component';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual endpoint

  constructor(private http: HttpClient) { }
    carts: Cart []=[]
    //OBSERVER METHODS
    //cart = signal<Product[]>([]);
    cart = signal<Cart[]>([]);
    
    

  insertIntoCart(cartID: number, quantity: number, product: Product) {
   // console.log('Product Object:', product); //  to debug
    // Create a Cart object using the Cart interface
    const cartItem: Cart = {
      ProductName: product.name,
      cartID: cartID,               // The cart ID you pass to the method
      productID: product.id, // The product ID from the Cart object
      quantity: quantity,           // Quantity passed to the method
      price: product.price,         // Price from the Cart object
      purchaseID: 0,                // Set to 0 or a default value if not available
      inStock: product.inStock      // is the product in the cart avalible
  };
    this.cart.set([...this.cart(), cartItem]);
    fetch('http://localhost:5201/api/mycontroller/insertintocart?cartID='+cartID+'&productID='+product.id+'&quantity='+quantity+'&price='+product.price)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }
  
  async deleteFromCart(productID: number) {

    // get the current cart items
    const cartItems = this.cart();
    // this finds the index of the first occurence of the product with the given id
    const index = cartItems.findIndex((p) => p.productID == productID);
   // this.cart.set(this.cart().filter((p) => p.id !== id));
   if ( index !== -1) {
    //removes only one item thats found at the given index. 
    cartItems.splice(index, 1);
    //updates the cart with the modified 
    this.cart.set(cartItems);
    await this.getCarts(productID);
    fetch('http://localhost:5201/api/mycontroller/deletefromcart?purchaseID='+this.carts[0].purchaseID) 
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

  async emtyCart(cartID: number) {
    // get the current cart items
    const cartItems = this.cart();
    await this.getCarts(cartID);
    fetch('http://localhost:5201/api/mycontroller/emtyCart?CartID='+cartID)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }
  
  
/*
  cartCheckout(cartID: number, id: number): Promise<void>{
    // Creates the Payload form
    const requestPayload = {
      cartId: cartID,
      productId: id 
    };

    return fetch('http://localhost:5201/api/mycontroller/cartCheckout', {
      method: 'PUT',  // HTTP method must be PUT based on your API
      headers: {
        'Content-Type': 'application/json'  // Sending data as JSON
      },
      body: JSON.stringify(requestPayload)  // Converting the object to JSON string
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }
*/
cartCheckout(cartID: number, totalprice: number, purchasedGoods: string){
  fetch('http://localhost:5201/api/mycontroller/cartCheckout?cartID='+cartID+'&totalPrice='+totalprice+'&purchasedGoods='+purchasedGoods)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return;
  })
  .then(data => console.log("API Response:", data))
  .catch(error => console.error("API call failed:", error));

}

  updateCarts(cartID: number, product: Product) {
    fetch('http://localhost:5201/api/mycontroller/updatecarts?cartID='+cartID+'&productID='+product.id+'&quantity='+product.quantity+'&price='+product.price)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }

  getCarts(productID: number): Promise<void> {
    return fetch('http://localhost:5201/api/mycontroller/getcarts?productid='+productID)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      this.carts = data
      localStorage.setItem("myData", this.carts[0].purchaseID.toString());
      console.log(localStorage.getItem("myData")); // "Hello, Angular!"
    })
    .catch(error => console.error("API call failed:", error));
  }
}
