import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { computed, signal } from '@angular/core';
import { Product } from '../models/product.models';
import { ProductCardComponent } from '../pages/products-list/product-card/product-card.component';
import { Cart } from '../models/cart.models';
import { userInfo } from '../models/userInfo.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Opinion } from '../models/Opinion.models';


@Injectable({
    providedIn: 'root'
  })

export class commentsService {
    private apiUrl = 'http://localhost:5201/api/mycontroller'; // Replace with actual API URL

    constructor(private http: HttpClient) {}


    comment(userID: number, productID: number, comment: string){

        let encode :string = comment.replace(/ /g, "%20");
        console.log(encode);

        fetch('http://localhost:5201/api/mycontroller/makeComment?userID='+ userID+ '&productID=' +productID+ '&comment='+encode+';')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log("API Response:", data))
        .catch(error => console.error("API call failed:", error));
    } 

    
    public deleteComment(commentID: number) {
        fetch('http://localhost:5201/api/mycontroller/deleteComment?commentID='+ commentID)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then(data => console.log("API Response:", data))
            .catch(error => console.error("API call failed:", error));
    }

    getComments(productID: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/getProductComments?productID=${productID}`);
    }
}

