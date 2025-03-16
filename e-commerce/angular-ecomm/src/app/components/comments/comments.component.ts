import { Component, Input, TemplateRef, inject, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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

export class CommentsComponent implements AfterViewInit {
  @Input() productID!: number;
  @Input() userID!: number;
  token = Number(localStorage.getItem("token"));  //needs to update when new token is issued
  comments: Opinion []=[]
  newCommentText: string = '';
  dataService = inject(DataService);
  currentTemplate!: TemplateRef<any> 
  template!: String;

  @ViewChild('admin') admin!: TemplateRef<any>;
  @ViewChild('user') user!: TemplateRef<any>;
  @ViewChild('loggedout') loggedout!: TemplateRef<any>;


  constructor ( 
    public commentsService: commentsService,
    private route: ActivatedRoute,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
  /*
    this.route.queryParams.subscribe(params => {
      this.userID = params['userId'];
      console.log("Received U_ID:", this.userID);
  
    });
  */
   
    if (await this.dataService.checkAdmin(Number(localStorage.getItem("token")))) {
      this.template = 'admin';
      this.getTemplate();
    }
    else if (Number(localStorage.getItem("token"))) {
      this.template = 'user';
      this.getTemplate();
    }
    else {
      this.template = 'loggedout';
      this.getTemplate();
    }

    this.userID = Number(localStorage.getItem("token"));
    this.route.queryParams.subscribe(params => {
      this.productID = params['pid'];
      console.log("Received pid:", this.productID);
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

  ngAfterViewInit(): void {
    this.getTemplate();
  }

  getTemplate() {
    console.log('Setting Template:', this.template);
    switch(this.template) {
      case 'admin':
        this.currentTemplate = this.admin;
        break;
      case 'user':
        this.currentTemplate = this.user;
        break;
      case 'loggedout':
        this.currentTemplate = this.loggedout;
        break;
    }
    console.log('Current Template:', this.currentTemplate);
  }

  trackByProductId(index: number, comment: Opinion): number {
    return comment.productId; // Track by productId for each comment
  }
  
  updateView() {
    //alert("Comment deleted, refresh page for results");  
    this.cdr.detectChanges();
    this.ngOnInit();
  }

  createComment() {
    this.commentsService.comment(this.token, this.productID, this.newCommentText);
    this.newCommentText = '';
    this.cdr.detectChanges();
    this.ngOnInit();
  }
}
