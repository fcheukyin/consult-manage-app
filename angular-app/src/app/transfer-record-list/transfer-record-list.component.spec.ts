import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRecordListComponent } from './transfer-record-list.component';

describe('TransferRecordListComponent', () => {
  let component: TransferRecordListComponent;
  let fixture: ComponentFixture<TransferRecordListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferRecordListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
