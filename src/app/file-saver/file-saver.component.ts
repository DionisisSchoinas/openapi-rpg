import { Component } from '@angular/core';
import { FileSaverService } from './file-saver.service';

@Component({
  selector: 'file-saver',
  templateUrl: './file-saver.component.html',
  styleUrls: ['./file-saver.component.css']
})
export class FileSaverComponent {

  constructor(private fileSaverService: FileSaverService) {}

  saveGame() {
    this.fileSaverService.requestSave();
  }
}
