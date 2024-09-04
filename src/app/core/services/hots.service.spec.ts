import { TestBed } from '@angular/core/testing';

import { HotsService } from './hots.service';

describe('HotsService', () => {
  let service: HotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
