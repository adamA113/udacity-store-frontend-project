import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, Output, EventEmitter } from '@angular/core';

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
  @Output() add = new EventEmitter<{ product: ProductModel; quantity: number }>();
  
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
    this.productAddedToCart = true;
    this.add.emit({ product: this.product, quantity: this.selectedQuantity });
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
    this.selectedQuantity = 1;
    this.productAddedToCart = false;
    window.alert(`${this.product.name} has been removed from the cart.`);
  }

  onQuantityChange(newQuantity: number) {
    this.selectedQuantity = Number(newQuantity);

    if (this.productAddedToCart) {
      this.cartService.setItemQuantity(this.product, this.selectedQuantity);
      window.alert(`The quantity for ${this.product.name} has been updated to ${this.selectedQuantity}.`);
    }
  }
}