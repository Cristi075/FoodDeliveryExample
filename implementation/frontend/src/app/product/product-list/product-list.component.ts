import { Component, OnInit } from '@angular/core';

import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../dialogs/confirm/confirm.component';
import { InfoComponent } from '../../dialogs/info/info.component';

import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [
    ProductService
  ]
})
export class ProductListComponent implements OnInit {
  private products: Product[];

  constructor(
    private productService: ProductService,
    private dialogService: DialogService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  private delete(id: number): void {
    this.dialogService.addDialog(
      ConfirmComponent,
      {
        title: "Confirmation",
        message: "Are you sure that you want to delete product nr. " + id + " ?"
      }
    ).subscribe(
      confirmation => {
        if (confirmation) {
          this.deleteProduct(id);
        }
      })
  }

  private deleteProduct(id: number): void {
    this.productService.deleteProduct(id)
      .subscribe(
      product => {
        this.getData();
        this.showMessage(
          "Success",
          "Product " + id + " was sucessfully deleted",
          true
        )
      },
      err => {
        let message: string = "Product " + id + " could not be deleted";
        if (err.status == 400) {
          message = "ERROR:" + err._body;
        }
        this.showMessage(
          "Error",
          message,
          false);
      })
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
