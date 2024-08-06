import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaitingDashboardComponent } from './raiting-dashboard.component';

describe('RaitingDashboardComponent', () => {
  let component: RaitingDashboardComponent;
  let fixture: ComponentFixture<RaitingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaitingDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaitingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
