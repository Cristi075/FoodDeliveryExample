import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotificationListComponent } from './notification-list/notification-list.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductAddComponent } from './product/product-add/product-add.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { AddressListComponent } from './address/address-list/address-list.component';
import { AddressAddComponent } from './address/address-add/address-add.component';
import { AddressDetailComponent } from './address/address-detail/address-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';


const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'notification-list',
    component: NotificationListComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'user',
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'add', component: UserAddComponent },
      { path: 'detail/:id', component: UserDetailComponent }
    ]
  },
  {
    path: 'product',
    children: [
      { path: 'list', component: ProductListComponent},
      { path: 'add', component: ProductAddComponent},
      { path: 'detail/:id', component: ProductDetailComponent}
    ]
  },
  {
    path: 'address',
    children: [
      { path: 'list', component: AddressListComponent},
      { path: 'add', component: AddressAddComponent},
      { path: 'detail/:id', component: AddressDetailComponent}
    ]
  },
  {
    path: 'order',
    children: [
      { path: 'list', component: OrderListComponent },
      { path: 'detail/:id', component: OrderDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
