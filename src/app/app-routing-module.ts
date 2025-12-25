import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductList } from './components/product-list/product-list';
import { ProductItemDetails } from './components/product-item-details/product-item-details';
import { Cart } from './components/cart/cart';
import { Confirmation } from './components/confirmation/confirmation';

const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'products/:id', component: ProductItemDetails },
  { path: 'cart', component: Cart },
  { path: 'confirmation', component: Confirmation},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }