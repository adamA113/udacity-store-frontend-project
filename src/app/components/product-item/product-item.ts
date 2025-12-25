import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';

import { ProductModel } from '../../models/shop.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'product-item',
  standalone: false,
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem implements OnInit, OnChanges, DoCheck {
  @Input() product!: ProductModel;
  
  selectedQuantity = 1;
  productAddedToCart = false;
  quantityOptions = [1, 2, 3, 4, 5];

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.checkCartStatus();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && !changes['product'].firstChange) {
      this.checkCartStatus();
    }
  }

  ngDoCheck() {
    this.checkCartStatus();
  }

  checkCartStatus() {
    const cartItem = this.cartService.cart.find(
      (item) => item.product.id === this.product.id
    );
    this.productAddedToCart = !!cartItem;
    
    if (cartItem) {
      this.selectedQuantity = cartItem.quantity;
    }
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.selectedQuantity);
    this.productAddedToCart = true;
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
    this.selectedQuantity = 1;
    this.productAddedToCart = false;
  }
}