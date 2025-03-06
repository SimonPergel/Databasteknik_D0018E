import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthenticationGuard } from '../Authentication/AuthenticationGuard';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink, NgIf],
  templateUrl: './header.component.html',

  styles: ``
})
export class HeaderComponent implements OnInit {
  template!: string;
  id!: string;
  cartService = inject(CartService);

  constructor(
    private route: ActivatedRoute,
    private authGuard: AuthenticationGuard,
    private cdRef: ChangeDetectorRef,
    private routes: Router
  ) {}

  ngOnInit() {
    if (Number(localStorage.getItem("token"))) {
      this.routes.navigate(['/'], { queryParams: { id: Number(localStorage.getItem("token")) }, queryParamsHandling: 'merge' })
    }
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id != null && this.authGuard.canActivate()) {
        this.cartService.loadCart();
        this.cartService.loadCart();
        this.cdRef.detectChanges();
        this.template = 'loggedin';
      }
      else {
        this.template = 'loggedout';
      }
    });
  }
}
