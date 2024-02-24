import { TestBed } from '@angular/core/testing';

import { InputSinkService } from './input-sink.service';

describe('InputSinkService', () => {
  let service: InputSinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputSinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
