import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
  
import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
  private baseUrl: String = 'http://localhost:8080/foodapp/api/'
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  get(url: string) {
    this.addAuthenticationHeader();
    return this.http.get(this.baseUrl + url, { headers: this.headers }).catch(this.handleError);
  }

  getBlob(url: string){
    this.addAuthenticationHeader();
    return this.http.get(this.baseUrl + url, { headers: this.headers, responseType: "blob" }).catch(this.handleError);
  }

  post(url: string, body: Object) {
    this.addAuthenticationHeader();
    return this.http.post(this.baseUrl + url, body, { headers: this.headers }).catch(this.handleError);
  }

  put(url: string, body: Object) {
    this.addAuthenticationHeader();
    return this.http.put(this.baseUrl + url, body, { headers: this.headers }).catch(this.handleError);
  }

  delete(url: string) {
    this.addAuthenticationHeader();
    return this.http.delete(this.baseUrl + url, { headers: this.headers }).catch(this.handleError);
  }

  
  private addAuthenticationHeader(): void {
    if (this.authService.isAuthenticated() == false) {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return;
    }
    let token = localStorage.getItem('token');
    
    if (token != null) {
      this.headers = this.headers.set('Authorization', token);
    }
  }
  

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
