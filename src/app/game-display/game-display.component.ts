import { Component } from '@angular/core';
import { PageData } from '../page-data/page-data';
import { ApiRequesterService } from '../api-requester/api-requester.service';
import { Role } from '../page-data/role';


@Component({
  selector: 'game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent {
  public pages: PageData[] = [];

  constructor (private apiRequesterService: ApiRequesterService) { }

  ngOnInit() {
    this.apiRequesterService.currentText.subscribe(text => {
      if (text == null || text == undefined || Object.keys(text).length == 0)
        return;
      this.pages.push({role: Role.ASSISTANT, text: this.parseText(text)});
      this.apiRequesterService.updatedTexts(this.pages);
    })
  }

  parseText(text: Object): string {
    return JSON.stringify(text);
  }

  getData() {
    this.apiRequesterService.requestDataFromApi();
  }
  
}
