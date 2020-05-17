import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { MatModule } from './mat-config/mat.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MatBottomSheetFilter } from './mat-config/mat-bottom-sheet-filter.component';

import * as _moment from 'moment';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { LoginComponent } from './login/login.component';
import { TransferRecordListComponent } from './transfer-record-list/transfer-record-list.component';
import { MeetingRecordDetailsComponent } from './meeting-record-details/meeting-record-details.component.spec';
import { CreateMeetingRecordComponent } from './create-meeting-record/create-meeting-record.component';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MatModule
  ],
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeListComponent,
    MatBottomSheetFilter,
    EmployeeDetailComponent,
    LoginComponent,
    TransferRecordListComponent,
    MeetingRecordDetailsComponent,
    CreateMeetingRecordComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
