import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Key from "../../assets/_keys/key.json";
import { PageData } from '../page-data/page-data';
import { Role } from '../page-data/role';

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
  messages: {
    role: string;
    content: string;
  }[],
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

  private dataSource = new BehaviorSubject<PageData>({ role: Role.NONE, content: "", date: new Date() });
  currentData = this.dataSource.asObservable();

  private keyJson: { key: string } = Key;

  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer '.concat(this.keyJson.key));

  request: ApiRequest = { model: 'gpt-3.5-turbo', messages: [], temperature: 1, max_tokens: 350, top_p: 1, frequency_penalty: 0, presence_penalty: 0 };

  constructor(private http: HttpClient) { }

  newData(data: PageData) {
    this.dataSource.next(data)
  }

  newUserInput(sources: PageData[]) {
    this.updatedTexts(sources);
    this.requestDataFromApi();
  }

  private updatedTexts(sources: PageData[]) {
    this.request.messages = sources.filter(source => source.role == Role.SYSTEM || source.role == Role.ASSISTANT || source.role == Role.USER).map(source => { return { role: source.role, content: source.content }; });
  }

  private requestDataFromApi() {
    this.http.post<ApiResponse>('https://api.openai.com/v1/chat/completions', this.request, { headers: this.headers })
      .subscribe(
        {
          next: (response) => {
            this.newData({ role: Role.ASSISTANT, content: response.choices[0].message.content, date: new Date() });
          },
          error: (e) => {
            this.newData({ role: Role.ERROR, content: '', date: new Date() });
            if (e.error.error.message)
              throw new Error(e.error.error.message);
            else
              throw new Error("Unexpected API error");
          }
        }
      );
    // this.newData({ role: Role.ASSISTANT, content: "Response for : " + this.request.messages[this.request.messages.length - 1].content });
  }
}
