import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../service/profile.service';

import { DialogService } from 'ng2-bootstrap-modal';
import { InfoComponent } from '../dialogs/info/info.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [
    ProfileService
  ]
})
export class ProfileComponent implements OnInit {

  @ViewChild('userForm') private form; 
  private user: any = {};
  private messages: any = {};
  private error: boolean = true;


  constructor(
    private profileService: ProfileService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {

    this.form.valueChanges
      .debounceTime(500)
      .subscribe(values => {

        this.error = !this.checkInputs(values);
      });

    this.profileService.getProfile()
      .subscribe(profile => this.user = profile);
  }

  private onSubmit(): void {
    this.profileService.updateProfile(this.user)
      .subscribe(
        user => {
          this.showMessage("Success", "Your profile was edited succesfully.", true);
        },
        err => {
          let message = "ERROR: Your profile could not be edited.";
          if (err.status == 400) {
            message = "ERROR:" + err['error'];
          } 

          this.showMessage("Error", message, false);
        }
      );
  }

  private checkInputs(values): boolean {
    let result: boolean = true;

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
