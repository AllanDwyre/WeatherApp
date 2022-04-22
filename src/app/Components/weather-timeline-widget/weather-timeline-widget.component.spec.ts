import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTimelineWidgetComponent } from './weather-timeline-widget.component';

describe('WeatherTimelineWidgetComponent', () => {
  let component: WeatherTimelineWidgetComponent;
  let fixture: ComponentFixture<WeatherTimelineWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherTimelineWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherTimelineWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
