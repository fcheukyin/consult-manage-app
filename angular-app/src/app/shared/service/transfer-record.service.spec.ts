import { TestBed } from '@angular/core/testing';

import { TransferRecordService } from './transfer-record.service';

describe('TransferRecordService', () => {
  let service: TransferRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
