import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { Unit } from '../shared/unit.model';
import { Group } from '../shared/group.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Filter } from '../shared/filter.model';
import { MatTableFilter } from 'mat-table-filter';
import * as moment from 'moment';
import { EmployeeService } from '../shared/service/employee.service';
import { GroupService } from '../shared/service/group.service';
import { UnitService } from '../shared/service/unit.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { delay } from 'rxjs/operators';
import { MatBottomSheetFilter } from '../mat-config/mat-bottom-sheet-filter.component';

@Component({
  selector: 'app-admin-employee-list',
  templateUrl: './admin-employee-list.component.html',
  styleUrls: ['./admin-employee-list.component.scss']
})
export class AdminEmployeeListComponent implements OnInit, OnDestroy {

  employees: Employee [];
  units: Unit [];
  groups: Group [];
  dataLoading = true;

  //MatTable
  displayedColumns: String[] = ['name', 'groupName', 'unitName'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  //MatTableFilter
  filter: Filter;
  employeeFilter: MatTableFilter;
  predicate = (data: any) => {
    console.log(data)
    if (data.name) {
      var name = data.name.indexOf(this.employeeService.filter.name) != -1;
    }
    if (data.groupName) {
      var group = data.groupName.indexOf(this.employeeService.filter.groupName) != -1;
    }
    if (data.unitName) {
      var unit = data.unitName.indexOf(this.employeeService.filter.unitName) != -1;
    }
    return name && group && unit
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
    this.employeeService.getAllEmployees().pipe(delay(1000))
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
  }

  openFilterMenu(): void {
    this.bottomSheet.open(MatBottomSheetFilter, {
      data: {reviewerFilter: false}
    });
  }

}

