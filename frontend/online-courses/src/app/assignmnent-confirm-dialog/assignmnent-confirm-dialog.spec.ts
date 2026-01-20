import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmnentConfirmDialog } from './assignmnent-confirm-dialog';

describe('AssignmnentConfirmDialog', () => {
  let component: AssignmnentConfirmDialog;
  let fixture: ComponentFixture<AssignmnentConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmnentConfirmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmnentConfirmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
