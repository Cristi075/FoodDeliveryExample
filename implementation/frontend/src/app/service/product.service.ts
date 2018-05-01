import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';

import { Product } from '../model/product';

@Injectable()
export class ProductService {
  private productUrl: string = 'product/';

  constructor(
    private httpService: HttpService
  ) { }

  
  getProducts(): Observable<Product[]> {
    return this.httpService.get(this.productUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpService.get(this.productUrl + 'id=' + id);
  }

  createProduct(product: Object): Observable<Product> {
    return this.httpService.post(this.productUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpService.put(this.productUrl + 'id=' + product.id, product);
  }

  deleteProduct(id: number) {
    return this.httpService.delete(this.productUrl + 'id=' + id);
  }

}
