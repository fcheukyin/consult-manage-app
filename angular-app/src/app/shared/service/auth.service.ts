import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reviewer } from '../reviewer.model';
import { Employee } from '../employee.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  login(email, password):Observable<Reviewer> {
    console.log(email);
    console.log(password);
    return this.http.post<Reviewer>(this.apiUrl+'login', {email, password});

  }
}
