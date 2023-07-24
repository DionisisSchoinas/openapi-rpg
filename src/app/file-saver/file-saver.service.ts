import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { PageData } from '../page-data/page-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {

  private lastSave: Date = new Date();

  private requestDataBus$ = new BehaviorSubject<boolean>(false);
  requestData$ = this.requestDataBus$.asObservable();

  constructor() {}

  requestSave() {
    this.requestDataBus$.next(true);
  }

  saveData(data: PageData[]) {
    this.requestDataBus$.next(false);
    if (this.lastSave.valueOf() + 5000 > new Date().valueOf()) {
      return;
    }
    this.lastSave = new Date();
    let file = new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' });    
    saveAs(file, 'save_' + formatDate(this.lastSave, 'yyyyMMdd_HHmmss', 'en-US ')  + '.json');
  }
}
