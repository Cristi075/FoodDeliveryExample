import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';
import { Order } from '../model/order';

@Injectable()
export class ReceiptService {
  private receiptUrl = "receipt/"

  constructor(
    private httpService: HttpService
  ) { }

  getReceipt(order: Order): Observable<Blob> {
    return this.httpService.getBlob(this.receiptUrl + 'orderId='+order.id)
      .map((res: Response) => { console.log(res); return new Blob([res], { type: 'application/pdf' }) });
  }

}
