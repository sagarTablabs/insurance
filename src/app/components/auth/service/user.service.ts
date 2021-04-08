import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  registerUser(obj): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'Customers', obj);
  }
  authLoginUsingEmail(obj) {
    return this.http.post<any>(this.baseUrl + 'authLogin/emailId', obj);
  }
  authLoginUsingMobile(obj) {
    return this.http.post<any>(this.baseUrl + 'authLogin/mobileNumber', obj);
  }
  generateOTP(obj) {
    return this.http.post<any>(this.baseUrl + 'SendEmail', obj);
  }
  verifyOTP(obj) {
    return this.http.post<any>(this.baseUrl + 'verifyOtp', obj);
  }
  resetPassword(obj) {
    return this.http.post<any>(this.baseUrl + 'resetPassword', obj);
  }
}
