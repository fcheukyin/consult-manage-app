import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../position.model';
import { Motivation } from '../motivation.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MotivationService {

  private apiUrl = 'http://localhost:8080/api/motivations';

  constructor(private http: HttpClient) { }

  getMotivations(): Observable<Motivation[]> {
    return this.http.get<Motivation[]>(this.apiUrl);
  }
}