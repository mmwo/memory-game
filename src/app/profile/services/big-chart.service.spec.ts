import { TestBed } from '@angular/core/testing';

import { BigChartService } from './big-chart.service';

describe('BigChartService', () => {
  let service: BigChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
