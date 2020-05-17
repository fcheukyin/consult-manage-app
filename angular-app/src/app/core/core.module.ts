import { NgModule, ModuleWithProviders } from '@angular/core';
import { EmployeeService } from '../shared/service/employee.service';
import { GroupService } from '../shared/service/group.service';
import { UnitService } from '../shared/service/unit.service';
import { AuthService } from '../shared/service/auth.service';
import { MessageService } from '../shared/service/message.service';
import { HttpInterceptorProviders } from '../shared/http-interceptors/index';
import { TransferRecordService } from '../shared/service/transfer-record.service';
import { MeetingRecordService } from '../shared/service/meeting-record.service';
import { ResponsiveService } from '../shared/service/responsive.service';

@NgModule({
  declarations: [],
  imports: [],
  providers:  [
                EmployeeService,
                GroupService,
                UnitService,
                AuthService,
                MessageService,,
                TransferRecordService,
                MeetingRecordService,
                ResponsiveService,
                HttpInterceptorProviders
              ],
  exports: []
})
export class CoreModule { }
