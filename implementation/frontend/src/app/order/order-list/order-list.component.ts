import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../service/auth.service';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [
    OrderService
  ]
})
export class OrderListComponent implements OnInit {
  private orders: Order[];

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData(): void{
    this.orderService.getOrders().subscribe(orders => this.orders = orders);
  }

}
