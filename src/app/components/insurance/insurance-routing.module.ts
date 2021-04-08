import { SuperAdminGuard } from './../guard/super-admin.guard';
import { PatientReadFileComponent } from './patient-read-file/patient-read-file.component';
import { InsuranceListComponent } from './superAdmin/insurance-list/insurance-list.component';
import { InsuranceActionComponent } from './superAdmin/insurance-action/insurance-action.component';
import { AssignServiceComponent } from './assign-service/assign-service.component';
import { AssignCardComponent } from './assign-card/assign-card.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'patient/add',
        component: AddPatientComponent,
        data: {
          title: "Add patient",
          breadcrumb: "Add patient"
        },
        canActivate: [AdminGuard]
      },
      {
        path: 'patient/list',
        component: PatientListComponent,
        data: {
          title: "Patient List",
          breadcrumb: "Patient List"
        },
      },
      {
        path: 'patient/document',
        component: PatientReadFileComponent,
        data: {
          title: "Patient Document",
          breadcrumb: "Patient Document"
        }
      },
      {
        path: 'service/add',
        component: ServiceListComponent,
        data: {
          title: "Add Service",
          breadcrumb: "Add Service"
        }
      },
      {
        path: 'service/list',
        component: ServiceListComponent,
        data: {
          title: "Service list",
          breadcrumb: "Service list"
        },
        canActivate: [AdminGuard]
      },
      {
        path: 'service/assign',
        component: AssignServiceComponent,
        data: {
          title: "Assign Service",
          breadcrumb: "Assign Service"
        },
        canActivate: [AdminGuard]
      },
      {
        path: 'card/assign',
        component: AssignCardComponent,
        data: {
          title: "Assign Card",
          breadcrumb: "Assign Card"
        },
        canActivate: [AdminGuard]
      },
      {
        path: 'superadmin/action',
        component: InsuranceActionComponent,
        data: {
          title: "Insurance Approval",
          breadcrumb: "Insurance Approval"
        },
        canActivate: [SuperAdminGuard]
      },
      {
        path: 'superadmin/list',
        component: InsuranceListComponent,
        data: {
          title: "Insurance List",
          breadcrumb: "Insurance List"
        },
        canActivate: [SuperAdminGuard]
      }

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
