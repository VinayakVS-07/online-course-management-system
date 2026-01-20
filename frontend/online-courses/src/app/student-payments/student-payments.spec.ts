import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPayments } from './student-payments';

describe('StudentPayments', () => {
  let component: StudentPayments;
  let fixture: ComponentFixture<StudentPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentPayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPayments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
