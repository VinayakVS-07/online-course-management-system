import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLayout } from './menu-layout';

describe('MenuLayout', () => {
  let component: MenuLayout;
  let fixture: ComponentFixture<MenuLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
