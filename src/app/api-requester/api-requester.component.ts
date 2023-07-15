import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PageService } from '../page-data-service.service';
import { PageData } from '../page-data';

interface ApiResponse {
  number: Number;
  array: Number[];
  string: String;
}

interface ApiRequest {
  data: string;
}

@Component({
  selector: 'api-requester',
  templateUrl: './api-requester.component.html',
  styleUrls: ['./api-requester.component.css']
})
export class ApiRequesterComponent {
  response: ApiResponse | undefined = { number: 0, array: [], string: '' }
  request: ApiRequest | undefined = { data: '' };

  constructor(private http: HttpClient, private pageService: PageService) { }

  ngOnInit() {
    this.pageService.listOfPageData.subscribe(pagesData => {
      if (pagesData == null || pagesData == undefined || pagesData.length == 0)
        return;
      this.request!.data = this.fromPageDataToString(pagesData);
    })
  }

  getData() {
    this.http.post<ApiResponse>('http://demo1926491.mockable.io', this.request)
      .subscribe(
        data => {
          this.newText(data);
        }
      );
  }

  newText(text: Object) {
    this.pageService.newText(text);
  }

  fromPageDataToString(pageData: PageData[]): string {
    return pageData.flatMap(page => JSON.stringify(page)).join(',');
  }

}
