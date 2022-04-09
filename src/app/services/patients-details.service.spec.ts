import { TestBed } from '@angular/core/testing';

import { PatientsDetailsService } from './patients-details.service';

describe('PatientsDetailsService', () => {
  let service: PatientsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
