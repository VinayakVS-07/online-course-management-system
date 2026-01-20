import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseReview } from './course-review';

describe('CourseReview', () => {
  let component: CourseReview;
  let fixture: ComponentFixture<CourseReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
