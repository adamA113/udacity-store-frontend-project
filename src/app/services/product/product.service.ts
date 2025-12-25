import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ProductModel } from '../../models/shop.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private data = '/assets/data.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.data);
  }
}