import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('ctdTabset') ctdTabset;

  public loginForm: FormGroup;
  public registerForm: FormGroup;
  fieldTextType;
  isLoading: boolean = false;
  constructor(private accountService: UserService,
    private toastr: ToastrService,
    private router: Router,) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

  }


  onLoginSubmit() {
    let formData = new FormData;
    formData.append("password", this.loginForm.value.password);
    formData.append("os", "web");
    formData.append("deviceId", "89ABCDEF-01234567-89ABCDEF");
    var email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    var mobile_pattern = /^[0-9]/;

    if (email_pattern.test(this.loginForm.value.username)) {
      formData.append("emailId", this.loginForm.value.username);
      this.isLoading = true;
      this.accountService.authLoginUsingEmail(formData).subscribe(res => {
        this.isLoading = false;
        if (res.data != null) {
          let obj = {
            name: res.data.userName,
            isSuperAdmin: res.data.isSuperAdmin,
            userName: res.data.userName,
            userId: res.data.id,
            valid: res.data.valid
          }
          localStorage.setItem('userInfo', JSON.stringify(obj));
          this.router.navigate(['./dashboard/default']);
        } else {
          this.toastr.error(res.message);
        }
      })
    } else if (mobile_pattern.test(this.loginForm.value.username)) {
      formData.append("mobileNumber", this.loginForm.value.username);
      this.isLoading = true;
      this.accountService.authLoginUsingMobile(formData).subscribe(res => {
        this.isLoading = false;
        if (res.data != null) {
          let obj = {
            name: res.data.userName,
            isSuperAdmin: res.data.isSuperAdmin,
            userName: res.data.userName,
            userId: res.data.id,
            valid: res.data.valid
          }
          localStorage.setItem('userInfo', JSON.stringify(obj));
          this.router.navigate(['./dashboard/default']);
        } else {
          this.toastr.error(res.message);

        }
      })
    } else {

      this.toastr.warning('Enter Valid Credentials')
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


}
