import { Injectable } from '@angular/core';

import { 
  ProductModel,
  CartModel
} from '../../models/shop.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartModel[] = [];
  value: number = 0;
  name!: string;

  constructor() { }

  addToCart(product: ProductModel, quantity: number) {
    let index = this.cart.findIndex((cartItem) => {
      return cartItem.product.id === product.id;
    });

    if (index >= 0) {
      this.cart[index].quantity += Number(quantity);
    } else {
      this.cart.push({
        product,
        quantity: Number(quantity),
      });
    }

    this.updateQuantity();
  }

  removeFromCart(product: ProductModel) {
    let index = this.cart.findIndex((cartItem) => {
      return cartItem.product.id === product.id;
    });

    if (index >= 0) {
      this.cart.splice(index, 1);
      this.updateQuantity();
    }
  }

  setItemQuantity(product: ProductModel, quantity: number) {
    let index = this.cart.findIndex((cartItem) => cartItem.product.id === product.id);

    if (index >= 0) {
      if (quantity <= 0) {
        this.cart.splice(index, 1);
      } else {
        this.cart[index].quantity = quantity;
      }
    } else {
      if (quantity > 0) {
        this.cart.push({ product, quantity });
      }
    }

    this.updateQuantity();
  }

  updateQuantity() {
    let value = 0;

    for (const cartItem of this.cart) {
      value += cartItem.product.price * cartItem.quantity;
    }

    this.value = Math.round(value * 100) / 100;
  }

  getProducts() {
    this.cart = this.cart.filter((cartItem) => {
      return cartItem.quantity > 0;
    });
    
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.updateQuantity();
    
    return this.cart;
  }

  getCartItemCount() {
    return this.cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }
}