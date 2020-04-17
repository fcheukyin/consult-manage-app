import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { Filter } from '../shared/filter.model';
import { Unit } from '../shared/unit.model';
import { Group } from '../shared/group.model';
import { EmployeeService } from '../shared/service/employee.service';
import { GroupService } from '../shared/service/group.service';
import { UnitService } from '../shared/service/unit.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { FormControl } from '@angular/forms';



@Component({
  selector: 'bottom-sheet-filter',
  templateUrl: './mat-bottom-sheet-filter.html',
  styleUrls: ['./mat-bottom-sheet-filter.scss']
})
export class MatBottomSheetFilter implements OnInit{
    
    employees: Employee[];
    units: Unit[];
    groups: Group[];

    filter: Filter;

    myControl = new FormControl();
    options: String[] = [];
    filteredOptions: Observable<String[]>;

    constructor(private employeeService: EmployeeService, private groupService: GroupService, private unitService: UnitService,
                private bottomSheetRef: MatBottomSheetRef) { }
    
    openLink(event: MouseEvent): void {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    getEmployees(): void {
        this.employeeService.getEmployees()
                            .subscribe(employees =>
                                        { 
                                          for(let i = 0; i < employees.length; i++) {
                                            employees[i].name = employees[i].firstName + employees[i].lastName;
                                          }
                                          this.employees = employees;
                                        });
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
            this.options.push(this.employees[i].name);
            }
            break;
        case 'group':
            for (let i = 0; i < this.groups.length; i++) {
            this.options.push(this.groups[i].name);
            }
            break;
        case 'unit':
            for (let i = 0; i < this.units.length; i++) {
            this.options.push(this.units[i].name);
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
        this.employeeService.resetFilter();
    }

    ngOnInit(): void{
        this.getEmployees();
        this.getGroups();
        this.getUnits();
        this.filter = this.employeeService.getFilter();
    }

    private _filter(value: string): String[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}
