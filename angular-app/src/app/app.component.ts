import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSidenavContent } from '@angular/material/sidenav';
import { AuthService } from './shared/service/auth.service';
import { Reviewer } from './shared/reviewer.model';

declare var $: any;

export const SM_WIDTH = 599;
export const MD_WIDTH = 768;
export const LG_WIDTH = 992

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  sidenavMode = 'side'
  sidenavOpen = true
  loginUser: Reviewer

  constructor(private authService: AuthService) {
    this.onResize();
    if (this.authService.isLoggedIn) {
      this.loginUser = this.authService.getUserInfo();
    }  
    this.authService.change.subscribe(user => this.loginUser = user);
    console.log(this.loginUser);
  }

  ngOnInit() {
    if (window.innerWidth <= SM_WIDTH) {
      this.sidenavMode = 'over';
      this.sidenavOpen = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    if (window.innerWidth <= SM_WIDTH) {
      this.sidenavMode = 'over';
      this.sidenavOpen = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavOpen = true;
    }
  }

  navOpen(e: boolean): void {
    $('.toolbar-hamburger').toggleClass('toggled');
  } 

  logout() {
    this.authService.logout();
  }
}
