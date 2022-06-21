import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysDesactivatedComponent } from './plays-desactivated.component';

describe('PlaysDesactivatedComponent', () => {
  let component: PlaysDesactivatedComponent;
  let fixture: ComponentFixture<PlaysDesactivatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaysDesactivatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaysDesactivatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
