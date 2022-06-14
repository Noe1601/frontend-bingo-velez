import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWinnerDetailsComponent } from './view-winner-details.component';

describe('ViewWinnerDetailsComponent', () => {
  let component: ViewWinnerDetailsComponent;
  let fixture: ComponentFixture<ViewWinnerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWinnerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWinnerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
