import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.scss',
})
export class Confirmation implements OnInit {
  name!: string;
  value!: number;

  constructor(private cartService: CartService) { 
    
  }

  ngOnInit() {
    this.name = this.cartService.name;
    this.value = this.cartService.value;
    this.cartService.clearCart();
  }
}