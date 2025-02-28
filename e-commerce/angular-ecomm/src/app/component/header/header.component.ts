import { Component, inject, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (this.id != null) {
        this.template = 'loggedin';
      }
      else {
        this.template = 'loggedout';
      }
    });
  }
}
