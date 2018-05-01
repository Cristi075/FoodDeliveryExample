import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { User } from '../model/user';

@Injectable()
export class RegisterService {
  private registerUrl: string = 'http://localhost:8080/foodapp/auth/register/';
  private headers : HttpHeaders;

  constructor(private http:HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.headers.append('Access-Control-Allow-Origin','*');
  }

  public register(user: Object): Observable<Object>{
    let body = JSON.stringify(user);

    return this.http.post(this.registerUrl, body, {headers: this.headers}).catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
