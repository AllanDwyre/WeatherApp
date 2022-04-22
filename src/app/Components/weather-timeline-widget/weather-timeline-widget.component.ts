import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-weather-timeline-widget',
  templateUrl: './weather-timeline-widget.component.html',
  styleUrls: ['./weather-timeline-widget.component.scss'],
})
export class WeatherTimelineWidgetComponent implements OnInit {
  pipe = new DatePipe('en-US');
  todayDate: any;

  @Input() value: any;

  ngOnInit(): void {}
  renderWeatherIcon() {
    return `url(http://openweathermap.org/img/wn/${this.value.weather[0].icon}@2x.png)`;
  }
  getHumanTime(utc: number) {
    return this.pipe.transform(new Date(utc * 1000), 'HH:mm');
  }
  getTemperatureCelsius(temp: number) {
    return Math.round(temp - 273.15);
  }
}
