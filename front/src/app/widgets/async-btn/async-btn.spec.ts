import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncBtn } from './async-btn';

describe('AsyncBtn', () => {
  let component: AsyncBtn;
  let fixture: ComponentFixture<AsyncBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
