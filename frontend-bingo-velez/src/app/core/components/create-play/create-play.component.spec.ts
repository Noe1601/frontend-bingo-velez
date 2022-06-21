import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlayComponent } from './create-play.component';

describe('CreatePlayComponent', () => {
  let component: CreatePlayComponent;
  let fixture: ComponentFixture<CreatePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
