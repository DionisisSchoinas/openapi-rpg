import { Component } from '@angular/core';
import { GameResetService } from './game-reset.service';

@Component({
  selector: 'game-reset',
  templateUrl: './game-reset.component.html',
  styleUrls: ['./game-reset.component.css']
})
export class GameResetComponent {
  constructor (private gameResetService: GameResetService) {}

  resetGame() {
    this.gameResetService.resetGame();
  }
}
