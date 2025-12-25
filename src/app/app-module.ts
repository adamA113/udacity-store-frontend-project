import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';

import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { ProductList } from './components/product-list/product-list';
import { ProductItem } from './components/product-item/product-item';
import { Navigation } from './components/navigation/navigation';
import { Cart } from './components/cart/cart';
import { Confirmation } from './components/confirmation/confirmation';
import { ProductItemDetails } from './components/product-item-details/product-item-details';

@NgModule({
  declarations: [
    App,
    ProductList,
    ProductItem,
    Navigation,
    Cart,
    Confirmation,
    ProductItemDetails
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
