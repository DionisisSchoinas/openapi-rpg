import { TestBed } from '@angular/core/testing';

import { PageService } from './page-data-service.service';

describe('PageDataServiceService', () => {
  let service: PageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
