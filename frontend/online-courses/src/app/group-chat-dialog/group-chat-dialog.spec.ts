import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatDialog } from './group-chat-dialog';

describe('GroupChatDialog', () => {
  let component: GroupChatDialog;
  let fixture: ComponentFixture<GroupChatDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupChatDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupChatDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
