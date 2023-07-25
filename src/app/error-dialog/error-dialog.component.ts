import { Component, OnInit } from '@angular/core';
import { ErrorDialogService } from './error-dialog.service';
import { ErrorDialog } from './error-dialog';

@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  private timeout: number = 10000;

  private errorCounter: number = 0;
  errorDialogs: ErrorDialog[] = [];

  constructor(private errorDialogService: ErrorDialogService) { }

  ngOnInit(): void {
    this.errorDialogService.errorDialog$.subscribe(data => {
      if (data.open) {
        var id = "error-dialog-" + this.errorCounter++;
        this.errorDialogs.push({ id: id, open: data.open, message: data.message });
        setTimeout(() => {
            this.errorDialogs = this.errorDialogs.filter(x => x.id !== id);
        }, this.timeout);
      }
    });
  }

}
