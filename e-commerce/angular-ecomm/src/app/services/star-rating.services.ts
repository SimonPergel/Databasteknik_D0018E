import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class StarRatingService {
  private apiUrl = 'http://localhost:5201/api/mycontroller'; // Replace with actual API URL

  constructor (
    private http: HttpClient
  ) {}

  /** Fetches the current rating for a product */
  updateStars(productID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/checkRating?productID=${productID}`).pipe(
      catchError(error => {
        console.error("  Error fetching rating:", error);
        return throwError(() => new Error("Failed to fetch rating"));
      })
    );
  }

  /** Submits a new rating and returns a boolean indicating success */
  async starRate(userID: number, productID: number, rating: number): Promise<boolean> {
    try {
      const response = await this.http
        .get<any>(`${this.apiUrl}/Rate?Rating=${rating}&productID=${productID}&userID=${userID}`)
        .toPromise();
      
      console.log("Rating submitted successfully:", response);
      return true; // Success
    } catch (error) {
      console.error("  Failed to submit rating:", error);
      return false; // Failure
    }
  }

  checkRatingUser(productID: number, userID: number): Promise<number> {
    return fetch(`${this.apiUrl}/checkRatingUser?productId=${productID}&userId=${userID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();  // Convert response to JSON
      })
      .then(data => {
        console.log("Received rating:", data); 
        
        if (typeof data === "number") {
          return data;  // Ensure it's a number
        } else if (data && typeof data.rating === "number") {
          return data.rating;  // Handle case where rating is inside an object
        } else {
          console.warn("Unexpected API response format:", data);
          return 0;  // Default value if the format is wrong
        }
      })
      .catch(error => {
        console.error(" API call failed:", error);
        return 0;  // Return a default value instead of `undefined`
      });
  }
}
