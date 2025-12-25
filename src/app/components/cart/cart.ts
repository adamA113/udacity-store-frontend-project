import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartModel } from '../../models/shop.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'shop-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})

export class Cart implements OnInit {
  cart: CartModel[] = [];
  total: number = 0;
  value!: number;

  name!: string;
  address!: string;
  card!: number;

  isNumber!: boolean;

  constructor(
    private cartService: CartService,
    private router: Router) { 

  }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = this.cartService.cart;
    this.cartService.updateQuantity();
    this.total = this.cartService.value;
  }

  onCardNumberChanged(input: number) {
    if (isNaN(input)) {
      this.isNumber = false;
    } else {
      this.isNumber = true;
    }
  }

  handleUpdateQuantity() {
    this.cartService.cart = this.cartService.cart.filter(item => item.quantity > 0);
    this.cartService.updateQuantity();
    this.total = this.cartService.value;
    this.cart = [...this.cartService.cart];
  }

  handleSubmit() {
    this.cartService.name = this.name;
    this.router.navigate(['/confirmation']);
  }

  handleRemove(cartItem: CartModel) {
    this.cartService.removeFromCart(cartItem.product);
    this.loadCart();
  }
}