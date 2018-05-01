import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Address } from '../model/address';

@Injectable()
export class AddressService {
  private addressUrl: string = 'address/';

  constructor(
    private httpService: HttpService
  ) { }


  getAddresses(): Observable<Address[]> {
    return this.httpService.get(this.addressUrl);
  }

  getAddressById(id: number): Observable<Address> {
    return this.httpService.get(this.addressUrl + 'id=' + id);
  }

  createAddress(address: Object): Observable<Address> {
    return this.httpService.post(this.addressUrl, address);
  }

  updateAddress(address: Address): Observable<Address> {
    return this.httpService.put(this.addressUrl + 'id=' + address.id, address);
  }

  deleteAddress(id: number) {
    return this.httpService.delete(this.addressUrl + 'id=' + id);
  }

}
