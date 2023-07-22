import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameResetService {

  private requestResetBus$ = new BehaviorSubject<boolean>(false);
  requestReset$ = this.requestResetBus$.asObservable();

  constructor() { }

  resetGame() {
    this.requestResetBus$.next(true);
  }

  gameHasBeenReset() { 
    this.requestResetBus$.next(false);
  }
}
