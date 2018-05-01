import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AddressFormComponent } from '../address-form/address-form.component';
import { AddressService } from '../../service/address.service';
import { Address } from '../../model/address';
@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css'],
  providers: [
    AddressService
  ]
})
export class AddressDetailComponent implements OnInit {

  private address: Address;
  private error: boolean;
  private editMode: boolean = false;
  private message: string;
  private updated: boolean;
  @ViewChild(AddressFormComponent) private form: AddressFormComponent;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.addressService.getAddressById(id)
        .subscribe((address: Address) => this.address = address);
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
      this.addressService.updateAddress(this.address)
        .subscribe(
        address => {
          this.toggleMode();
          this.updated = true;
          this.message = "The address was updated sucessfully";
        },
        err => {
          this.updated = false;
          if (err.status == 400) {
            console.log(err);

            this.message = "ERROR:" + err['error'];
          } else {
            this.message = "ERROR: The address could not be updated";
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
