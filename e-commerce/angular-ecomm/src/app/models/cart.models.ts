export interface Cart {
    ProductName: string;
    cartID: number;
    productID: number;
    quantity: number;
    price: number;
    purchaseID: number;
    inStock?: number;
}