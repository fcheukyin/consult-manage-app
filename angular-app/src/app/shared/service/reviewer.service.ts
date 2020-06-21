import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Employee } from '../employee.model';
import { Filter } from '../filter.model';
import { AuthService, authmsgConfig } from './auth.service';
import { Reviewer } from '../reviewer.model';
import { MessageService } from './message.service';
import { CsvData } from '../csvdata.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewerService {

  filter: Filter = {name: '', groupName: '', unitName: '', lastMeetingStart: '', lastMeetingEnd: '' };

  private apiUrl = 'http://localhost:8080/api/reviewers';
  private apiUrlAdmin = 'http://localhost:8080/api/admin/reviewers';

  constructor(private http: HttpClient, private authService: AuthService,
              private messageService: MessageService) {}

  getReviewerById(id: number): Observable<Reviewer> {
    return this.http.get<Reviewer>(this.apiUrl + '/search/' + id);
  }
  
  getAllReviewers(): Observable<Reviewer[]> {
    return this.http.get<Reviewer[]>(this.apiUrlAdmin);
  }

  updateReviewer(reviewer: Reviewer): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/update', {reviewer}).pipe(
      tap(res => {
        this.messageService.openSnackBar('情報が更新されました', '閉じる', 4000);
        return 'success'
      }),
      catchError(err => {
        if (err.error.errors[0].path === 'reviewers.email_UNIQUE') {
          this.messageService.openSnackBar('メールアドレスが既に登録されています', '閉じる', 10000);
        }
        return throwError('エラー');
      })
    );
  }

  deleteReviewer(reviewer: Reviewer): Observable<any> {
    return this.http.post<any>(this.apiUrlAdmin + '/delete', {reviewer}).pipe(
      tap(res => {
        this.messageService.openSnackBar(reviewer.name + 'さんのアカウント停止日が更新されました', '閉じる', 4000);
        return 'success'
      })
    );
  }

  importReviewer(reviewers: CsvData[]): Observable<any> {
    return this.http.post<any>(this.apiUrlAdmin + '/import', {reviewers}).pipe(
      tap(res => {
        this.messageService.openSnackBar('評価者情報を登録しました', '閉じる', 4000);
        return 'success'
      })
    );
  }

  getFilter(): Filter {
    return this.filter;
  }

  resetFilter(): void {
    this.filter.name = '';
    this.filter.groupName = '';
    this.filter.unitName = '';
    this.filter.lastMeetingStart = null;
    this.filter.lastMeetingEnd = null;
  }

}
