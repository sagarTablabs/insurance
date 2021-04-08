import { common } from './../../../shared/common/validator';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  @ViewChild('editModal') editModal: TemplateRef<any>; // Note: TemplateRef
  public updatepatientForm: FormGroup;
  patientList: any = [];
  closeResult: string;
  isLoading: boolean;
  currentpage = 0
  config: any;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private apiService: ApiService
  ) {
    this.updatepatientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(common.onlyAlphabetRegex)]],
      middleName: ['', [Validators.required, Validators.pattern(common.onlyAlphabetRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(common.onlyAlphabetRegex)]],
      adharNumber: ['', [Validators.required, Validators.pattern(common.aadharRegex)]],
      panNumber: ['', [Validators.pattern(common.panNoRegex)]],
      dringLicence: ['', [Validators.pattern(common.licence)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(common.phoneNumberRegex)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.pattern(common.addressRegex)]],
      id: [null, [Validators.required]],
      cardId: [null],
      cardNumber: [null]
    });
  }

  ngOnInit(): void {
    this.getPatientlist(this.currentpage);
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


  /* Update Model */
  openModal(item) {
    console.log(item)
    this.updatepatientForm.patchValue({
      firstName: item.firstName,
      middleName: item.middleName,
      lastName: item.lastName,
      adharNumber: item.aadharCard,
      panNumber: item.panCard,
      dringLicence: item.drivingLicense,
      mobileNumber: item.mobileNumber,
      email: item.emailId,
      address: item.address,
      id: item.id,
      cardId: item.cardId,
      cardNumber: item.cardNumber
    })
    this.modalService.open(this.editModal, { size: 'lg', backdrop: 'static' });
  }



  submit() {
    this.updatepatientForm.markAllAsTouched();
    if (this.updatepatientForm.valid) {
      let obj = {
        aadharCard: this.updatepatientForm.value.adharNumber,
        address: this.updatepatientForm.value.address,
        drivingLicense: this.updatepatientForm.value.dringLicence,
        emailId: this.updatepatientForm.value.email,
        firstName: this.updatepatientForm.value.firstName,
        lastName: this.updatepatientForm.value.lastName,
        middleName: this.updatepatientForm.value.middleName,
        mobileNumber: this.updatepatientForm.value.mobileNumber,
        panCard: this.updatepatientForm.value.panNumber,
        id: this.updatepatientForm.value.id,
        cardId: this.updatepatientForm.value.cardId,
        cardNumber: this.updatepatientForm.value.cardNumber,
      }
      // this.updatePatient(obj);
      this.apiService.updatePatient(obj).subscribe(res => {
        if (res.success) {
          this.getPatientlist(this.currentpage);
          this.toastr.success(res.message);
          this.modalService.dismissAll();
        } else {
          this.toastr.error(res.message);
        }
      })
    }
  }

  /* API Call */
  updatePatient(obj) {
    this.isLoading = true;
    this.apiService.addPatient(obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.toastr.success(res.message);
        this.updatepatientForm.reset();
      } else {
        this.toastr.error(res.message);
      }
    })
  }


  getPatientlist(currentpage) {
    this.apiService.getPatient(currentpage).subscribe(res => {
      if (res.success) {
        this.patientList = res.data.content;
      } else {
        this.toastr.error(res.message);
      }
    })
  }

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

  pageChanged(event) {
    this.getPatientlist(event - 1);
    this.currentpage = event;
  }
}
