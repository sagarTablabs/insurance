import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdmin: any
  constructor(
    private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isAdmin = JSON.parse(localStorage.getItem('userInfo')).isSuperAdmin;
    if (this.isAdmin == "false") {
      return true;
    } else {
      this.router.navigate(['dashboard/default'])
      return false
    }
  }

}
