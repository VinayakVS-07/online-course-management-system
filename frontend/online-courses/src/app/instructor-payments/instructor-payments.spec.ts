import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPayments } from './instructor-payments';

describe('InstructorPayments', () => {
  let component: InstructorPayments;
  let fixture: ComponentFixture<InstructorPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorPayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPayments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
