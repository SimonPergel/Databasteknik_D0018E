import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StarRatingService } from './star-rating.services';
import { switchMap } from 'rxjs/operators';  // Make sure to import switchMap here

@Injectable({
  providedIn: 'root',
})
export class ProductAndRatingService {
  private productIdSource = new BehaviorSubject<number | null>(null);
  currentProductId$ = this.productIdSource.asObservable();

  // Inject StarRatingService for rating operations
  starRatingService = inject(StarRatingService);

  constructor() {}

  // Set the productId
  setProductId(productId: number): void {
    console.log("Product ID being set:", productId);
    this.productIdSource.next(productId);
  }

  // Get the current productId as an Observable
  getProductId(): Observable<number | null> {
    return this.currentProductId$;
  }

  // Get the current rating for the product from StarRatingService
  // This will return an Observable that the caller can subscribe to
  getProductIdRating(): Observable<number | null> {
      return this.getProductId().pipe(
        switchMap((productId: number | null) => {
          if (productId !== null) {
            return this.starRatingService.updateStars(productId);  // Fetch rating from the service
          }
          return new Observable<number | null>((observer) => {
            observer.next(null);
            observer.complete();
          });  // If productId is null, return an observable with null value
        })
      );
    }
}
