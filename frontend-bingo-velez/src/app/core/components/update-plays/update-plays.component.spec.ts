import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlaysComponent } from './update-plays.component';

describe('UpdatePlaysComponent', () => {
  let component: UpdatePlaysComponent;
  let fixture: ComponentFixture<UpdatePlaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePlaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
