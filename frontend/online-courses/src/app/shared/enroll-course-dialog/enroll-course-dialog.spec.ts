import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCourseDialog } from './enroll-course-dialog';

describe('EnrollCourseDialog', () => {
  let component: EnrollCourseDialog;
  let fixture: ComponentFixture<EnrollCourseDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollCourseDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollCourseDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
