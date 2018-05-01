import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [
    ProductService
  ]
})
export class ProductDetailComponent implements OnInit {

  private product: Product;
  private error: boolean;
  private editMode: boolean = false;
  private message: string;
  private updated: boolean;
  @ViewChild(ProductFormComponent) private form: ProductFormComponent;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.productService.getProductById(id)
        .subscribe((product: Product) => this.product = product);
    });
  }

  private toggleMode(): void {
    this.message = null;
    this.updated = null;
    this.editMode = !this.editMode;

    if (this.editMode == false) {
      this.loadData();
    }
  }

  onSubmit() {
    if (this.form.validateInputs() == true) {
      this.productService.updateProduct(this.product)
        .subscribe(
        product => {
          this.toggleMode();
          this.updated = true;
          this.message = "The product was updated sucessfully";
        },
        err => {
          this.updated = false;
          if (err.status == 400) {
            console.log(err);

            this.message = "ERROR:" + err['error'];
          } else {
            this.message = "ERROR: The product could not be updated";
          }
        }
        )
    } else {
      this.updated = false;
      this.message = "Error: Invalid data";
    }
  }

  processEvent(event): void {
    this.error = event;
  }

}
