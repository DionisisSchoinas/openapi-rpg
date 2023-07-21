import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiRequesterService } from '../api-requester/api-requester.service';
import { PageData } from '../page-data/page-data';
import { Role } from '../page-data/role';


@Component({
  selector: 'game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent implements OnInit {
  @Input()
  pages: PageData[] = [];

  constructor(private http: HttpClient, private apiRequesterService: ApiRequesterService) { }

  ngOnInit() {
    this.loadDefault();
    this.apiRequesterService.currentData.subscribe(data => {
      if (data == null || data == undefined || data.role == Role.NONE)
        return;
      if (data.role == Role.SYSTEM)
        this.pages = [];
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

  displayablePages() {
    return this.pages.filter(page => page.role == Role.USER || page.role == Role.ASSISTANT);
  }

  private loadDefault() {
    this.http.get('../../assets/default_rules/rules.txt', { responseType: 'text' })
      .subscribe(
        data => {
          this.pages.push({ role: Role.SYSTEM, content: data });
        },
        error => {
          //TODO: handle error
          console.log("Error:");
          console.log(error);
        }
      );
    return;
  }

}
