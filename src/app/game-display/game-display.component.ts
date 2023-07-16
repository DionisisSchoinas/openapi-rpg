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
    this.apiRequesterService.currentData.subscribe(data => {
      if (data == null || data == undefined || data.role == Role.NONE)
        return;
      this.pages.push(data);
      this.apiRequesterService.updatedTexts(this.pages);
    })
  }
  
  sendUserInput(text: string) {
    if (text == null || text.trim().length == 0)
      return;

    this.pages.push({ role: Role.USER, content: text });
    this.apiRequesterService.newUserInput(this.pages);
  }
  
}
