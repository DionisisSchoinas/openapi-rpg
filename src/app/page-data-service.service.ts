import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PageData } from './page-data';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private textSource = new BehaviorSubject<Object>([]);
  currentText = this.textSource.asObservable();
  
  private textSources = new BehaviorSubject<PageData[]>([]);
  listOfPageData = this.textSources.asObservable();

  constructor() { }

  newText(text: Object) {
    this.textSource.next(text)
  }

  updatedTexts(sources: PageData[]) {
    this.textSources.next(sources);
  }
}
