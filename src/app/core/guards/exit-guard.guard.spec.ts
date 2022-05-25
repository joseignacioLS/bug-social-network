import { TestBed } from '@angular/core/testing';

import { ExitGuardGuard } from './exit-guard.guard';

describe('ExitGuardGuard', () => {
  let guard: ExitGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExitGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
