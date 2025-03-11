import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { commentsService } from '../../services/comments.service';
import { Opinion } from '../../models/Opinion.models';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  @Input() productID!: number;
  @Input() userID!: number;
token = Number(localStorage.getItem("token"));  //needs to update when new token is issued
comments: Opinion []=[]
newCommentText: string = '';
dataService = inject(DataService);
template!: String;


  constructor( 
    public commentsService: commentsService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
/*
    this.route.queryParams.subscribe(params => {
      this.userID = params['userId'];
      console.log("Received U_ID:", this.userID);
  
    });
    */


   
    this.route.queryParams.subscribe(async params => {
      if (await this.dataService.checkAdmin(Number(localStorage.getItem("token")))) {;
        this.template = 'admin';
      }
      else {
        this.template = 'user';
      }
    });

    this.userID = Number(localStorage.getItem("token"));
    

    this.route.queryParams.subscribe(params => {
      this.productID = params['id'];
      console.log("Received id:", this.productID);
    });

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
