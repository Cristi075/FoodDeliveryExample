import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent extends DialogComponent<DropdownInputModel,Object> {
  private choice: Object;

  constructor(dialogService: DialogService) { 
    super(dialogService);
  }

  confirm() {
    this.result = this.choice;
    this.close();
  }
}

export interface DropdownInputModel {
  title:string;
  values: Object[];
  stringConverter: (o:Object) => string;
}

