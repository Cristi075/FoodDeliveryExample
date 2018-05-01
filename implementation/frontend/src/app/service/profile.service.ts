import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/catch';

import { User } from '../model/user';

@Injectable()
export class ProfileService {
  private profileUrl: string = 'profile/';

  constructor(
    private httpService: HttpService
  ) { }

  public getProfile(): Observable<User>{
    return this.httpService.get(this.profileUrl);
  }

  public updateProfile(profile: User): Observable<User>{
    return this.httpService.put(this.profileUrl, profile);
  }

}
