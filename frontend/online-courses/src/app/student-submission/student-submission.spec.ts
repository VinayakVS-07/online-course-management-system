import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSubmission } from './student-submission';

describe('StudentSubmission', () => {
  let component: StudentSubmission;
  let fixture: ComponentFixture<StudentSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSubmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
