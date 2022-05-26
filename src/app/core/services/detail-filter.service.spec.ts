import { TestBed } from '@angular/core/testing';

import { DetailFilterService } from './detail-filter.service';

describe('DetailFilterService', () => {
  let service: DetailFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
