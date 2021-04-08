import { common } from './../../../shared/common/validator';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {
  file;
  patientList: any = []
  public patientForm: FormGroup;
  closeResult: string;
  isLoading: boolean;
  patientId: number;
  patientName: any;
  mobileNumber: number;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private apiService: ApiService

  ) {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(common.onlyAlphabetRegex)]],
      middleName: ['', [Validators.required, Validators.pattern(common.onlyAlphabetRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(common.onlyAlphabetRegex)]],
      adharNumber: ['', [Validators.required, Validators.pattern(common.aadharRegex)]],
      panNumber: ['', [Validators.pattern(common.panNoRegex)]],
      dringLicence: ['', [Validators.pattern(common.licence)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(common.phoneNumberRegex)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.pattern(common.addressRegex)]]
    });
  }

  ngOnInit(): void {

  }
  @ViewChild("fileInput", { static: false }) myInput: ElementRef;
  readFile(event) {
    console.log(event.target.files[0].type);
    if (event.target.files[0].type === "application/pdf") {
      const file = event.target.files[0];
      this.file = file;
    } else {
      this.toastr.error("Please upload .pdf file.");
      return (event.target.value = null);
    }
    console.log(this.file);
  }

  submit(content) {
    this.patientForm.markAllAsTouched();
    if (this.patientForm.valid) {
      let obj = {
        aadharCard: this.patientForm.value.adharNumber,
        address: this.patientForm.value.address,
        drivingLicense: this.patientForm.value.dringLicence,
        emailId: this.patientForm.value.email,
        firstName: this.patientForm.value.firstName,
        lastName: this.patientForm.value.lastName,
        middleName: this.patientForm.value.middleName,
        mobileNumber: this.patientForm.value.mobileNumber,
        panCard: this.patientForm.value.panNumber
      }
      this.addPatient(obj);
      console.log(obj);
    }
  }

  modelopen(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {

          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }


  /* API Call */
  addPatient(obj) {
    this.isLoading = true;
    this.apiService.addPatient(obj).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.toastr.success(res.message);
        this.patientForm.reset();
      } else {
        this.toastr.error(res.message);
      }
    })
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

  select(event, type) {
    switch (type) {
      case 1:
        this.patientList.filter(res => {
          if (res.id == event.target.value) {
            this.patientName = res.firstName + " " + res.lastName;
            this.patientId = res.id;
            this.mobileNumber = res.mobileNumber;
          }
        })
        break;
    }
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
  upload() {
    const formData = new FormData();
    formData.append("userId", JSON.stringify(this.patientId));
    formData.append("file", this.file);
    this.isLoading = true;
    this.apiService.fileUpload(formData).subscribe(res => {
      this.isLoading = false;
      if (res.success) {
        this.mobileNumber = null,
          this.patientId = null,
          this.patientName = "",
          this.file = ""
        this.toastr.success(res.message);
      } else {
        this.toastr.error(res.message);
      }
    }
    );
  }
}
