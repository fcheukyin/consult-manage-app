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
import { Reviewer } from '../shared/reviewer.model';
import { ReviewerService } from '../shared/service/reviewer.service';

@Component({
  selector: 'app-admin-reviewer-list',
  templateUrl: './admin-reviewer-list.component.html',
  styleUrls: ['./admin-reviewer-list.component.scss']
})
export class AdminReviewerListComponent implements OnInit, OnDestroy {
  reviewers: Reviewer [];
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
  reviewerFilter: MatTableFilter;
  predicate = (data: any) => {  
    var name = data.name.indexOf(this.reviewerService.filter.name) != -1;
    var group = data.groupName.indexOf(this.reviewerService.filter.groupName) != -1;
    var unit = data.unitName.indexOf(this.reviewerService.filter.unitName) != -1;
    return name && group && unit
  };

  constructor(private reviewerService: ReviewerService, private groupService: GroupService, private unitService: UnitService,
                private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.getReviewers();
    this.getGroups();
    this.getUnits();
    this.filter = this.reviewerService.getFilter();
    this.reviewerFilter = MatTableFilter.ANYWHERE;
  }

  ngOnDestroy() {
    this.reviewerService.resetFilter();
  }

  getReviewers(): void {
    this.reviewerService.getAllReviewers().pipe(delay(1000))
                        .subscribe(reviewers =>
                                    { 
                                      for(let i = 0; i < reviewers.length; i++) {
                                        reviewers[i].name = reviewers[i].firstName + reviewers[i].lastName;
                                      }
                                      this.reviewers = reviewers;
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
    this.dataSource = new MatTableDataSource(this.reviewers);
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
      data: {reviewerFilter: true}
    });
  }

}