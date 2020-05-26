import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeetingRecord } from '../shared/meeting-record.model';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn} from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { ResponsiveService } from '../shared/service/responsive.service';
import * as moment from 'moment';
import { MeetingRecordService } from '../shared/service/meeting-record.service';
import { MessageService } from '../shared/service/message.service';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/service/employee.service';
import { Observer, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-meeting-record.component.html',
  styleUrls: ['./create-meeting-record.component.scss']
})
export class CreateMeetingRecordComponent implements OnInit{

    formGroup: FormGroup
    record: MeetingRecord
    updateRecord: MeetingRecord
    employees: Employee[]
    employeeId: number
    employeeName = ''
    reviewerId: number
    textareaMinRow: number
    textareaMaxRow: number

    updateMode = false
    datepickerTouchUi: boolean
    employeeOption: Employee[] = []
    employeeAutoComplete: Observable<Employee[]>
    loading = false;

    constructor(public dialogRef: MatDialogRef <CreateMeetingRecordComponent>, @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private authService: AuthService,
                private responsiveService: ResponsiveService, private meetingRecordService: MeetingRecordService,
                private messageService: MessageService, private employeeService: EmployeeService,) {
        if (data) {
            this.employeeId = data.employeeId;
            if (data.updateRecord) {
                this.updateRecord = data.updateRecord;
                this.updateMode = true;
            }
        }
        this.reviewerId = this.authService.getUserInfo().id;
        if (this.responsiveService.checkScreensize() == 'lg') {
            this.textareaMinRow = 10;
            this.textareaMaxRow = 20;
        } else {
            this.textareaMinRow = 5;
            this.textareaMaxRow = 10;
        }
    }

    ngOnInit() {
        this.formGroup = this.fb.group({
            employeeName: ['', [Validators.required, this.checkValidEmployee()]],
            category: ['', [Validators.required, Validators.maxLength(10)]],
            meetingDate: ['', Validators.required],
            content: ['', [Validators.required, Validators.maxLength(1000)]]
        })
        if (this.employeeId) {
            this.formGroup.controls.employeeName.disable();
        }
        this.employeeService.getEmployees().subscribe(employees => {
            for(let i = 0; i < employees.length; i++) {
                employees[i].name = employees[i].firstName + employees[i].lastName;
            }
            this.employees = employees.filter(employee => employee.reviewerId == this.reviewerId);
            if (this.employeeId){
                this.formGroup.patchValue({employeeName: this.employees?.find(employee => employee.id == this.employeeId).name});
            }
        })

        if (this.updateMode) {
            this.formGroup.patchValue({
                category: this.updateRecord.category,
                meetingDate: this.updateRecord.meetingDate,
                // content: this.updateRecord.content.replace(new RegExp('<br>', 'g'), '\r\n')
                content: this.updateRecord.content
            });
        }

        this.datepickerTouchUi = this.responsiveService.datepickerTouchUi();
        this.employeeAutoComplete = this.formGroup.controls.employeeName.valueChanges
                                        .pipe(
                                            startWith(''),
                                            map(value => this._filter(value))
                                        );
    }

    getErrorMessage(control) {
        switch(control) {
            case 'employeeName':
                if (this.formGroup.controls.employeeName.hasError('required')) {
                    return '必須項目'
                }
                if (this.formGroup.controls.employeeName.hasError('validName')) {
                    return '所属の社員名を入力してください'
                }
                break;
            case 'category':
                if (this.formGroup.controls.category.hasError('required')) {
                    return '必須項目'
                }
                if (this.formGroup.controls.category.hasError('maxlength')) {
                    return '10文字以下で入力してください'
                }
                break;
            case 'meetingDate':
                return '有効日付を入力してください';
                break;
            case 'content':
                if (this.formGroup.controls.content.hasError('required')) {
                    return '必須項目'
                }
                if (this.formGroup.controls.content.hasError('maxlength')) {
                    return '1000文字以下で入力してください'
                }
                break;
        }
    }

    setValue() {
        var current = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        this.record = {
            id: null,
            category: this.formGroup.controls.category.value,
            meetingDate: this.formGroup.controls.meetingDate.value,
            // content: this.formGroup.controls.content.value.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            content: this.formGroup.controls.content.value,
            employeeId:  this.employeeId,
            reviewerId: this.reviewerId,
            reviewerName: null,
            employeeName: null,
            createdAt: current,
            updatedAt: null
        };
        if (this.updateMode) {
            this.record.id = this.updateRecord.id;
        }
    }

    onSubmit() {
        this.loading = true;
        if (!this.employeeId) {
            this.employeeId = this.employees.find(employee => employee.name == this.formGroup.controls.employeeName.value).id;
        }
        this.setValue();
        if (!this.updateMode) {
            this.meetingRecordService.createRecord(this.record).subscribe(res => {
                this.messageService.openSnackBar('面談を登録しました', '閉じる', 5000);
                this.dialogRef.close({event: res, targetId: this.record.employeeId, action: 'created'});
            });
        } else {
            this.meetingRecordService.updateRecord(this.record).subscribe(res => {
                this.dialogRef.close({updateId: this.record.id, targetId: this.record.employeeId, action: 'updated'});
            })
        }
    }
    
    close() {
        this.dialogRef.close();
    }

    private _filter(value: string): Employee[] {
        const filterValue = value.toLowerCase();
        return this.employees?.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    checkValidEmployee(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const forbidden = this.employees?.filter(employee => employee.name === control.value).length ==0;
            return forbidden ? {'validName': true} : null;
        };
    }
}