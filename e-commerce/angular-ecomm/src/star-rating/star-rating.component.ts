import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating">
      <span *ngFor="let star of stars; let i = index" 
            (click)="rate(i)" 
            (mouseenter)="hover(i)" 
            (mouseleave)="resetHover()">
        ★
      </span>
    </div>
  `,
  styles: [`
    .star-rating {
      display: flex;
      gap: 5px;
      font-size: 2rem;
      color: gray;
      cursor: pointer;
    }
    .star-rating span {
      transition: color 0.2s ease-in-out;
    }
    .star-rating span.filled {
      color: gold;
    }
    .star-rating span:hover {
      color: orange;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating: number = 0;  // The rating value (1 to 5)
  @Output() ratingChange = new EventEmitter<number>();  // Emits rating change

  stars: boolean[] = [false, false, false, false, false]; // Tracks filled stars
  hoverIndex: number | null = null; // Track hover effect

  ngOnInit() {
    this.updateStars();
  }

  rate(starIndex: number): void {
    this.rating = starIndex + 1;
    this.ratingChange.emit(this.rating);
    this.updateStars();
  }

  hover(starIndex: number): void {
    this.hoverIndex = starIndex;
    this.updateStars();
  }

  resetHover(): void {
    this.hoverIndex = null;
    this.updateStars();
  }

  updateStars(): void {
    this.stars = this.stars.map((_, i) => i < (this.hoverIndex !== null ? this.hoverIndex + 1 : this.rating));
  }
}
