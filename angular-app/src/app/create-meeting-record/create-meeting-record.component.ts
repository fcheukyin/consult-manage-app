import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeetingRecord } from '../shared/meeting-record.model';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { ResponsiveService } from '../shared/service/responsive.service';
import * as moment from 'moment';
import { MeetingRecordService } from '../shared/service/meeting-record.service';
import { MessageService } from '../shared/service/message.service';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-meeting-record.component.html',
  styleUrls: ['./create-meeting-record.component.scss']
})
export class CreateMeetingRecordComponent implements OnInit{

    formGroup: FormGroup
    record: MeetingRecord
    employeeId: number
    reviewerId: number
    textareaMinRow: number
    textareaMaxRow: number

    datepickerTouchUi: boolean
    loading = false;

    constructor(public dialogRef: MatDialogRef <CreateMeetingRecordComponent>, @Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, private authService: AuthService,
                private responsiveService: ResponsiveService, private meetingRecordService: MeetingRecordService,
                private messageService: MessageService) {
        this.employeeId = data;
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
            category: ['', [Validators.required, Validators.maxLength(10)]],
            meetingDate: ['', Validators.required],
            content: ['', [Validators.required, Validators.maxLength(1000)]]
        })
        this.datepickerTouchUi = this.responsiveService.datepickerTouchUi();
    }

    getErrorMessage(control) {
        switch(control) {
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

    onSubmit() {
        this.loading = true;
        var current = moment().format('YYYY-MM-DD HH:mm:ss').toString();
        this.record = {
            id: null,
            category: this.formGroup.controls.category.value,
            meetingDate: this.formGroup.controls.meetingDate.value,
            content: this.formGroup.controls.content.value.replace(/(?:\r\n|\r|\n)/g, '<br>'),
            employeeId:  this.employeeId,
            reviewerId: this.reviewerId,
            reviewerName: null,
            employeeName: null,
            createdAt: current,
            updatedAt: null
        };
        console.log(this.record.meetingDate.toString());
        this.meetingRecordService.createRecord(this.record).subscribe(res => {
            this.messageService.openSnackBar('面談を登録しました', '閉じる', 5000);
            this.dialogRef.close({event: res});
        });

    }       
}