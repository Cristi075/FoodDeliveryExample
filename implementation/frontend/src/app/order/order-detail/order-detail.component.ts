import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { ReceiptService } from '../../service/receipt.service';
import { AuthService } from '../../service/auth.service';

import { Order } from '../../model/order';
import { Route } from '../../model/route';

import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../dialogs/confirm/confirm.component';
import { InfoComponent } from '../../dialogs/info/info.component';

import * as FileSaver from 'file-saver';
import { RouteService } from '../../service/route.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [
    OrderService,
    ReceiptService,
    RouteService
  ]
})
export class OrderDetailComponent implements OnInit {
  private order: Order;
  private totalPrice: number = 0;
  private route:Route = null;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private receiptService: ReceiptService,
    private dialogService: DialogService,
    private routeService: RouteService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];

      this.totalPrice = 0;
      this.orderService.getOrderById(id).subscribe(order => {
        order.productOrders.sort((a, b) => a.product.id - b.product.id);
        order.productOrders.forEach(po => this.totalPrice += (po.product.price * po.quantity))
        this.order = order
      });
    });

  }

  private getReceipt(): void {
    this.receiptService.getReceipt(this.order)
      .subscribe((file: Blob) => FileSaver.saveAs(file, "report.pdf"));
  }

  private markAsDone(): void {
    this.dialogService.addDialog(
      ConfirmComponent,
      {
        title: "Confirmation",
        message: "Do you want to mark this order as done?"
      }
    ).subscribe(
      confirmation => {
        if (confirmation) {
          this.order.status = "DONE";
          this.orderService.updateOrder(this.order)
            .subscribe(
            order => {
              this.getData();
              this.showMessage("Success", "The order was updated", true)
            },
            err => {
              let message: string = "The order could not be updated";
              if (err.status == 400) {
                message = "ERROR:" + err._body;
              }
              this.showMessage("Error", message, false);
            })
        }
      })
  }

  private getRoute(): void{
    this.routeService.getRoute(this.order).subscribe(
      route => {
        this.route = route;
      },
      err => {
        console.log(err);
      }
    )
  }

  showMessage(title: string, message: string, success: boolean): void {
    this.dialogService.addDialog(
      InfoComponent,
      {
        title: title,
        message: message,
        success: success
      }
    );
  }
}
