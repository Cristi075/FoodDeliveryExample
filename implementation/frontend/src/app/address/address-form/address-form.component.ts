import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  private address: any = {}; // The object where the data will be stored 
  @Input() private editable: boolean = true; // Whether the form is editable or not (accesed as an input by using a setter)
  @Output() errorEmitter: EventEmitter<boolean> = new EventEmitter(); // Emitter used to signal the parent component about a change

  @ViewChild('addressForm') private form; // A reference to the form
  private error: boolean; // Whether the form contains an error or not (decided by validation logic)
  private messages: any = {}; // Error messages that will be displayed on the form

  @Input() set model(address: any) {
    this.address = address;
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

    if (this.validateCity(values.city) == false) {
      result = false;
    }

    if (this.validateStreet(values.street) == false) {
      result = false;
    }

    if (this.validateNumber(values.numbere) == false){
      result = false;
    }

    return result;
  }

  private validateCity(city): boolean{
    if (city == null || city == "") {
      this.messages.city = undefined;
      return false;
    } 
    return true;
  }

  private validateStreet(street): boolean{
    
    return true;
  }

  private validateNumber(number): boolean{
    
    return true;
  }

  public validateInputs(): boolean {
    return this.checkInputs(this.form.value);
  }
}
