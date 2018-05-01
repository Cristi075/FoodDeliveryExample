import { Component, OnInit } from '@angular/core';

import { DialogService } from 'ng2-bootstrap-modal';
import { InputComponent } from '../dialogs/input/input.component';
import { InfoComponent } from '../dialogs/info/info.component';

import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [
    ProductService
  ]
})
export class MenuComponent implements OnInit {
  private products: Product[];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private dialogService: DialogService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
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

  private addToCart(product: Product) {
    this.dialogService.addDialog(
      InputComponent,
      {
        title: "Insert the quantity to be added to your shoping cart",
        placeholder: "",
        type: "text"
      }
    ).subscribe(
      userInput => {
        if (userInput == null || userInput == "") {
          this.showMessage("Canceled", "Operation canceled by user (or blank input)", false);
          return;
        }

        if (userInput.match(/^[0-9]+$/) == null) {
          this.showMessage("Error", "The quantity should be a positive integer", false);
          return;
        }

        let qty = Number(userInput);
        if (qty <= 0) {
          this.showMessage("Error", "The quantity should be a positive integer", false);
          return;
        }

        this.cartService.addToCart(product, qty);
      });
  }

}
