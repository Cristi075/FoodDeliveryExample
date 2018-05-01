import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';

import { Order } from '../model/order';
import { Route } from '../model/route';

@Injectable()
export class RouteService {
  private routeUrl: string = 'route/';

  constructor(
    private httpService: HttpService
  ) { }

  getRoute(order: Order): Observable<Route> {
    return this.httpService.get(this.routeUrl + "orderId=" + order.id);
  }
}
