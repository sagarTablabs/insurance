import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-patient-read-file',
  templateUrl: './patient-read-file.component.html',
  styleUrls: ['./patient-read-file.component.scss']
})
export class PatientReadFileComponent implements OnInit {
  @ViewChild('editModal') editModal: TemplateRef<any>; // Note: TemplateRef
  patientList: any = [];
  patientId: number;
  patientName: any;
  mobileNumber: number;
  fileURL;
  closeResult: string;

  constructor(
    private toastr: ToastrService,
    private apiService: ApiService,
    public sanitizer: DomSanitizer,
    private modalService: NgbModal
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
  select(event, type) {
    switch (type) {
      case 1:
        this.patientList.filter(res => {
          if (res.id == event.target.value) {
            this.patientName = res.firstName + " " + res.lastName;
            this.patientId = res.id;
            this.mobileNumber = res.mobileNumber;
            this.getDocument(this.patientId);
          }
        })
        break;
    }
  }

  openModal() {
    this.modalService.open(this.editModal, { size: 'lg', backdrop: 'static' });
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
  getDocument(id) {
    this.apiService.getPatientDocument(id).subscribe(file => {
      this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(file)
      )
      console.log(this.fileURL);
    })
    this.openModal()
  }
}
