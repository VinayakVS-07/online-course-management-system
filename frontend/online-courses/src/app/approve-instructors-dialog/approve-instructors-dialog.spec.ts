import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveInstructorsDialog } from './approve-instructors-dialog';

describe('ApproveInstructorsDialog', () => {
  let component: ApproveInstructorsDialog;
  let fixture: ComponentFixture<ApproveInstructorsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveInstructorsDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveInstructorsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
