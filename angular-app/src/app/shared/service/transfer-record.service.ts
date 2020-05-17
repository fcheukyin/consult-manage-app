import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransferRecord } from '../transfer-record.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransferRecordService {

  private apiUrl = 'http://localhost:8080/api/transfer_records';

  constructor(private http: HttpClient) { }

  getRecordsById(id: number): Observable<TransferRecord[]> {
    return this.http.get<TransferRecord[]>(this.apiUrl + '/' + id);
  }

}
