import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAiChat } from './student-ai-chat';

describe('StudentAiChat', () => {
  let component: StudentAiChat;
  let fixture: ComponentFixture<StudentAiChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentAiChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAiChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
