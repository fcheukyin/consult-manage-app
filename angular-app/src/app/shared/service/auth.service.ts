import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators'
import * as moment from 'moment';
import { POSITION } from '../../config/config';
import { Reviewer } from '../reviewer.model';
import { Employee } from '../employee.model';
import { MessageService } from './message.service'

export const authmsgConfig = {
  loginmsg: 'ログインしました',
  errmsg: 'ログイン情報が間違っています',
  logoutmsg: 'ログアウトしました',
  action: '閉じる',
  duration: 5 * 1000
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/';

  adminMode = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  @Output() modeChange: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) { }

  login(email, password) {
    return this.http.post<any>(this.apiUrl+'login', {email, password})
    .pipe(
      delay(4000),
      tap(res => {
          this.setSession(res)
      }),
      catchError(err => {
        this.messageService.openSnackBar(authmsgConfig.errmsg, authmsgConfig.action, authmsgConfig.duration);
        return '認証エラー';
      })
    );
  }

  private setSession(authResult) {
    const expire = moment().add(authResult.expireIn, 'seconds');
    var user = new Reviewer(authResult.reviewer? authResult.reviewer:authResult.admin);
    if (authResult.reviewer) {
      user.admin = false;
      this.setNormalMode();
      this.pushUserInfo(user, false);
      this.router.navigate(['dashboard']);
    }
    if (authResult.admin) {
      user.admin = true;
      this.setAdminMode();
      this.pushUserInfo(user, true);
      this.router.navigate(['admin/home']);
    }
    localStorage.setItem('auth_token', authResult.authToken);
    localStorage.setItem('login_user', JSON.stringify(user));
    localStorage.setItem('expire_at', JSON.stringify(expire.valueOf()));
    this.messageService.openSnackBar(authmsgConfig.loginmsg, authmsgConfig.action, authmsgConfig.duration);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('login_user');
    localStorage.removeItem('expire_at');
    this.setNormalMode();
    this.pushUserInfo(null, false);
    this.router.navigate(['/login']);
    this.messageService.openSnackBar(authmsgConfig.logoutmsg, authmsgConfig.action, authmsgConfig.duration);
  }

  isLoggedIn() {
    var expireAt = localStorage.getItem('expire_at');
    if (expireAt) {
      expireAt = JSON.parse(expireAt);
            
      if (!moment().isBefore(moment(expireAt))) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  pushUserInfo(loginUser, mode) {
    this.change.emit({user: loginUser, mode: mode});
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('login_user'));
  }

  checkLoginUser(employee: Employee) {
    var loginUser: Reviewer = this.getUserInfo();
    if (loginUser.positionId == POSITION.UD) {
      if (loginUser.unitId == employee.unitId) {
        return true
      }
      return false
    }
    if (loginUser.positionId == POSITION.GD) {
      if (loginUser.groupId == employee.groupId) {
        return true
      }
      return false
    }
    if (loginUser.positionId == POSITION.DD) {
      return true
    }
  }

  setAdminMode() {
    this.adminMode = true;
  }

  setNormalMode() {
    this.adminMode = false;
  }

  isAdminMode() {
    return this.getUserInfo().admin;
  }
}
