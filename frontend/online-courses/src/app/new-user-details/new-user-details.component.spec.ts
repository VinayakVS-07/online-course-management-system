import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserDetails } from './new-user-details.component';

describe('NewUserDetails', () => {
  let component: NewUserDetails;
  let fixture: ComponentFixture<NewUserDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUserDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewUserDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
