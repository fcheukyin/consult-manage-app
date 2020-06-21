import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../position.model';
import { Motivation } from '../motivation.model';
import { Charm } from '../charm';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CharmService {

  private apiUrl = 'http://localhost:8080/api/charms';

  constructor(private http: HttpClient) { }

  getCharms(): Observable<Charm[]> {
    return this.http.get<Charm[]>(this.apiUrl);
  }
}