import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductModel } from '../../models/shop.model';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-item-details',
  standalone: false,
  templateUrl: './product-item-details.html',
  styleUrl: './product-item-details.scss',
})
export class ProductItemDetails implements OnInit {
  product!: ProductModel;
  id!: number;
  selectedQuantity = 1;
  productAddedToCart = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
    });

    this.productService.getProducts().subscribe((data) => {
      this.product = data.filter(
        (product: ProductModel) => product.id === this.id
      )[0];
      this.checkCartStatus();
    });
  }

  checkCartStatus() {
    if (!this.product) return;
    
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
    window.alert(`${this.product.name} has been added to the cart.`);
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