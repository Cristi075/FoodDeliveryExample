import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserFormComponent } from './user/user-form/user-form.component';

import { HttpService } from './service/http.service';
import { AuthService } from './service/auth.service';

import { LoginComponent } from './login/login.component';

import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { InfoComponent } from './dialogs/info/info.component';
import { InputComponent } from './dialogs/input/input.component';
import { DropdownComponent } from './dialogs/dropdown/dropdown.component';

import { NotificationListComponent } from './notification-list/notification-list.component';

import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

import { AddressListComponent } from './address/address-list/address-list.component';
import { AddressAddComponent } from './address/address-add/address-add.component';
import { AddressDetailComponent } from './address/address-detail/address-detail.component';
import { AddressFormComponent } from './address/address-form/address-form.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { CartService } from './service/cart.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { RouteDisplayComponent } from './route-display/route-display.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmComponent,
    InfoComponent,
    InputComponent,
    DropdownComponent,
    UserListComponent,
    UserAddComponent,
    UserDetailComponent,
    UserFormComponent,
    LoginComponent,
    NotificationListComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductFormComponent,
    ProductDetailComponent,
    AddressListComponent,
    AddressAddComponent,
    AddressDetailComponent,
    AddressFormComponent,
    RegisterComponent,
    ProfileComponent,
    MenuComponent,
    ShoppingCartComponent,
    OrderListComponent,
    OrderDetailComponent,
    RouteDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BootstrapModalModule
  ],
  providers:  [
    HttpService,
    AuthService,
    CartService
  ],
  entryComponents: [
    ConfirmComponent,
    InfoComponent,
    InputComponent,
    DropdownComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
