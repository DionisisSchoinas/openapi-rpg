import { TestBed } from '@angular/core/testing';

import { GameResetService } from './game-reset.service';

describe('GameResetService', () => {
  let service: GameResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
