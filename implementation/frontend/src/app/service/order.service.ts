import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';

import { Order } from '../model/order';

@Injectable()
export class OrderService {
  private orderUrl: string = 'order/';

  constructor(
    private httpService: HttpService
  ) { }

  getOrders(): Observable<Order[]> {
    return this.httpService.get(this.orderUrl);
  }

  getOrderById(id: number): Observable<Order> {
    return this.httpService.get(this.orderUrl + 'id=' + id);
  }

  createOrder(order: Object): Observable<Order> {
    return this.httpService.post(this.orderUrl, order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.httpService.put(this.orderUrl + 'id=' + order.id, order);
  }

  deleteOrder(id: number) {
    return this.httpService.delete(this.orderUrl + 'id=' + id);
  }

}
