import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePayments } from './course-payments';

describe('CoursePayments', () => {
  let component: CoursePayments;
  let fixture: ComponentFixture<CoursePayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursePayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursePayments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
