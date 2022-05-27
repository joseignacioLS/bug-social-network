import { TestBed } from '@angular/core/testing';

import { ListControlsService } from './list-controls.service';

describe('ListControlsService', () => {
  let service: ListControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
