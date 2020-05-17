import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingRecord } from '../shared/meeting-record.model';

@Component({
  selector: 'app-meeting-record',
  templateUrl: './meeting-record-details.component.html',
  styleUrls: ['./meeting-record-details.component.scss']
})
export class MeetingRecordDetailsComponent {

    record: MeetingRecord

    constructor(@Inject(MAT_DIALOG_DATA) public data: MeetingRecord) {
        this.record = data;
    }
}