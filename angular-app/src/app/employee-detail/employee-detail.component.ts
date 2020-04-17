import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { EmployeeService } from '../shared/service/employee.service';
import { MeetingRecordService } from '../shared/service/meeting-record.service';
import { Employee } from '../shared/employee.model';
import { MeetingRecord } from '../shared/meeting-record.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  @ViewChild('target1') target: ElementRef;
  @ViewChild('page') page: ElementRef;
  selectedEmployee: Employee;
  records: MeetingRecord [];
  dataReady = false;

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private meetingRecordService: MeetingRecordService) {
    let id = this.route.snapshot.paramMap.get('id');
    this.getEmployee(parseInt(id));
    this.getMeetingRecords(parseInt(id));
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
                                                  console.log(this.records);
                                                  this.dataReady = !this.dataReady;
                                                });
  }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');
    // this.employeeService.getEmployeeById(parseInt(id))
    //                                       .subscribe(employee => {
    //                                         this.selectedEmployee = employee;
    //                                         employee.name = employee.firstName + employee.lastName;
    //                                       });
  }

  scroll() {
    console.log(this.page.nativeElement.offsetTop);
  }

}
