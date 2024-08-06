import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceValidationComponent } from './service-validation.component';

describe('ServiceValidationComponent', () => {
  let component: ServiceValidationComponent;
  let fixture: ComponentFixture<ServiceValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceValidationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
