import { Component, Input } from '@angular/core';
import * as saveAs from 'file-saver';
import { PageData } from '../page-data/page-data';
import { formatDate } from '@angular/common';

@Component({
  selector: 'file-saver',
  templateUrl: './file-saver.component.html',
  styleUrls: ['./file-saver.component.css']
})
export class FileSaverComponent {
  @Input()
  pageData: PageData[] = [];

  saveGame(data: PageData[]) {
    let file = new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' });    
    saveAs(file, 'save_' + formatDate(new Date(), 'yyyyMMdd_HHmmss', 'en-US ')  + '.json')
    this.pageData = [];
  }
}
