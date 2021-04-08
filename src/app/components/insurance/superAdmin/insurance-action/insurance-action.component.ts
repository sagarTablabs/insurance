import { content } from './../../../../shared/routes/content-routes';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-insurance-action',
  templateUrl: './insurance-action.component.html',
  styleUrls: ['./insurance-action.component.scss']
})
export class InsuranceActionComponent implements OnInit {
  patientList: any = [];
  patientName: any;
  mobileNumber: number;
  serviceList: any = [];
  userId: number;
  cardDetail: any;
  currentpage = 0;
  config: any;
  constructor(
    private toastr: ToastrService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getAllUsage(this.currentpage);
    this.config = {
      itemsPerPage: 30,
      currentPage: 0,
      totalItems: 0
    }
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
    this.apiService.getUsageBasedOnUser(id).subscribe(res => {
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

  action(item, type) {
    let superAdminId = JSON.parse(localStorage.getItem('userInfo')).id;
    let action: string
    switch (type) {
      case 1:
        action = "true"
        break;
      case 2:
        action = "false"
        break;
    }
    let obj = {
      isApproved: action,
      date: item.date,
      usageId: item.id,
      adminUserId: superAdminId
    }
    this.apiService.giveApproval(obj).subscribe(res => {
      if (res.success) {
        if (this.userId != undefined || this.userId != null) {
          this.getUsedServiceById(this.userId);
        } else {
          this.getAllUsage(0);
        }

      } else {
        this.toastr.error(res.message);
      }
    })
  }

  getAllUsage(currentpage) {
    this.apiService.getAllUsages(currentpage).subscribe(res => {
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
    this.getAllUsage(event - 1);
    this.currentpage = event;
  }
}
