import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../service/auth.service';
import { CartService } from '../service/cart.service';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../model/notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [
    NotificationService
  ]
})
export class NavbarComponent implements OnInit {
  private notificationCount: number = 0;
  private notifications: Notification[];
  private polling: boolean = false;

  private nrOfItems: number; // Number of items from the shopping cart
  private cartAnimation: boolean = false; // Should the animation be active right now?

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.authService.isClient()) {
          this.startPolling();
        }
      }
    });
  
    
    this.nrOfItems = this.cartService.getNumberOfItems();
    this.cartService.getObservableNumberOfItems().subscribe(nr => {
      this.nrOfItems = nr;
      this.blink();
    });
  }

  private startPolling(): void {
    if (this.polling == false) {
      this.polling = true;
      this.notificationService.getNewNotifications()
        .subscribe((notifications: Notification[]) => {
          if (notifications != null) {
            this.notificationCount = notifications.length;
            this.notifications = notifications;
          } else {
            this.notificationCount = 0;
            this.notifications = null;
          }
        },
        err => {
            this.polling = false;
          this.notifications = null;
          this.notificationCount = 0;
        });
    }
  }

  private markAsRead(notification: Notification) {
    notification.seen = true;
    this.notificationService.updateNotification(notification)
      .subscribe(notification => {
        console.log(notification);
        this.router.navigateByUrl('/order/detail/'+notification.order.id);
      });
  }

  
  // Play an animation on the shopping cart button
  private blink(): void {
    this.cartAnimation = true;
    setTimeout(function() {
      this.cartAnimation = false;
    }.bind(this),1000);
  }

  private logout(): void{
    this.authService.logout();
    this.nrOfItems = this.cartService.getNumberOfItems();
  }
}
