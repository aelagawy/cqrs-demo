import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({providedIn: 'root'})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  success(message: string) {
    this._snackBar.open(message, null, {
      duration: 5000,
      panelClass: 'success',
      verticalPosition: 'top'
    });
  }

  failure(message: string) {
    this._snackBar.open(message, null, {
      duration: 5000,
      panelClass: 'error',
      verticalPosition: 'top'
    });
  }

  error(message: string | any[] = null) {
    if (typeof message == 'string')
      message = [message];
      
    const duration = (message.length + 1) * 5000;

    this._snackBar.openFromComponent(AlertComponent, {
      panelClass: 'mat-snack-bar-failure',
      verticalPosition: 'top',
      data: message,
      duration: duration
    });
  }
}
