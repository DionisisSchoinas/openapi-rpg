import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRequesterComponent } from './api-requester.component';

describe('ApiRequesterComponent', () => {
  let component: ApiRequesterComponent;
  let fixture: ComponentFixture<ApiRequesterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiRequesterComponent]
    });
    fixture = TestBed.createComponent(ApiRequesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
