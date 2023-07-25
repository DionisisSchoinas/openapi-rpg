import { Component, OnInit } from '@angular/core';
import { LoadingDialogService } from './loading-dialog.service';

declare var window: any;

@Component({
  selector: 'loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {
  
  private loadingModal: any;

  constructor(private loadingDialogService: LoadingDialogService) {}

  ngOnInit(): void {
    this.loadingModal = new window.bootstrap.Modal(document.getElementById('loadingModal'));
    
    this.loadingDialogService.loadingDialog$.subscribe(show => {
      if (show)
        this.loadingModal.show();
      else
        this.loadingModal.hide();
    });
  }
}
