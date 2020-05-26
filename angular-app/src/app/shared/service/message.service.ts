import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ResponsiveService } from './responsive.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar, private responsiveService: ResponsiveService) { }

  openSnackBar(message: string, action: string, duration: number) {
    var config = new MatSnackBarConfig()
    config.duration = duration;
    if (this.responsiveService.checkScreensize() == 'sm') {
      config.horizontalPosition = 'center';
    } else {
      config.horizontalPosition = "start";
    }
    this._snackBar.open(message, action, config);
  }

  invalidAction() {
    this.openSnackBar('不正操作', '閉じる', 2000);
  }

  dismissSnackBar() {
    this._snackBar.dismiss();
  }
}
