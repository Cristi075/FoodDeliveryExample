import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Product } from '../model/product';
import { Address } from '../model/address';
import { Order } from '../model/order';
import { ProductOrder } from '../model/product-order';
import { AddressService } from '../service/address.service';
import { OrderService } from '../service/order.service';

import { DialogService } from 'ng2-bootstrap-modal';
import { DropdownComponent } from '../dialogs/dropdown/dropdown.component';
import { InputComponent } from '../dialogs/input/input.component';
import { InfoComponent } from '../dialogs/info/info.component';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [
    OrderService,
    AddressService
  ]
})
export class ShoppingCartComponent implements OnInit {

  private cart: ProductOrder[] = [];
  private message: string;
  private totalPrice: number = 0;

  constructor(
    private addressService: AddressService,
    private dialogService: DialogService,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  loadItems(): void {
    this.totalPrice = 0;
    this.cart = this.cartService.getCartContents();

    this.cart.forEach(po => this.totalPrice += (po.product.price * po.quantity));
  }

  clear(): void {
    this.cartService.clearCart();
    this.loadItems();
  }

  remove(productOrder: ProductOrder): void {
    this.cartService.removeFromCart(productOrder);
    this.loadItems();
  }

  send(): void {
    this.addressService.getAddresses().subscribe(addresses => {
      this.dialogService.addDialog(
        DropdownComponent,
        {
          title: "Chose the address where this order should be delivered",
          values: addresses,
          stringConverter: (o => o.city + ", " + o.street + " Nr. " + o.number)
        }
      ).subscribe(
        address => {
          if (address == null || address == "") {
            this.showMessage("Canceled", "Operation canceled by user (or blank input)", false);
            return;
          }

          let order = new Order();
          order.address = (address as Address);
          order.productOrders = this.cart;

          this.orderService.createOrder(order).subscribe(
            order => {
              this.showMessage("Success","The order was placed successfully",true);
              this.clear();
            },
            err => {
              let message = "ERROR: The new user could not be added";
              if (err.status == 400) {
                message = "ERROR:" + err['error'];
              }

              this.showMessage("Error", message, false);
            }
          );

        });
    });
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
