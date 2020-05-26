import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MeetingRecord } from '../shared/meeting-record.model';
import { MeetingRecordService } from '../shared/service/meeting-record.service';
import { MessageService } from '../shared/service/message.service';
import { AuthService } from '../shared/service/auth.service';
import { ResponsiveService } from '../shared/service/responsive.service';
import { CreateMeetingRecordComponent } from '../create-meeting-record/create-meeting-record.component';

@Component({
  selector: 'app-meeting-record',
  templateUrl: './meeting-record-details.component.html',
  styleUrls: ['./meeting-record-details.component.scss']
})
export class MeetingRecordDetailsComponent {

    record: MeetingRecord
    userId: number
    deleteAlert = false

    constructor(public dialogRef: MatDialogRef <MeetingRecordDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: MeetingRecord,
                private meetingRecordService: MeetingRecordService, private messageService: MessageService,
                private authService: AuthService, private responsiveService: ResponsiveService,
                private dialog: MatDialog) {
        this.record = data;
        this.userId = this.authService.getUserInfo().id;
    }

    showAlert() {
      this.deleteAlert = true;
    }

    closeAlert() {
      this.deleteAlert = false;
    }

    delete() {
      this.meetingRecordService.deleteRecord(this.record).subscribe(res => {
        this.messageService.openSnackBar('面談記録を削除しました', '閉じる', 2000);
            this.dialogRef.close({deletedId: this.record.id, action: 'deleted'});
      });
    }

    showUpdateRecord() {
        const config = new MatDialogConfig();
        config.autoFocus = false;
        config.width = "500px";
        if (this.responsiveService.checkScreensize() == "lg") {
          config.maxHeight = "700px";
        } else {
          config.maxHeight = "600px"
        }
        config.position = {};
        config.data = {
            employeeId: this.record.employeeId,
            updateRecord: this.record
        };
        config.panelClass = "transfer-dialog-container";
        this.dialog.open(CreateMeetingRecordComponent, config).afterClosed()
          .subscribe(result => {
            if (result) {
              this.messageService.openSnackBar('面談記録を更新しました', '閉じる', 2000);
              this.dialogRef.close(result)
            }
          });
      }
}