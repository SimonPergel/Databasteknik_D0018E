import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { ProductCardComponent } from '../pages/products-list/product-card/product-card.component';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.models';
import { userInfo } from '../models/userInfo.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Orders } from '../models/orders.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual endpoint

  cart = signal<Cart[]>([]);
  constructor(private http: HttpClient) {
    this.loadCart();
  }
  carts: Cart []=[]
  orders: Orders []=[]
  userInfos: userInfo []=[];
  signaluserInfo = signal<userInfo[]>([]);
  //OBSERVER METHODS
  //cart = signal<Product[]>([]);
  loadCart() {
    this.getCarts(Number(localStorage.getItem("token"))).then(() => {
      this.cart.set(this.carts);
    })
  }

  loadUserInfo() {
    this.getUserBalance(Number(localStorage.getItem("token"))).then(() => {
      this.signaluserInfo.set(this.userInfos);
    })
  }

  cartLength = computed(() => {
    return this.cart().length;
  });

  usersCart = (computed(() => {
    return [...this.cart().filter(item => item.cartID === Number(localStorage.getItem("token")))];
  }));

  getUserInfo = (computed(() => {
    return [...this.signaluserInfo().filter(item => item.UserID === Number(localStorage.getItem("token")))];
  }));

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
    await this.getProductFromCarts(productID);
    fetch('http://localhost:5201/api/mycontroller/deletefromcart?purchaseID='+this.carts[0].purchaseID) 
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
    await this.getCarts(Number(localStorage.getItem("token")));
    this.loadCart();
   } 
  }

  async emtyCart(cartID: number) {
    // get the current cart items
    const cartItems = this.cart();
    // setting the new length of the cart to zero
    cartItems.length = 0;
    // using splice to remove all items from index 0 to its emty
    cartItems.splice(0, cartItems.length)
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
    await this.getCarts(Number(localStorage.getItem("token")));
    this.loadCart();
  }
async depleteStockQuantity(productID: number, minusQuantity: number) {
  fetch('http://localhost:5201/api/mycontroller/depletestockquantity?productID='+productID+'&MinusQuantity='+minusQuantity)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return;
  })
  .then(data => console.log("API Response:", data))
  .catch(error => console.error("API call failed:", error));



}
  
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
  // updates the users balance after checkout
  updateUserBalance(UserID: number, totalPrice: number) {
    fetch('http://localhost:5201/api/mycontroller/updateUserBalance?User_id='+UserID+'&totalPrice='+totalPrice)
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
    return fetch('http://localhost:5201/api/mycontroller/getcarts?UserID='+productID)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      this.carts = data
    })
    .catch(error => console.error("API call failed:", error));
  }

  // this function updates the inStock status if the quantity becomes zero
  updateStockStatus(name: string){
    fetch('http://localhost:5201/api/mycontroller/removeproduct?name='+name)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }
  // gets the current status of the products for checkout purpose
  getProduct():Promise<Product[]> {
    return fetch('http://localhost:5201/api/mycontroller/getproductsadmin')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data: Product[]) => { 
      console.log("Received products:", data);
      return data;  // Now always returning Product[]
  })
  .catch(error => {
      console.error("API call failed:", error);
      return [];  // Return an empty array to match expected return type
  });
}

// gets all the orders from the checkout table
getOrders(CartID: number):Promise<Orders[]> {
  return fetch('http://localhost:5201/api/mycontroller/getorders?UserID='+CartID)
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  })
  .then((data: Orders[]) => { 
    console.log("Received order history:", data);
    return data; 
})
.catch(error => {
    console.error("API call failed:", error);
    return [];  // Return an empty array to match expected return type
});
}


  getProductFromCarts(productID: number): Promise<void> {
    return fetch('http://localhost:5201/api/mycontroller/getproductfromcarts?ProductID='+productID)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      this.carts = data;
    })
    .catch(error => console.error("API call failed:", error));
  }

  addUserBalance(UserID: number, balance: number) {
    fetch('http://localhost:5201/api/mycontroller/balanceusermath?UserID=' + UserID + '&math=' + balance)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => console.log("API Response:", data))
    .catch(error => console.error("API call failed:", error));
  }

  getUserBalance(UserID: number): Promise<number> {
    return fetch('http://localhost:5201/api/mycontroller/getuserinfo?UserID='+UserID)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
      return data
    })
    .catch(error => console.error("API call failed:", error));
  }

  getUserOrder(){
    
  }
}
