import { Component, OnInit, DoCheck } from '@angular/core';

import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'navigation',
  standalone: false,
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation implements OnInit, DoCheck {
  cartItemCount: number = 0;

  constructor(private cartService: CartService) { 

  }

  ngOnInit() {
    this.updateCartCount();
  }

  ngDoCheck() {
    const newCount = this.cartService.getCartItemCount();

    if (newCount !== this.cartItemCount) {
      this.cartItemCount = newCount;
    }
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }
}