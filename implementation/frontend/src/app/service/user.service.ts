import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../model/user';

@Injectable()
export class UserService {
  private userUrl: string = 'user/';

  constructor(
    private httpService: HttpService
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpService.get(this.userUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.httpService.get(this.userUrl + 'id=' + id);
  }

  createUser(user: Object): Observable<User> {
    return this.httpService.post(this.userUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.httpService.put(this.userUrl + 'id=' + user.id, user);
  }

  deleteUser(id: number) {
    return this.httpService.delete(this.userUrl + 'id=' + id);
  }

  changePassword(user: User, newPassword: string): Observable<User> {
    (user as any).password = newPassword;
    return this.httpService.put(this.userUrl + 'id=' + user.id, user);
  }
}
