import { Component, OnInit, ViewChild } from '@angular/core';

import { RegisterService } from '../service/register.service';

import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { InfoComponent } from '../dialogs/info/info.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[
    RegisterService
  ]
})
export class RegisterComponent implements OnInit {
  private user: any = {}; // The object where the data will be stored 

  @ViewChild('registerForm') private form; // A reference to the form
  private error: boolean; // Whether the form contains an error or not (decided by validation logic)
  private messages: any = {}; // Error messages that will be displayed on the form

  private password1: string;
  private password2: string;

  constructor(
    private registerService: RegisterService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .debounceTime(500)
      .subscribe(values => {

        this.error = !this.checkInputs(values);
      });
  }

  onSubmit(): void {
    if(this.validateInputs() == false){
      return;
    }

    this.registerService.register(this.user)
      .subscribe(
        user => {
          this.showMessage("Success", "The account was created. You can log in now.", true);
          this.user = {};
          this.password1 = null;
          this.password2 = null;
        },
        err =>{
          let message = "ERROR: The new user could not be added";
          if (err.status == 400) {
            message = "ERROR:" + err['error'];
          } 

          this.showMessage("Error", message, false);
        }
      )
  }

  private checkInputs(values): boolean {
    let result: boolean = true;

    if (this.validateUsername(values.username) == false) {
      result = false;
    }

    if (this.validatePassword(this.password1, this.password2) == false) {
      result = false;
    } else {
      this.user.password = this.password1;
    }

    if (this.validateFullName(values.fullName) == false) {
      result = false;
    }

    if (this.validateEmail(values.email) == false) {
      result = false;
    }

    if (this.validatePhoneNumber(values.phoneNumber) == false) {
      result = false;
    }

    return result;
  }

  private validateUsername(username): boolean {
    if (username == null || username == "") {
      this.messages.username = null;
      return false;
    } else {
      if (username.match(/^[a-zA-Z][a-zA-Z_0-9]*$/) == null) {
        this.messages.username = "Invalid username. Usernames should begin with a letter and contain only letters, digits and underscores";
        return false;
      } else {
        this.messages.username = null;
        return true;
      }
    }
  }

  private validatePassword(password1, password2): boolean{
    if (password1 == null || password1 == "") {
      this.messages.password = null;
      return false;
    }

    if (password2 == null || password2 == "") {
      this.messages.password = null;
      return false;
    }

    if (password1 != password2){
      this.messages.password = "The passwords must match";
      return false;
    }

    return true;
  }

  private validateFullName(fullName): boolean {
    if (fullName == null || fullName == "") {
      this.messages.fullName = null;
      return false;
    } else {
      if (fullName.match(/^[a-zA-Z ]+$/) == null) {
        this.messages.fullName = "Error: Full name should contain only alphabetic characters and spaces";
        return false;
      } else {
        this.messages.fullName = null;
        return true;
      }
    }
  }

  private validateEmail(email): boolean{
    return true;
  }

  private validatePhoneNumber(phoneNumber): boolean{
    return true;
  }

  public validateInputs(): boolean {
    return this.checkInputs(this.form.value);
  }

  showMessage(title: string, message: string, success: boolean): void {
    this.dialogService.addDialog(
      InfoComponent,
      {
        title: title,
        message: message,
        success: success
      }
    );
  }
}
