import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { MatSidenavContent } from '@angular/material/sidenav';
import { AuthService } from './shared/service/auth.service';
import { Reviewer } from './shared/reviewer.model';
import { Router, NavigationEnd, RoutesRecognized, RouterOutlet } from '@angular/router';
import { filter, map, pairwise } from 'rxjs/operators';
import { RouteService } from './shared/service/route.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CreateMeetingRecordComponent } from './create-meeting-record/create-meeting-record.component';
import { ResponsiveService } from './shared/service/responsive.service';
import { slideInAnimation } from './shared/animation';

declare var $: any;

export const SM_WIDTH = 599;
export const MD_WIDTH = 768;
export const LG_WIDTH = 992

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation,
    trigger('openClose', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      transition('open => closed', [
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
      transition('closed => open', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
    ]),
    trigger('quickAction', [
      state('open', style({
        transform: 'translateY(0)',
        opacity: '1',
        visibility: 'visible'
      })),
      state('closed', style({
        transform: 'translateY(10px)',
        opacity: '0',
        visibility: 'hidden'
      })),
      transition('open => closed', [
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
      transition('closed => open', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
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
  quickActionOpen = false
  loginUser: Reviewer
  adminMode: boolean
  pageTitle: String
  previousRoute: String

  constructor(private authService: AuthService, private router: Router, private location: Location,
              private routeService: RouteService,private responsiveService: ResponsiveService, private dialog: MatDialog) {
    this.onResize();
    if (this.authService.isLoggedIn) {
      this.loginUser = this.authService.getUserInfo();
    }
    this.authService.change.subscribe(res => {
        this.loginUser = res.user
        this.adminMode = res.mode
        if (this.loginUser && this.adminMode === false) {
          this.loginUser.unitName = this.loginUser.unitName.split(/\s/)
                                        .reduce((result,word) => result+=word.slice(0,1),'') 

        }
    });
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
    if (this.authService.isLoggedIn()) {
      this.adminMode = this.authService.isAdminMode();
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

  userInfoTrigger() {
    this.userInfoOpen = !this.userInfoOpen;
  }

  quickActionTrigger() {
    this.quickActionOpen = !this.quickActionOpen;
  }

  showCreateRecord() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.width = "500px";
    if (this.responsiveService.checkScreensize() == "lg") {
      config.maxHeight = "700px";
    } else {
      config.maxHeight = "600px"
    }
    config.data = null;
    config.position = {};
    config.panelClass = "transfer-dialog-container";
    this.dialog.open(CreateMeetingRecordComponent, config).afterClosed()
      .subscribe(result => {
        if (result) {
          this.router.navigate(['employees/' + result.targetId])
        }
      });
  }
  
  back() {
    console.log(this.location);
    this.location.back();
  }

  logout() {
    this.authService.logout();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
