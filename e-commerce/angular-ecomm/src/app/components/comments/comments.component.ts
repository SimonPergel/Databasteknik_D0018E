import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { commentsService } from '../../services/comments.service';
import { Opinion } from '../../models/Opinion.models';
import { DataService } from '../../services/data.service';


@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-comments',
  template: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input() productID!: number;
token = Number(localStorage.getItem("token"));  //needs to update when new token is issued
comments: Opinion []=[]
newCommentText: string = '';
  constructor( public commentsService: commentsService) {}

  ngOnInit(): void {
    this.commentsService.getComments(this.productID).subscribe({
      next: (response) => {
        console.log("Fetched Comments:", response);
        this.comments = response;
        console.log('Comments Object:', this.comments);
      },
      error: (error) => {
        console.error("Error fetching comments:", error);
      }
    });
  }

  trackByProductId(index: number, comment: Opinion): number {
    return comment.productId; // Track by productId for each comment
  }
  

}
