import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Observable } from 'rxjs';
import { MessageService } from './service/message.service';

export const SNACKBAR_CONFIG = {
    msg: 'ログインしてください',
    action: '閉じる',
    duration: 5*1000
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private messageService: MessageService, private router: Router) {}

    canActivate(Route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            this.messageService.openSnackBar(SNACKBAR_CONFIG.msg, SNACKBAR_CONFIG.action, SNACKBAR_CONFIG.duration);
        }
        return true
    }
}