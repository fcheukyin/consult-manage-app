import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { Filter } from '../shared/filter.model';
import { Unit } from '../shared/unit.model';
import { Group } from '../shared/group.model';
import { EmployeeService } from '../shared/service/employee.service';
import { GroupService } from '../shared/service/group.service';
import { UnitService } from '../shared/service/unit.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet'
import { FormControl } from '@angular/forms';
import { ResponsiveService } from '../shared/service/responsive.service';
import { AuthService } from '../shared/service/auth.service';
import { ReviewerService } from '../shared/service/reviewer.service';



@Component({
  selector: 'bottom-sheet-filter',
  templateUrl: './mat-bottom-sheet-filter.html',
  styleUrls: ['./mat-bottom-sheet-filter.scss']
})
export class MatBottomSheetFilter implements OnInit{
    
    employees: any[];
    units: Unit[];
    groups: Group[];

    filter: Filter;

    myControl = new FormControl();
    options: String[] = [];
    filteredOptions: Observable<String[]>;
    datepickerTouchUi: boolean;
    adminMode: boolean;

    constructor(private employeeService: EmployeeService, private groupService: GroupService, private unitService: UnitService,
                private bottomSheetRef: MatBottomSheetRef, private responsiveService: ResponsiveService,
                private authService: AuthService, private reviewerService: ReviewerService,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
    
    openLink(event: MouseEvent): void {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    getEmployees(): void {
        if (this.adminMode) {
            this.employeeService.getAllEmployees()
                            .subscribe(employees =>
                                        { 
                                          for(let i = 0; i < employees.length; i++) {
                                            employees[i].name = employees[i].firstName + employees[i].lastName;
                                          }
                                          this.employees = employees;
                                        });
        } else {
            this.employeeService.getEmployees()
                                .subscribe(employees =>
                                            { 
                                              for(let i = 0; i < employees.length; i++) {
                                                employees[i].name = employees[i].firstName + employees[i].lastName;
                                              }
                                              this.employees = employees;
                                            });
        }
    }

    getReviewers(): void {
        this.reviewerService.getAllReviewers()
                            .subscribe(reviewers => {
                                for(let i = 0; i < reviewers.length; i++) {
                                    reviewers[i].name = reviewers[i].firstName + reviewers[i].lastName;
                                }
                                this.employees = reviewers;
                            })
    }
    
    getUnits(): void {
        this.unitService.getUnits().subscribe(units => this.units = units);
    }

    getGroups(): void {
        this.groupService.getGroups().subscribe(groups => this.groups = groups);
    }

    setOptions(item: String): void {
        this.options.length = 0;
        
        switch(item) {
        case 'name':
            for (let i = 0; i < this.employees.length; i++) {
                if (this.employees[i].name.toLowerCase().includes(this.filter.name.toLowerCase())){
                    this.options.push(this.employees[i].name);
                }
            }
            break;
        case 'group':
            for (let i = 0; i < this.groups.length; i++) {
                if (this.groups[i].name.toLowerCase().includes(this.filter.groupName.toLowerCase())){
                    this.options.push(this.groups[i].name);
                }
            }
            break;
        case 'unit':
            for (let i = 0; i < this.units.length; i++) {
                if (this.units[i].name.toLowerCase().includes(this.filter.unitName.toLowerCase())){
                    this.options.push(this.units[i].name);
                }
            }
            break;
        }
    this.filteredOptions = this.myControl.valueChanges
        .pipe(
        startWith(''),
        map(value => this._filter(value))
        );
    }

    reset(): void {
        if (this.data.reviewerFilter) {
            this.reviewerService.resetFilter();
        } else {
            this.employeeService.resetFilter();
        }
    }

    ngOnInit(): void{
        if (this.authService.isAdminMode()) {
            this.adminMode = true;
        }
        if (this.data.reviewerFilter) {
            this.getReviewers()
            this.filter = this.reviewerService.getFilter();
        } else {
            this.getEmployees();
            this.filter = this.employeeService.getFilter();
        }
        this.getGroups();
        this.getUnits();
        this.datepickerTouchUi = this.responsiveService.datepickerTouchUi();
    }

    private _filter(value: string): String[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}
