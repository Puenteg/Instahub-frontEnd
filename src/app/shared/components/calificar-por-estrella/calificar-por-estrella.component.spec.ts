import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarPorEstrellaComponent } from './calificar-por-estrella.component';

describe('CalificarPorEstrellaComponent', () => {
  let component: CalificarPorEstrellaComponent;
  let fixture: ComponentFixture<CalificarPorEstrellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalificarPorEstrellaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificarPorEstrellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
