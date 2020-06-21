import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NormalGuard } from './shared/normal-guard';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { AdminGuard } from './shared/admin-guard';
import { AdminEmployeeListComponent } from './admin-employee-list/admin-employee-list.component';
import { AdminReviewerListComponent } from './admin-reviewer-list/admin-reviewer-list.component';
import { AdminRegistComponent } from './admin-regist/admin-regist.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent, canActivate: [AuthGuard, NormalGuard], data: {title: '社員一覧'}},
  { path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard, NormalGuard], data: {title: '社員詳細'}},
  { path: 'login', component: LoginComponent, data: {title: 'ログイン'}},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, NormalGuard], data: {title: 'ダッシュボード'}},
  { path: 'admin/home', component: AdminMenuComponent, canActivate: [AuthGuard, AdminGuard], data: {title: '管理者ホーム'}},
  { path: 'admin/reviewers', component: AdminReviewerListComponent, canActivate: [AuthGuard, AdminGuard], data: {title: '評価者管理'}},
  { path: 'admin/employees', component: AdminEmployeeListComponent, canActivate: [AuthGuard, AdminGuard], data: {title: '従業員管理'}},
  { path: 'admin/:mode/edit/:id', component: AdminUserEditComponent, canActivate: [AuthGuard, AdminGuard], data: {title: '人員詳細情報'}},
  { path: 'admin/employees/import', component: AdminRegistComponent, canActivate: [AuthGuard, AdminGuard], data: {title: '従業員登録'}},
  { path: 'admin/reviewers/import', component: AdminRegistComponent, canActivate: [AuthGuard, AdminGuard], data: {title: '評価者登録'}},
  { path: '404', component: PageNotFoundComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard, NormalGuard, AdminGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
