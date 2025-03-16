
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { StarRatingService } from './star-rating.services';


@Injectable({
  providedIn: 'root',
})

export class ProductAndRatingService {
  private productIdSource = new BehaviorSubject<number | null>(null);
  currentProductId$ = this.productIdSource.asObservable();

  constructor() {}
  starRatingService = inject(StarRatingService);

  // Set the productId
  setProductId(productId: number): void {
    console.log("Product ID being set:", productId);
    this.productIdSource.next(productId);
  }

  // Get the current productId
  getProductId(): Observable<number | null> {
    return this.currentProductId$;
  }

  getProductIdRating(): Observable<number | null> {
    return this.getProductId().pipe(
      switchMap(productId => {
        if (productId !== null) {
          return this.starRatingService.updateStars(productId);
        } else {
          return new Observable<number | null>((observer) => {
            observer.next(null);
            observer.complete();
          });
        }
      })
    );
  }
  
  //gets aggregate score for a product
  getProductIdRatingFromProductCardComponent(productId: number): Observable<number> {
    let dummyRating: number;  // Dummy variable for debugging
    return this.starRatingService.updateStars(productId).pipe(
      tap(rating => {
        dummyRating = rating;  // Assign the emitted value to the dummy variable
        console.log("Debug - dummyRating:", dummyRating);  // Log it to the console
      })
    );
  }
  
  async getP_IDRatingFromUser(productId: number): Promise<number> {
    try {
      const rating = await this.starRatingService.checkRatingUser(
        productId, 
        Number(localStorage.getItem("token"))
      );  // Await the promise directly
      console.log("Fetched user rating:", rating);
      return rating ?? 0;  // Ensure a number is always returned
    } catch (error) {
      console.error(" Error fetching user rating:", error);
      return 0;  // Return a default value in case of an error
    }
  }
}