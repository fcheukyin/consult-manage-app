import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
import { MeetingRecordDetailsComponent } from '../meeting-record-details/meeting-record-details.component.spec';
import { CreateMeetingRecordComponent } from '../create-meeting-record/create-meeting-record.component';

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

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private meetingRecordService: MeetingRecordService,
              private transferRecordService: TransferRecordService,
              public dialog: MatDialog,
              private responsiveService: ResponsiveService) {}
              
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getEmployee(parseInt(id));
    this.getMeetingRecords(parseInt(id));
    this.getTransferRecords(parseInt(id));
  }

  getEmployee(id: number) {
    this.employeeService.getEmployeeById(id).toPromise()
                                            .then(employee => {
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
                                                    this.dataReady = !this.dataReady;
                                                  });
  }

  scroll() {
    console.log(this.page.nativeElement.offsetTop);
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
    this.dialog.open(MeetingRecordDetailsComponent, config);
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
    config.data = this.selectedEmployee.id;
    config.panelClass = "transfer-dialog-container";
    this.dialog.open(CreateMeetingRecordComponent, config).afterClosed()
      .subscribe(result => {
        if (result) {
          this.recordCreated = result.event;
          this.getMeetingRecords(this.selectedEmployee.id);
        }
      });
  }

}
