import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PageData } from '../page-data/page-data';
import { HttpHeaders } from '@angular/common/http';
import { Role } from '../page-data/role';
import Key from "../../assets/_keys/key.json";

interface ApiResponse {
  choices: {
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    }
  }[];
  id: string;
  created: number;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  }
}

interface ApiRequest {
  model: string,
  messages: PageData[],
  temperature: number,
  max_tokens: number,
  top_p: number,
  frequency_penalty: number,
  presence_penalty: number
}

@Injectable({
  providedIn: 'root'
})
export class ApiRequesterService {

  private dataSource = new BehaviorSubject<PageData>({ role: Role.NONE, content: "" });
  currentData = this.dataSource.asObservable();

  private keyJson: { key: string } = Key;

  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '.concat(this.keyJson.key));

  request: ApiRequest = { model: 'gpt-3.5-turbo', messages: [], temperature: 1, max_tokens: 256, top_p: 1, frequency_penalty: 0, presence_penalty: 0 };

  constructor(private http: HttpClient) { }

  private newData(data: PageData) {
    this.dataSource.next(data)
  }

  newUserInput(sources: PageData[]) {
    this.updatedTexts(sources);
    this.requestDataFromApi();
  }

  updatedTexts(sources: PageData[]) {
    this.request.messages = sources;
  }

  private requestDataFromApi() {
    this.http.post<ApiResponse>('https://api.openai.com/v1/chat/completions', this.request, { headers: this.headers })
      .subscribe(
        resp => {
          console.log("Response:");
          console.log(resp);
          this.newData({ role: Role.ASSISTANT,  content: resp.choices[0].message.content});
        },
        error => {
          console.log("Error:");
          console.log(error);
        },
        () => {
          console.log('Completed');
        }
      );
  }
}
