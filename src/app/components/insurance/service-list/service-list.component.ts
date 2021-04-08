import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  patientList: any = [];
  patientName: any;
  mobileNumber: number;
  serviceList: any = [];
  cardDetail: any;
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  search(event, type) {
    switch (type) {
      case 1:
        this.getByName(event.target.value);
        console.log("1", event.target.value)
        break;
      case 2:
        this.getByMobileNumber(event.target.value)
        console.log("2", event.target.value)
        break;
    }
  }
  select(event) {
    this.patientList.filter(res => {
      if (res.id == event.target.value) {
        this.patientName = res.firstName + " " + res.lastName;
        this.mobileNumber = res.mobileNumber;
        this.getUsedServiceById(res.id)
      }
    })
  }


  /* API Call */
  getByName(name) {
    this.apiService.filterByName(name).subscribe(res => {
      if (res.success) {
        this.patientList = res.data;
      }
    })
  }
  getByMobileNumber(number) {
    this.apiService.filterByphoneNumber(number).subscribe(res => {
      if (res.success) {
        this.patientList = res.data;
      }
    })
  }
  getUsedServiceById(id) {
    this.apiService.getAprovalBasedOnUser(id).subscribe(res => {
      if (res.success) {
        if (res.data != null) {
          this.serviceList = res.data;
          this.cardDetail = res.data[0].card
        } else {
          this.serviceList = [];
          this.cardDetail = null;
        }

      } else {
        this.toastr.error(res.message)
      }
    })
  }

}
