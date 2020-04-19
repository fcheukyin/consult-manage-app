import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'employees_test', component: EmployeeComponent},
  { path: 'employees', component: EmployeeListComponent},
  { path: 'employees/:id', component: EmployeeDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'employees' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
