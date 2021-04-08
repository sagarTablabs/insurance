import { content } from './../../shared/routes/content-routes';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../insurance/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  patientList: any = [];
  count: number;
  constructor(
    private apiService: ApiService
  ) {
  }

  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  ngOnInit() {
    this.getTopPatient();
    this.getPatientCount();
  }

  getTopPatient() {
    this.apiService.getTopPatient().subscribe(res => {
      if (res.success) {
        this.patientList = res.data.content
      }
    })
  }
  getPatientCount() {
    this.apiService.getPatientCount().subscribe(res => {
      if (res.success) {
        this.count = res.data.content.length
      }
    })
  }


}
