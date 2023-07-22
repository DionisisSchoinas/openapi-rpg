import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResetComponent } from './game-reset.component';

describe('GameResetComponent', () => {
  let component: GameResetComponent;
  let fixture: ComponentFixture<GameResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameResetComponent]
    });
    fixture = TestBed.createComponent(GameResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
