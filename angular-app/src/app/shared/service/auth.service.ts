import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import * as moment from 'moment';
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

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) { }

  login(email, password) {
    return this.http.post<any>(this.apiUrl+'login', {email, password})
    .pipe(
      tap(res => {
        this.setSession(res)
      }),
      catchError(err => {
        this.messageService.openSnackBar(authmsgConfig.errmsg, authmsgConfig.action, authmsgConfig.duration);
        return throwError('認証エラー');
      })
    );
  }

  private setSession(authResult) {
    console.log(authResult.expireIn)
    const expire = moment().add(authResult.expireIn, 'seconds');
    const user = new Reviewer(authResult.reviewer);
    localStorage.setItem('auth_token', authResult.authToken);
    localStorage.setItem('login_user', JSON.stringify(user));
    localStorage.setItem('expire_at', JSON.stringify(expire.valueOf()));

    this.pushUserInfo(user);
    this.router.navigate(['/employees']);
    this.messageService.openSnackBar(authmsgConfig.loginmsg, authmsgConfig.action, authmsgConfig.duration);
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('login_user');
    localStorage.removeItem('expire_at');
    this.pushUserInfo(null);
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

  pushUserInfo(loginUser) {
    this.change.emit(loginUser);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('login_user'));
  }
}
