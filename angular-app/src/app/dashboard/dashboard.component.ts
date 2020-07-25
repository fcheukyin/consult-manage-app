import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MeetingRecord } from '../shared/meeting-record.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { ResponsiveService } from '../shared/service/responsive.service';
import * as moment from 'moment';
import { MeetingRecordService } from '../shared/service/meeting-record.service';
import { MessageService } from '../shared/service/message.service';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { Reviewer } from '../shared/reviewer.model';
import { CreateMeetingRecordComponent } from '../create-meeting-record/create-meeting-record.component';
import { Router } from '@angular/router';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

    timeline: MeetingRecord[]
    timestampColor: number[] = [];
    loginUser: Reviewer
    dataReady = false;
    
    calendarPlugins = [dayGridPlugin, timeGridPlugin];
    events = []
    buttonText = {
      today:    '今日',
      month:    '月',
      week:     '週',
      day:      '日',
      list:     'リスト'
    };
    header = {
      left:   'title',
      center: '',
      right:  'today prev,next'
    }

    constructor(private meetingRecordService: MeetingRecordService, private responsiveService: ResponsiveService,
                private authService: AuthService, private dialog: MatDialog,
                private router: Router) {}

    ngOnInit() {
        this.loginUser = this.authService.getUserInfo();
        this.meetingRecordService.getRecentRecords(this.loginUser.id)
        .subscribe(record => {
            this.timeline = record;
            this.getTimestampColor();
            record.forEach(item => {
              this.events.push({
                title: item.category,
                start: item.meetingDate.toString()
              });
            })
            this.dataReady = true
        });
    }

    getTimestampColor() {
        for (let i = 0; i <= this.timeline.length; i++) {
            this.timestampColor.push(Math.floor(Math.random() * Math.floor(4)) + 1);
        }
    }

    showCreateRecord() {
      const config = new MatDialogConfig();
      config.autoFocus = false;
      config.width = "500px";
      if (this.responsiveService.checkScreensize() == "lg") {
        config.maxHeight = "700px";
      } else {
        config.maxHeight = "600px"
      }
      config.data = null;
      config.position = {};
      config.panelClass = "transfer-dialog-container";
      this.dialog.open(CreateMeetingRecordComponent, config).afterClosed()
        .subscribe(result => {
          if (result) {
            this.router.navigate(['employees/' + result.targetId])
          }
        });
    }
}