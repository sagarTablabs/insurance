import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { common } from 'src/app/shared/common/validator';
import { ApiService } from '../api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-assign-service',
  templateUrl: './assign-service.component.html',
  styleUrls: ['./assign-service.component.scss']
})
export class AssignServiceComponent implements OnInit {
  public patientServiceForm: FormGroup;
  isLoading: boolean;
  userId: number;
  date: any;
  time: any;
  serviceList: any = [];
  patientList: any = [];
  selectedService: any = [];
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService

  ) {
    this.patientServiceForm = this.fb.group({
      patientName: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      billNumber: ['', [Validators.required]],
      cardId: [null, [Validators.required]],
      cardNumber: [null, [Validators.required]],
      costing: [null, [Validators.required]],
      date: ['', [Validators.required]],
      serviceId: [null, [Validators.required]],
      serviceName: [null, [Validators.required]],
      time: ['', [Validators.required]],
      userId: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllService();
    this.patientServiceForm.patchValue({
      date: moment().format('yyyy-MM-DD'),
      time: moment().format("h:mm A")
    })
    console.log(this.patientServiceForm.value);
  }

  submit() {
    console.log(this.patientServiceForm.value)
    this.patientServiceForm.markAllAsTouched();
    if (this.patientServiceForm.valid) {
      let obj = {
        billNumber: this.patientServiceForm.value.billNumber,
        cardId: this.patientServiceForm.value.cardId,
        costing: this.patientServiceForm.value.costing,
        date: this.patientServiceForm.value.date,
        serviceId: this.patientServiceForm.value.serviceId,
        serviceName: this.patientServiceForm.value.serviceName,
        time: this.patientServiceForm.value.time,
        userId: this.patientServiceForm.value.userId
      }
      if (this.selectedService.length == 0) {
        this.selectedService.push(obj);
        this.patientServiceForm.patchValue({
          serviceName: "",
          serviceId: null,
          costing: null

        })
      } else {
        if (!this.selectedService.find(({ serviceId }) => serviceId === obj.serviceId)) {
          this.selectedService.push(obj);
          this.patientServiceForm.patchValue({
            serviceName: "",
            serviceId: null,
            costing: null

          })
        } else {
          this.toastr.warning("Already Added")
        }
      }
      console.log(this.selectedService);
    }
  }
  search(event, type) {
    switch (type) {
      case 1:
        this.getByName(event.target.value);
        break;
      case 2:
        this.getByNumber(event.target.value);
        break;
    }
  }


  select(event, type) {
    switch (type) {
      case 1:
        this.patientList.filter(res => {
          if (res.id == event.target.value) {
            debugger;
            if (res.cardDetails != null) {
              this.patientServiceForm.patchValue({
                patientName: res.firstName + " " + res.lastName,
                userId: res.id,
                mobileNumber: res.mobileNumber,
                cardId: res.cardId,
                cardNumber: res.cardDetails.cardNumber
              })
            } else {
              this.toastr.warning("Insurance Card is not added")
            }
          }

        })
        break;
      case 2:
        this.serviceList.filter(res => {
          if (res.id == event.target.value) {
            this.patientServiceForm.patchValue({
              serviceName: res.name,
              serviceId: res.id,
              costing: res.cost

            })
          }
        }
        )
        break;

    }
  }

  removeId(id) {
    this.selectedService.splice(id, 1);
  }
  reset() {
    this.selectedService = [];
    this.patientServiceForm.reset();
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
  getAllService() {
    this.apiService.getAllSerice().subscribe(res => {
      if (res.success) {
        this.serviceList = res.data;
      }
    })
  }
  submitServiceList() {
    this.selectedService.map(res => {
      this.isLoading = true;
      this.apiService.useService(res).subscribe(res => {
        this.isLoading = false;
        if (!res.success) {
          this.toastr.error(res.message);
        }
      })
    })
  }
}
