import { NgModule, ModuleWithProviders } from '@angular/core';
import { EmployeeService } from '../shared/service/employee.service';
import { GroupService } from '../shared/service/group.service';
import { UnitService } from '../shared/service/unit.service';

@NgModule({
  declarations: [],
  imports: [],
  providers:  [
                EmployeeService,
                GroupService,
                UnitService
              ],
  exports: []
})
export class CoreModule { }
