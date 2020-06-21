import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewerListComponent } from './admin-reviewer-list.component';

describe('AdminReviewerListComponent', () => {
  let component: AdminReviewerListComponent;
  let fixture: ComponentFixture<AdminReviewerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminReviewerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReviewerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
