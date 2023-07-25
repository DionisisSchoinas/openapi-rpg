import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorDialog } from './error-dialog';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {
  private errorDialogBus$ = new BehaviorSubject<ErrorDialog>({ open: false, message: '' });
  errorDialog$ = this.errorDialogBus$.asObservable();

  constructor() { }

  openDialog(message: string) {
    this.errorDialogBus$.next(
      { open: true, message: message }
    )
  }
}
