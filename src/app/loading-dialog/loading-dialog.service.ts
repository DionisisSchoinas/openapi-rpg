import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingDialogService {
  private loadingDialogBus$ = new BehaviorSubject<boolean>(false);
  loadingDialog$ = this.loadingDialogBus$.asObservable();

  constructor() { }

  openDialog() {
    this.loadingDialogBus$.next(true);
  }

  closeDialog() {
    this.loadingDialogBus$.next(false);
  }
}
