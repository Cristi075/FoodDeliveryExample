import { Component, OnInit, Input } from '@angular/core';
import { Route } from '../model/route';

@Component({
  selector: 'app-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.css']
})
export class RouteDisplayComponent implements OnInit {

  private route: Route;

  @Input() set model(route: Route) {
    this.route = route;
  }

  constructor() { }

  ngOnInit() {
  }

}
