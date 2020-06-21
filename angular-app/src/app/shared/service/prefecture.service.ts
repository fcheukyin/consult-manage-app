import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../position.model';
import { Motivation } from '../motivation.model';
import { Prefecture } from '../prefecture.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PrefectureService {

  private apiUrl = 'http://localhost:8080/api/prefectures';

  constructor(private http: HttpClient) { }

  getPrefectures(): Observable<Prefecture[]> {
    return this.http.get<Prefecture[]>(this.apiUrl);
  }
}