import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Patient', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/insurance/patient/add', title: 'Add patient', type: 'link' },
				{ path: '/insurance/patient/list', title: 'patient List', type: 'link' },
				{ path: '/insurance/patient/document', title: 'Patient Document', type: 'link' }
			]
		},
		{
			title: 'Assign Card', icon: 'credit-card', path: '/insurance/card/assign', type: 'link', active: false,
		},
		{
			title: 'Assign Service', icon: 'check-square', type: 'sub', active: false, children: [
				// { path: '/insurance/service/add', title: 'Add Service', type: 'link' },
				{ path: '/insurance/service/assign', title: 'Assign Service', type: 'link' },
				{ path: '/insurance/service/list', title: 'Service List', type: 'link' },
			]
		},
	]
	ADMINMENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Insurance', icon: 'check-square', type: 'sub', active: false, children: [
				{ path: '/insurance/superadmin/action', title: 'Insurance Approval', type: 'link' },
				{ path: '/insurance/superadmin/list', title: 'Insurance List', type: 'link' },
				{ path: '/insurance/patient/document', title: 'Patient Document', type: 'link' }
			]
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	admin = new BehaviorSubject<Menu[]>(this.ADMINMENUITEMS);
}
