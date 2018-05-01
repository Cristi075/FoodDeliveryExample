import { Component, OnInit } from '@angular/core';

import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../../dialogs/confirm/confirm.component';
import { InfoComponent } from '../../dialogs/info/info.component';

import { AddressService } from '../../service/address.service';
import { Address } from '../../model/address';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
  providers:[
    AddressService
  ]
})
export class AddressListComponent implements OnInit {
  private addresses: Address[];

  constructor(
    private addressService: AddressService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.getData();
  }

  private getData(): void {
    this.addressService.getAddresses().subscribe(addresses => this.addresses = addresses);
  }

  private delete(id: number): void {
    this.dialogService.addDialog(
      ConfirmComponent,
      {
        title: "Confirmation",
        message: "Are you sure that you want to delete this address ?"
      }
    ).subscribe(
      confirmation => {
        if (confirmation) {
          this.deleteAddress(id);
        }
      },
      err => {
        console.log(err);
      })
  }

  private deleteAddress(id: number): void {
    this.addressService.deleteAddress(id)
      .subscribe(
      address => {
        this.getData();
        this.showMessage(
          "Success",
          "The address was sucessfully deleted",
          true
        )
      },
      err => {
        console.log(err);
        let message: string = "The address could not be deleted";
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
