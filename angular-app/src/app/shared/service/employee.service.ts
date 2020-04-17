import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../employee.model';
import { Filter } from '../filter.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  filter: Filter = {name: '', groupName: '', unitName: '', lastMeetingStart: '', lastMeetingEnd: '' };

  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl + '/' + id);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.apiUrl, employee, httpOptions);
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
