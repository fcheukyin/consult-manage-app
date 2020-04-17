import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeetingRecord } from '../meeting-record.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MeetingRecordService {

  private apiUrl = 'http://localhost:8080/api/meeting_records';

  constructor(private http: HttpClient) { }

  getRecordsById(id: number): Observable<MeetingRecord[]> {
    return this.http.get<MeetingRecord[]>(this.apiUrl + '/' + id);
  }


}