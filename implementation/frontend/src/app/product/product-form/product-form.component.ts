import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  private product: any = {}; // The object where the data will be stored 
  @Input() private editable: boolean = true; // Whether the form is editable or not (accesed as an input by using a setter)
  @Output() errorEmitter: EventEmitter<boolean> = new EventEmitter(); // Emitter used to signal the parent component about a change

  @ViewChild('userForm') private form; // A reference to the form
  private error: boolean; // Whether the form contains an error or not (decided by validation logic)
  private messages: any = {}; // Error messages that will be displayed on the form


  @Input() set model(product: any) {
    this.product = product;
  }

  constructor() { }

  ngOnInit() {
    this.form.valueChanges
      .debounceTime(500)
      .subscribe(values => {

        this.error = !this.checkInputs(values);
        this.errorEmitter.emit(this.error);
      });
  }
  
  private checkInputs(values): boolean {
    let result: boolean = true;

    if (this.validateName(values.name) == false) {
      result = false;
    }

    if (this.validatePrice(values.price) == false) {
      result = false;
    }

    return result;
  }

  private validateName(name): boolean{
    if (name == null || name == "") {
      this.messages.name = undefined;
      return false;
    } 
    return true;
  }

  private validatePrice(price): boolean{
    if(price<=0){
      this.messages.price = "The price should be non-negative";
    } else {
      this.messages.price = undefined;
    }
    return true;
  }

  public validateInputs(): boolean {
    return this.checkInputs(this.form.value);
  }
}
