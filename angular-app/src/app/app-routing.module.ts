import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard], data: {title: '社員一覧'}},
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard], data: {title: '社員詳細'}},
  { path: 'login', component: LoginComponent, data: {title: 'ログイン'}},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {title: 'ダッシュボード'}},
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
