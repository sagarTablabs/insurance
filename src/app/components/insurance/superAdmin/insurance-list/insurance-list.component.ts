import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss']
})
export class InsuranceListComponent implements OnInit {
  patientList: any = [];
  patientName: any;
  mobileNumber: number;
  serviceList: any = [];
  userId: number;
  currentpage = 0;
  config: any;
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.config = {
      itemsPerPage: 30,
      currentPage: 0,
      totalItems: 0
    }
    this.getAllRequest(this.currentpage);
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
        this.userId = res.id
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
        } else {
          this.serviceList = [];
        }
      } else {
        this.toastr.error(res.message)
      }
    })
  }

  getAllRequest(currentPage) {
    this.apiService.getAllRequests(currentPage).subscribe(res => {
      if (res.success) {
        if (res.data != null) {
          this.serviceList = res.data.content;
        } else {
          this.serviceList = [];
        }
      } else {
        this.toastr.error(res.message);
      }
    })

  }

  pageChanged(event) {
    this.getAllRequest(event - 1);
    this.currentpage = event;
  }
}
