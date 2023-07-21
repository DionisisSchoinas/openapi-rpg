import { Component } from '@angular/core';
import { ApiRequesterService } from '../api-requester/api-requester.service';
import { PageData } from '../page-data/page-data';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor(private apiService: ApiRequesterService) { }

  fileName = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      file.text().then(text => {
        try {
          this.writeData(JSON.parse(text));
        } catch (error) {
          //TODO: handle error
          console.error("Could not parse JSON");
        }
      })
    }
  }

  private writeData(data: PageData[]) {
    for (let i = 0; i < data.length; i++) {
      this.apiService.newData(data[i]);
    }
  }
}
