import { ApiService } from './../api.service';
import { filter, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-card',
  templateUrl: './assign-card.component.html',
  styleUrls: ['./assign-card.component.scss']
})
export class AssignCardComponent implements OnInit {
  patientName: any;
  adharNumber: number;
  mobileNumber: number;
  patientId: number;
  cardDetail: any;
  cardId: number;
  cardNumber: number;
  isLoading: boolean;
  patientList: any = [];
  userIds: any = [];
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    console.log(this.cardDetail);
  }
  createCard() {

  }
  generateCard() {
    this.isLoading = true;
    this.apiService.createCard().subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.cardDetail = res.data;
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    })
  }
  search(event, type) {
    switch (type) {
      case 1:
        this.getByName(event.target.value);
        break;
      case 2:
        this.getByNumber(event.target.value);
        break;
      case 3:
        this.getByAdhar(event.target.value);
        break;
      case 4:
        this.getFilterCard(event.target.value);
        break;
    }
  }

  select(event, type) {
    switch (type) {
      case 1:
        this.patientList.filter(res => {
          if (res.id == event.target.value) {
            this.patientName = res.firstName + " " + res.lastName;
            this.mobileNumber = res.mobileNumber;
            this.adharNumber = res.aadharCard;
            this.patientId = res.id;
            if (res.cardDetails != null) {
              this.cardDetail = res.cardDetails;
              this.cardNumber = res.cardDetails.cardNumber;
              this.cardId = res.cardId
            }
          }
        })
        break;

    }
  }

  assignCard() {
    if (this.userIds.length == 0) {
      this.userIds.push({ name: this.patientName, mobile: this.mobileNumber, id: this.patientId })
    } else {
      if (!this.userIds.find(({ id }) => id === this.patientId)) {
        this.userIds.push({ name: this.patientName, mobile: this.mobileNumber, id: this.patientId })
      } else {
        this.toastr.warning("Already Added");
      }
    }

  }
  removeId(id) {
    this.userIds.splice(id, 1);
  }
  /* API CALL */
  getByName(name) {
    this.apiService.filterByName(name).subscribe(res => {
      if (res.success) {
        this.patientList = [];
        this.patientList = res.data;
      }
    })
  }
  getByNumber(number) {
    this.apiService.filterByphoneNumber(number).subscribe(res => {
      if (res.success) {
        this.patientList = [];
        this.patientList = res.data;
      }
    })
  }
  getByAdhar(adhar) {
    this.apiService.filterByAdhar(adhar).subscribe(res => {
      if (res.success) {
        this.patientList = [];
        this.patientList = res.data;
      }
    })
  }
  getFilterCard(cardNumber) {
    this.apiService.filterCard(cardNumber).subscribe(res => {
      if (res.success) {
        this.cardDetail = res.data;
        this.cardNumber = res.data.cardNumber;
        this.cardId = res.data.id
      }
    })
  }
  submiyList() {
    let ids: any = [];
    this.userIds.map(res => {
      console.log(res);
      ids.push(res.id);
    })
    let obj = {
      cardId: this.cardId,
      userIds: ids
    }
    this.isLoading = true;
    this.apiService.asignCardToUser(obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.toastr.success(res.message);
        this.userIds = [];
      } else {
        this.toastr.error(res.message);
      }
    })
  }


}
