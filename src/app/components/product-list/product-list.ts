import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ProductService } from '../../services/product/product.service';
import { ProductModel } from '../../models/shop.model';

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
    private cdr: ChangeDetectorRef) { 

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
}