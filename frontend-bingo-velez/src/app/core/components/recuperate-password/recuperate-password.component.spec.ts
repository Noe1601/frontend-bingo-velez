import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperatePasswordComponent } from './recuperate-password.component';

describe('RecuperatePasswordComponent', () => {
  let component: RecuperatePasswordComponent;
  let fixture: ComponentFixture<RecuperatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperatePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
