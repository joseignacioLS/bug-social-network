import { TestBed } from '@angular/core/testing';

import { PageLimitService } from './page-limit.service';

describe('PageLimitService', () => {
  let service: PageLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
