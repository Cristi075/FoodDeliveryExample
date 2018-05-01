import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { Product } from '../model/product';
import { ProductOrder } from '../model/product-order';
import { Address } from '../model/address';

@Injectable()
export class CartService {

  private nrOfItems: Subject<number>;
  private cart: ProductOrder[];

  constructor(
    private httpService: HttpService
  ) {
    this.nrOfItems = new Subject<number>();

    this.readData();
  }

  getCartContents() {
    this.readData();
    return this.cart;
  }

  public addToCart(product: Product, quantity: number): void {
    this.readData();

    let productOrder = new ProductOrder();
    productOrder.product = product;
    productOrder.quantity = quantity;

    let matching = this.cart.filter(po => po.product.id == product.id);
    // If the item already exists in the cart change the quantity instead of making a new entry
    if (matching.length != 0) {
      matching[0].quantity += quantity;
    } else {
      this.cart.push(productOrder);
    }

    this.refreshNumberOfItems();
    this.writeData();
  }

  public removeFromCart(productOrder: ProductOrder) {
    let index: number = this.cart.indexOf(productOrder);

    if (index > -1) {
      this.cart.splice(index, 1);
    }

    this.refreshNumberOfItems();
    this.writeData();
  }

  public clearCart(): void {
    this.cart = [];
    this.refreshNumberOfItems();
    this.writeData();
  }

  public getNumberOfItems(): number {
    this.readData();
    this.refreshNumberOfItems();
    return this.getNrOfItems();
  }

  private getNrOfItems(): number{
    return this.cart.length;
  }

  public getObservableNumberOfItems(): Observable<number> {
    return this.nrOfItems.asObservable();
  }

  private refreshNumberOfItems(): void {
    this.nrOfItems.next(this.getNrOfItems());
  }

  private writeData(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private readData(): void {
    let tmp = localStorage.getItem('cart');
    if (tmp == null) {
      this.cart = [];
    } else {
      this.cart = JSON.parse(tmp);
    }
  }
}
