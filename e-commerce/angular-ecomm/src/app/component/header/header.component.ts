import { Component, inject, OnInit, ChangeDetectorRef, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthenticationGuard } from '../Authentication/AuthenticationGuard';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',

  styles: ``
})

export class HeaderComponent implements OnInit,  AfterViewInit {
  template!: string;
  currentTemplate!: TemplateRef<any>;
  id!: string;
  cartService = inject(CartService);
  dataService = inject(DataService);

  @ViewChild('loggedinadmin') loggedinadmin!: TemplateRef<any>;
  @ViewChild('loggedin') loggedin!: TemplateRef<any>;
  @ViewChild('loggedout') loggedout!: TemplateRef<any>;

  constructor (
    private route: ActivatedRoute,
    private authGuard: AuthenticationGuard,
    private cdRef: ChangeDetectorRef,
    private routes: Router
  ) {}

  ngOnInit() {
    if (Number(localStorage.getItem("token"))) {
      this.routes.navigate(['/'], { queryParams: { id: Number(localStorage.getItem("token")) }, queryParamsHandling: 'merge' })
    }
    this.route.queryParams.subscribe(async params => {
      this.id = params['id'];
      if (this.id != null && this.authGuard.canActivate() && await this.dataService.checkAdmin(Number(this.id))) {
        this.cartService.loadCart();
        this.cartService.loadCart();
        this.cdRef.detectChanges();
        this.template = 'loggedinadmin';
        this.getTemplate();
      }
      else if (this.id != null && this.authGuard.canActivate()) {
        this.cartService.loadCart();
        this.cartService.loadCart();
        this.cdRef.detectChanges();
        this.template = 'loggedin';
        this.getTemplate();
      }
      else {
        this.template = 'loggedout';
        this.getTemplate();
      }
    });
  }

  ngAfterViewInit(): void {
    this.getTemplate();
  }

  getTemplate() {
    console.log('Setting Template:', this.template);
    switch(this.template) {
      case 'loggedinadmin':
        this.currentTemplate = this.loggedinadmin;
        break;
      case 'loggedin':
        this.currentTemplate = this.loggedin;
        break;
      case 'loggedout':
        this.currentTemplate = this.loggedout;
        break;
    }
    console.log('Current Template:', this.currentTemplate);
  }

  getToFrontPage() {
    this.routes.navigate(['/'], { queryParams: { id: Number(localStorage.getItem("token")) } })
  }

  getToFrontPageLoggedOut() {
    this.routes.navigate(['/'])
  }
}
