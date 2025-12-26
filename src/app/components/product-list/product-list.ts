import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ProductService } from '../../services/product/product.service';
import { ProductModel } from '../../models/shop.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  products: ProductModel[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService) { 

  }

  ngOnInit() {
    this.products = [];

    this.productService.getProducts().subscribe({
      next: (data: ProductModel[]) => {
        this.products = data || [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.products = [];
        this.cdr.detectChanges();
      }
    });
  }

  onProductAdd(event: { product: ProductModel; quantity: number }) {
    this.cartService.addToCart(event.product, event.quantity);
    window.alert(`${event.product.name} has been added to the cart.`);
  }
}