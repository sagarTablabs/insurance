import { Routes } from '@angular/router';

export const content: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'insurance',
    loadChildren: () => import('../../components/insurance/insurance.module').then(m => m.InsuranceModule),
    data: {
      breadcrumb: "Insurance"
    }
  },
];