import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, delay, timeInterval } from 'rxjs/operators';

import { EmployeeService } from '../shared/service/employee.service';
import { MeetingRecordService } from '../shared/service/meeting-record.service';
import { Employee } from '../shared/employee.model';
import { MeetingRecord } from '../shared/meeting-record.model';
import { TransferRecord } from '../shared/transfer-record.model';
import { TransferRecordService } from '../shared/service/transfer-record.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransferRecordListComponent } from '../transfer-record-list/transfer-record-list.component';
import { MatTooltip } from '@angular/material/tooltip';
import { ResponsiveService } from '../shared/service/responsive.service';
import { MeetingRecordDetailsComponent } from '../meeting-record-details/meeting-record-details.component';
import { CreateMeetingRecordComponent } from '../create-meeting-record/create-meeting-record.component';
import { AuthService } from '../shared/service/auth.service';
import { MessageService } from '../shared/service/message.service';
import { Reviewer } from '../shared/reviewer.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit{

  @ViewChild('target1') target: ElementRef;
  @ViewChild('page') page: ElementRef;
  selectedEmployee: Employee;
  records: MeetingRecord[];
  transfers: TransferRecord[];
  dataReady = false;
  recordCreated: number;
  recordUpdated: number;
  recordDeleted: number;
  loginUser: Reviewer;

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private meetingRecordService: MeetingRecordService,
              private transferRecordService: TransferRecordService,
              public dialog: MatDialog,
              private responsiveService: ResponsiveService,
              private authService: AuthService,
              private messageService: MessageService) {}
              
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.loginUser = this.authService.getUserInfo()
    this.getEmployee(parseInt(id));
    this.getMeetingRecords(parseInt(id));
    this.getTransferRecords(parseInt(id));
  }

  getEmployee(id: number) {
    this.employeeService.getEmployeeById(id).toPromise()
                                            .then(employee => {
                                              if (!employee) {
                                                this.router.navigate(['employees']);
                                                this.messageService.invalidAction();
                                              }
                                              this.selectedEmployee = new Employee(employee);
                                            });
  }

  getMeetingRecords(id:number) {
    this.meetingRecordService.getRecordsById(id).toPromise()
                                                .then(records => {
                                                  for (let i = 0; i < records.length; i++) {
                                                    records[i] = new MeetingRecord(records[i]);
                                                  }
                                                  this.records = records;
                                                });
  }

  getTransferRecords(id:number) {
    this.transferRecordService.getRecordsById(id).toPromise()
                                                  .then(records => {
                                                    for (let i = 0; i < records.length; i++) {
                                                      records[i] = new TransferRecord(records[i])
                                                    }
                                                    if (records.length != 0){
                                                      this.transfers = records;
                                                    }
                                                    if (!this.authService.checkLoginUser(this.selectedEmployee)) {
                                                      this.router.navigate(['employees']);
                                                      this.messageService.invalidAction();
                                                    }
                                                    this.dataReady = !this.dataReady;
                                                  });
  }

  scroll() {
    console.log(this.page.nativeElement.offsetTop);
  }

  checkLoginUser() {
    if (this.selectedEmployee?.reviewerId != this.loginUser.id) {
      if (this.transfers) {
        if (!this.transfers.some(record => record.oldReviewerId == this.loginUser.id)
            || !this.transfers.some(record => record.newReviewerId == this.loginUser.id)) {
            this.router.navigate(['employees']);
            this.messageService.invalidAction();
            return
        } else {
          return
        }
      }
      this.router.navigate(['employees']);
      this.messageService.invalidAction();
    }
  }

  showTransferRecord() {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.width = "500px";
    config.data = this.transfers;
    config.panelClass = "transfer-dialog-container";
    this.dialog.open(TransferRecordListComponent, config);
  }

  showMeetingDetail(record:MeetingRecord) {
    const config = new MatDialogConfig();
    config.autoFocus = false;
    config.width = "500px";
    if (this.responsiveService.checkScreensize() == "lg") {
      config.maxHeight = "348px";
    } else {
      config.maxHeight = "448px"
    }
    config.position = {};
    config.data = record;
    config.panelClass = "meeting-record-dialog-container";
    this.dialog.open(MeetingRecordDetailsComponent, config).afterClosed()
    .subscribe(result => {
      if (result) {
        this.recordCreated = null;
        this.recordUpdated = null;
        if (result.action === 'updated') {
          this.recordUpdated = result.updateId;
          this.getMeetingRecords(this.selectedEmployee.id);
        }
        if (result.action === 'deleted') {
          this.recordDeleted = result.deletedId;
          setTimeout(() => this.getMeetingRecords(this.selectedEmployee.id), 300);
        }
      }
    });
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
    config.position = {};
    config.data = {employeeId: this.selectedEmployee.id};
    config.panelClass = "transfer-dialog-container";
    this.dialog.open(CreateMeetingRecordComponent, config).afterClosed()
      .subscribe(result => {
        if (result) {
          this.recordUpdated = null;
          this.recordCreated = result.event;
          this.getMeetingRecords(this.selectedEmployee.id);
        }
      });
  }

}
