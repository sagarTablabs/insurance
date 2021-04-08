import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  /////////////////////// Users ///////////////////////////////
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
  /////////////////////Pattient//////////////////
  addPatient(obj): Observable<any> {
    return this.http.post(this.baseUrl + 'user', obj)
  }
  getPatient(page): Observable<any> {
    return this.http.get(this.baseUrl + `users?size=30&page=${page}`);
  }
  getPatientCount(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }
  updatePatient(obj): Observable<any> {
    return this.http.put(this.baseUrl + 'user', obj)
  }
  filterByName(name): Observable<any> {
    return this.http.get(this.baseUrl + `users/filter?name=${name}`)
  }
  filterByphoneNumber(number): Observable<any> {
    return this.http.get(this.baseUrl + `users/filter?phoneNumber=${number}`)
  }
  filterByAdhar(adhar): Observable<any> {
    return this.http.get(this.baseUrl + `users/filter?aadharCard=${adhar}`)
  }
  getTopPatient(): Observable<any> {
    return this.http.get(this.baseUrl + `users?size=5&page=0`);
  }

  ///////////////////////////// Card  //////////////////////////////////////////

  createCard(): Observable<any> {
    return this.http.post(this.baseUrl + 'card', '')
  }
  filterCard(cardNumber): Observable<any> {
    return this.http.get(this.baseUrl + `card/cardNumber?cardNumber=${cardNumber}`)
  }
  asignCardToUser(obj): Observable<any> {
    return this.http.post(this.baseUrl + 'card/user', obj)
  }

  ///////////////////////////////// Service /////////////////////////////////////////////////
  getAllSerice(): Observable<any> {
    return this.http.get(this.baseUrl + "services");
  }
  useService(obj): Observable<any> {
    return this.http.post(this.baseUrl + "usage", obj);
  }

  getUsageBasedOnUser(id): Observable<any> {
    return this.http.get(this.baseUrl + `usage/userId?userId=${id}`);
  }

  ///////////////////////////Super Admin////////////////////////
  giveApproval(obj): Observable<any> {
    return this.http.post(this.baseUrl + 'approval', obj);
  }
  getAllUsages(page): Observable<any> {
    return this.http.get(this.baseUrl + `usage?size=30&page=${page}`);
  }

  getAllRequests(page): Observable<any> {
    return this.http.get(this.baseUrl + `approval?size=30&page=${page}`);
  }
  getAprovalBasedOnUser(id): Observable<any> {
    return this.http.get(this.baseUrl + `approval/userId?userId=${id}`);
  }

  ////////////////////////////////// FILE ///////////////////////////
  fileUpload(obj): Observable<any> {
    return this.http.post(this.baseUrl + 'upload', obj);
  }
  getPatientDocument(id): Observable<any> {
    return this.http.get(this.baseUrl + `getFile?userId=${id}`, {
      responseType: "blob",
    })
  }
}
