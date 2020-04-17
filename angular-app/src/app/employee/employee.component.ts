import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/service/employee.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  selectEmployee: Employee;

  message: String;

  constructor(private employeeService: EmployeeService) { }


  getEmployees(): void {
    this.employeeService.getEmployees()
               .subscribe(
                 employees => {
                  console.log(employees);
                  this.employees = employees
                 }
                );
  }

  onSelectEmployee(employee: Employee):void {
    this.selectEmployee = employee;
    console.log(this.selectEmployee);
  }

  updateEmployee():void {
    console.log(this.selectEmployee);
    this.employeeService.updateEmployee(this.selectEmployee).subscribe(() => this.message = this.selectEmployee.firstName + 'さんの記録が更新されました');
  }

  clearSelect(): void {
    this.selectEmployee = null;
  }

  ngOnInit(): void {
    this.getEmployees();
  }

}