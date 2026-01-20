import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorEarning } from './instructor-earning';

describe('InstructorEarning', () => {
  let component: InstructorEarning;
  let fixture: ComponentFixture<InstructorEarning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorEarning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorEarning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
