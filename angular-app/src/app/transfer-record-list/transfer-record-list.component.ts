import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import * as moment from 'moment';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransferRecord } from '../shared/transfer-record.model';



@Component({
  selector: 'app-transfer-record-list',
  templateUrl: './transfer-record-list.component.html',
  styleUrls: ['./transfer-record-list.component.scss']
})
export class TransferRecordListComponent implements OnInit {

  records: TransferRecord[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: TransferRecord[]) {
    this.records = data;
  }

  ngOnInit() {}
}
