import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class commentsService {
    private apiUrl = 'http://localhost:5201/api/mycontroller'; // Replace with actual API URL

    constructor (
        private http: HttpClient
    ) {}

    comment(userID: number, productID: number, comment: string){
        //alert("comment submitted, refresh page for results")
        let encode :string = comment.replace(/ /g, "%20");
        console.log(encode);

        fetch('http://localhost:5201/api/mycontroller/makeComment?userID='+ userID+ '&productID=' +productID+ '&comment='+encode)
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
        console.log("Trying deletion of Comment ID:", commentID);
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

    public deleteProductComments(productID: number) {
        console.log("Trying deletion of comments for productID:", productID);
        fetch('http://localhost:5201/api/mycontroller/deleteproductcomments?productID='+ productID)
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

