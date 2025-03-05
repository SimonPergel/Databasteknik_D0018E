
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
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
  getProductIdRatingFromProductCardComponent(productId: number): Observable<number> {
    return this.starRatingService.updateStars(productId);
  }
/*
  getP_IDRatingFromUser(productId: number): Observable<number> {
    return this.starRatingService.UserProductRating(productId, this.starRatingService.userID);
  }
    */

  

}
