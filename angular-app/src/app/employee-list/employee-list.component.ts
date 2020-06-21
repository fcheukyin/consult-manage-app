import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { Filter } from '../shared/filter.model';
import { Unit } from '../shared/unit.model';
import { Group } from '../shared/group.model';
import { EmployeeService } from '../shared/service/employee.service';
import { GroupService } from '../shared/service/group.service';
import { UnitService } from '../shared/service/unit.service';
import { Observable } from 'rxjs';
import { map, startWith, delay } from 'rxjs/operators';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableFilter } from 'mat-table-filter';
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { MatBottomSheetFilter } from '../mat-config/mat-bottom-sheet-filter.component';
import { ThrowStmt } from '@angular/compiler';
import { FormControl } from '@angular/forms';

import * as moment from 'moment';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {

  employees: Employee [];
  units: Unit [];
  groups: Group [];
  dataLoading = true;

  //MatTable
  displayedColumns: String[] = ['name', 'groupName', 'unitName', 'lastMeeting'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //MatTableFilter
  filter: Filter;
  employeeFilter: MatTableFilter;
  predicate = (data: any) => {
    var filterStartDate = moment(this.employeeService.filter.lastMeetingStart).format("YYYY/MM/DD");
    var filterEndDate = moment(this.employeeService.filter.lastMeetingEnd).format("YYYY/MM/DD");
    var lastMeeting = moment(data.lastMeeting).format("YYYY/MM/DD");

    var name = data.name.indexOf(this.employeeService.filter.name) != -1;
    var group = data.groupName.indexOf(this.employeeService.filter.groupName) != -1;
    var unit = data.unitName.indexOf(this.employeeService.filter.unitName) != -1;
    var startDate = true;
    var endDate = true;
    if (moment(filterStartDate).isValid()) {
      startDate = new Date(filterStartDate).getTime() <= new Date(lastMeeting).getTime();
    }
    if (moment(filterEndDate).isValid()) {
      endDate = new Date(filterEndDate).getTime() >= new Date(lastMeeting).getTime();
    }
    return name && group && unit && startDate && endDate;
  };

  constructor(private employeeService: EmployeeService, private groupService: GroupService, private unitService: UnitService,
                private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.getEmployees();
    this.getGroups();
    this.getUnits();
    this.filter = this.employeeService.getFilter();
    this.employeeFilter = MatTableFilter.ANYWHERE;
  }

  ngOnDestroy() {
    this.employeeService.resetFilter();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().pipe(delay(1000))
                        .subscribe(employees =>
                                    { 
                                      for(let i = 0; i < employees.length; i++) {
                                        employees[i].name = employees[i].firstName + employees[i].lastName;
                                      }
                                      this.employees = employees;
                                      this.setMatTable();
                                      this.dataLoading = false;
                                    });
  }

  getUnits(): void {
    this.unitService.getUnits().subscribe(units => this.units = units);
  }

  getGroups(): void {
    this.groupService.getGroups().subscribe(groups => this.groups = groups);
  }

  setMatTable(): void {
    this.dataSource = new MatTableDataSource(this.employees);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'name': return item.firstName;
        default: return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter) => {
      let filterDate = new Date(filter); 
      console.log(filterDate);
      return data.lastMeeting > filter;
    };
  }

  openFilterMenu(): void {
    this.bottomSheet.open(MatBottomSheetFilter, {
      data: {reviewerFilter: false}
    });
  }

}
