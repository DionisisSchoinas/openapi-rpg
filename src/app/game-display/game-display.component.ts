import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Response {  
  number: Number;  
  array: Number[];  
  string: String;  
}  

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent {
  result: Response | undefined;

  constructor(private http: HttpClient) {}

  getData() {
    this.http.post<Response>('http://demo1926491.mockable.io', { data: 'some data' })
      .subscribe(
        data => {
          this.result = data;
          console.log(this.result);
        }
      );
  }
}
