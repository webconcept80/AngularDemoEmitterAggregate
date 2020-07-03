import { constants } from './../../app.constants';
import { EmitterService } from './../../core/services/emitter.service';
import { AppService } from './../../core/services/app.service';
import { UserService } from './../../core/services/user.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  ngModalRef: NgbModalRef;
  userRegisterForm: FormGroup;
  data: any;
  isNewRecord = true;

  constructor(
    public fb: FormBuilder,
    private userService: UserService,
    private emitterService: EmitterService
  ) {}

  ngOnInit(): void {
    this.userForm();
  }

  userForm() {
    this.userRegisterForm = this.fb.group({
      profile: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
    });

    if (AppService.isNotUndefinedAndNull(this.data)) {
      this.userRegisterForm.removeControl('email');
      this.isNewRecord = false;

      this.userRegisterForm.setValue({
        profile: this.data.profile,
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        city: this.data.city,
        gender: this.data.gender,
      });
    }
  }

  registerUser() {
    if (this.isNewRecord) {
      this.userService.addUser(this.userRegisterForm.value).subscribe(
        (result) => {
          console.log('User Added!');
          this.emitterService.emit(constants.events.loadUsersCount);
          this.ngModalRef.close(result);
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
    } else {
      const userData = this.userRegisterForm.value;

      this.data.profile = userData.profile;
      this.data.firstName = userData.firstName;
      this.data.lastName = userData.lastName;
      this.data.city = userData.city;
      this.data.gender = userData.gender;

      this.userService.updateUser(this.data).subscribe(
        (result) => {
          console.log('User Updated!');
          this.ngModalRef.close(result);
        },
        (error) => {
          console.log('Error: ' + error);
        }
      );
    }
  }

  closeWindow() {
    this.ngModalRef.dismiss('Cross Click');
  }
}
