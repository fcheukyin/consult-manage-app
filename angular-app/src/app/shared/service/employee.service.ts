import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Employee } from '../employee.model';
import { Filter } from '../filter.model';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { CsvData } from '../csvdata.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  filter: Filter = {name: '', groupName: '', unitName: '', lastMeetingStart: '', lastMeetingEnd: '' };

  private apiUrl = 'http://localhost:8080/api/employees';
  private apiUrlAdmin = 'http://localhost:8080/api/admin/employees';

  constructor(private http: HttpClient, private authService: AuthService,
              private messageService: MessageService) {}

  getEmployees(): Observable<Employee[]> {
    let loginUserId = this.authService.getUserInfo().id;
    return this.http.get<Employee[]>(this.apiUrl + '/' + loginUserId);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl + '/search/' + id);
  }
  
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrlAdmin);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/update', {employee}).pipe(
      tap(res => {
        this.messageService.openSnackBar('情報が更新されました', '閉じる', 4000);
        return 'success'
      })
    );
  }

  deleteEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(this.apiUrlAdmin + '/delete', {employee}).pipe(
      tap(res => {
        this.messageService.openSnackBar(employee.name + 'さんの停職日が更新されました', '閉じる', 4000);
        return 'success'
      })
    );
  }

  importEmployee(employees: CsvData[]): Observable<any> {
    return this.http.post<any>(this.apiUrlAdmin + '/import', {employees}).pipe(
      tap(res => {
        this.messageService.openSnackBar('従業員情報を登録しました', '閉じる', 4000);
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
