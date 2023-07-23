import { TestBed } from '@angular/core/testing';

import { ShowRulesService } from './show-rules.service';

describe('ShowRulesService', () => {
  let service: ShowRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
