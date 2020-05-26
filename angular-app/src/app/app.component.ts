import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { MatSidenavContent } from '@angular/material/sidenav';
import { AuthService } from './shared/service/auth.service';
import { Reviewer } from './shared/reviewer.model';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, map, pairwise } from 'rxjs/operators';
import { RouteService } from './shared/service/route.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare var $: any;

export const SM_WIDTH = 599;
export const MD_WIDTH = 768;
export const LG_WIDTH = 992

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      transition('open => closed', [
        animate('200ms linear')
      ]),
      transition('closed => open', [
        animate('200ms linear')
      ]),
    ]),
    trigger('userinfoOverlay', [
      state('hide', style({
        opacity: '0',
      })),
      state('show', style({
        opacity: '.4',
      })),
      transition('show => hide', [
        animate('150ms linear')
      ]),
      transition('hide => show', [
        animate('150ms linear')
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit{

  sidenavMode = 'side'
  sidenavOpen = true
  userInfoOpen = false
  loginUser: Reviewer
  pageTitle: String;
  previousRoute: String;

  constructor(private authService: AuthService, private router: Router, private location: Location,
              private routeService: RouteService) {
    this.onResize();
    if (this.authService.isLoggedIn) {
      this.loginUser = this.authService.getUserInfo();
    }  
    this.authService.change.subscribe(user => this.loginUser = user);
    this.routeService.getTitle(this.router);
    this.routeService.getPreviousRoute(this.router);
  }

  ngOnInit() {
    if (window.innerWidth <= SM_WIDTH) {
      this.sidenavMode = 'over';
      this.sidenavOpen = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavOpen = true;
    }
    this.routeService.routeTitle.subscribe(title => {
      this.pageTitle = title;
    });
    this.routeService.previousRoute.subscribe(prevRoute => {
      this.previousRoute = prevRoute;
    })

    
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

  userInfoTrigger() {
    this.userInfoOpen = !this.userInfoOpen;
  }
  
  back() {
    console.log(this.location);
    this.location.back();
  }

  logout() {
    this.authService.logout();
  }
}
