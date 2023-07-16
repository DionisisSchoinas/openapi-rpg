import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PageData } from '../page-data/page-data';

interface ApiResponse {
  number: Number;
  array: Number[];
  string: String;
}

interface ApiRequest {
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiRequesterService {

  private textSource = new BehaviorSubject<Object>([]);
  currentText = this.textSource.asObservable();

  response: ApiResponse | undefined = { number: 0, array: [], string: '' }
  request: ApiRequest | undefined = { data: '' };

  constructor(private http: HttpClient) { }

  newText(text: Object) {
    this.textSource.next(text)
  }

  updatedTexts(sources: PageData[]) {
    this.request!.data = this.fromPageDataToString(sources);
  }

  requestDataFromApi() {
    this.http.post<ApiResponse>('http://demo1926491.mockable.io', this.request)
      .subscribe(
        data => {
          this.newText(data);
        }
      );
  }

  fromPageDataToString(pageData: PageData[]): string {
    return pageData.flatMap(page => JSON.stringify(page)).join(',');
  }

}
