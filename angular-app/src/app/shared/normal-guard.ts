import { Injectable } from "@angular/core";
import {Location} from '@angular/common';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Observable } from 'rxjs';
import { MessageService } from './service/message.service';
import { RouteService } from './service/route.service';

export const SNACKBAR_CONFIG = {
    msg: '通常ユーザーでログインしてください',
    action: '閉じる',
    duration: 5*1000
}

@Injectable()
export class NormalGuard implements CanActivate {
    constructor(private authService: AuthService, private messageService: MessageService, private router: Router,
                private routeService: RouteService) {}

    canActivate(Route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (this.authService.isAdminMode()) {
            this.messageService.openSnackBar(SNACKBAR_CONFIG.msg, SNACKBAR_CONFIG.action, SNACKBAR_CONFIG.duration);
            return false;
        }
        return true
    }
}