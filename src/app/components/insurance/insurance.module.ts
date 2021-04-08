import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { InsuranceListComponent } from './superAdmin/insurance-list/insurance-list.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';

import 'hammerjs';
import 'mousetrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssignCardComponent } from './assign-card/assign-card.component';
import { AssignServiceComponent } from './assign-service/assign-service.component';
import { InsuranceActionComponent } from './superAdmin/insurance-action/insurance-action.component';
import { PatientReadFileComponent } from './patient-read-file/patient-read-file.component';

@NgModule({
  declarations: [
    AddPatientComponent,
    AddServiceComponent,
    PatientListComponent,
    ServiceListComponent,
    InsuranceListComponent,
    AssignCardComponent,
    AssignServiceComponent,
    InsuranceActionComponent,
    PatientReadFileComponent
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    HttpClientModule,
    NgbModule,
    SharedModule,

    GalleryModule.forRoot()
  ],
  providers: [
    NgbActiveModal,
    ApiService
  ]
})
export class InsuranceModule { }
