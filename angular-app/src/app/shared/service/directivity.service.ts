import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../position.model';
import { Motivation } from '../motivation.model';
import { Directivity } from '../directivity.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DirectivityService {

  private apiUrl = 'http://localhost:8080/api/directivities';

  constructor(private http: HttpClient) { }

  getDirectivities(): Observable<Directivity[]> {
    return this.http.get<Directivity[]>(this.apiUrl);
  }
}