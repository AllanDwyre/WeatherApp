import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeWidgetComponent } from './Components/home-widget/home-widget.component';
import { WeatherTimelineWidgetComponent } from './Components/weather-timeline-widget/weather-timeline-widget.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeWidgetComponent,
    WeatherTimelineWidgetComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
