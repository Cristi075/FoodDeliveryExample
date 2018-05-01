import { Component, OnInit, ViewChild } from '@angular/core';

import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [
    ProductService
  ]
})
export class ProductAddComponent implements OnInit {

  private product: any = {};
  private error: boolean = true;
  private created: boolean = null;
  private message: string = null;
  @ViewChild(ProductFormComponent) private form: ProductFormComponent;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.validateInputs() == true) {
      this.productService.createProduct(this.product)
      .subscribe(
        user => {
          this.created = true;
          this.message = "The product was added sucessfully";
          this.product = {};
        },
        err => {
          this.created = false;
          if (err.status == 400) {
            this.message = "ERROR:" + err['error'];
          } else {
            this.message = "ERROR: The new product could not be added";
          }
        });
    } else {
      this.created = false;
      this.message = "Error: Invalid data";
    }
  }

  processEvent(event): void {
    this.error = event;
  }
}
