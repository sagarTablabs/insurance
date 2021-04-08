import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
  superAdmin: any
  constructor(
    private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.superAdmin = JSON.parse(localStorage.getItem('userInfo')).isSuperAdmin;
    if (this.superAdmin == "true") {
      return true;
    } else {
      this.router.navigate(['dashboard/default'])
      return false
    }
  }

}
