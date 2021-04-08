import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Common } from 'src/app/shared/validatation/commonValdiation';
import { UserService } from '../service/user.service';

enum showModel {
  isgenerate = 1,
  isVerifiy = 2,
  isReset = 3,
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  emailId: string;
  state
  otp: string;
  resetForm: FormGroup;
  fieldTextType: boolean = false;
  isLoading: boolean = false;
  constructor(
    private accountService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.state = showModel.isgenerate
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.pattern(Common.passwordRegex)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(Common.passwordRegex)]),

    },
    );
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  generate() {
    if (this.emailId != null || this.emailId != undefined) {
      let formData = new FormData();
      formData.append('emaiId', this.emailId);
      formData.append('subject', "Generate OTP");
      this.isLoading = true;
      this.accountService.generateOTP(formData).subscribe(res => {
        this.isLoading = false
        if (res.success) {
          this.state = showModel.isVerifiy;
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message);
        }
      })
    } else {
      this.toastr.warning("Please Enter emailId");
    }
  }
  backToGenerate() {
    this.state = showModel.isgenerate;

  }
  goToReset() {
    if (this.otp != null || this.otp != undefined) {
      let formData = new FormData();
      formData.append('emailId', this.emailId);
      formData.append('otp', this.otp);
      this.isLoading = true;
      this.accountService.verifyOTP(formData).subscribe(res => {
        this.isLoading = false;
        if (res.success) {
          this.state = showModel.isReset;
          this.toastr.success(res.message);
        } else {
          this.toastr.error(res.message, "Error..!");
        }
      })
    }

  }

  resetPassword() {
    if (this.resetForm.valid) {
      if (this.resetForm.value.newPassword == this.resetForm.value.confirmPassword) {
        let formData = new FormData();
        formData.append('emailId', this.emailId);
        formData.append('password', this.resetForm.value.newPassword);
        this.isLoading = true;
        this.accountService.resetPassword(formData).subscribe(res => {
          this.isLoading = false;
          if (res.success) {
            this.toastr.success(res.message, "Success..!");
            this.router.navigate(['./auth/login']);
          } else {
            this.toastr.error(res.message, "Error..!");
          }
        })

      } else {
        this.toastr.warning("New Password and Confirm Password does not match", 'Warning..!');
      }
    }
  }

}
