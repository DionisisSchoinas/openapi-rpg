import { Component } from '@angular/core';
import { PageService } from '../page-data-service.service';
import { PageData } from '../page-data';


@Component({
  selector: 'game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent {
  public pages: PageData[] = [];

  constructor (private pageService: PageService) { }

  ngOnInit() {
    this.pageService.currentText.subscribe(text => {
      if (text == null || text == undefined || Object.keys(text).length == 0)
        return;
      this.pages.push({role: "assistant", text: this.parseText(text)});
      this.pageService.updatedTexts(this.pages);
    })
  }

  parseText(text: Object): string {
    return JSON.stringify(text);
  }
  
}
