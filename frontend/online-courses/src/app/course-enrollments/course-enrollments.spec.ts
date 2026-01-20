import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrollments } from './course-enrollments';

describe('CourseEnrollments', () => {
  let component: CourseEnrollments;
  let fixture: ComponentFixture<CourseEnrollments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseEnrollments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseEnrollments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
