import { Component, OnInit, ViewChild } from '@angular/core';

import { AddressFormComponent } from '../address-form/address-form.component';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.css'],
  providers: [
    AddressService
  ]
})
export class AddressAddComponent implements OnInit {

  private address: any = {};
  private error: boolean = true;
  private created: boolean = null;
  private message: string = null;
  @ViewChild(AddressFormComponent) private form: AddressFormComponent;

  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.validateInputs() == true) {
      this.addressService.createAddress(this.address)
      .subscribe(
        user => {
          this.created = true;
          this.message = "The address was added sucessfully";
          this.address = {};
        },
        err => {
          this.created = false;
          if (err.status == 400) {
            this.message = "ERROR:" + err['error'];
          } else {
            this.message = "ERROR: The new address could not be added";
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
