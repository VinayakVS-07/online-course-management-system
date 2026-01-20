import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyEnrollments } from './my-enrollments';

describe('MyEnrollments', () => {
  let component: MyEnrollments;
  let fixture: ComponentFixture<MyEnrollments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyEnrollments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyEnrollments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
