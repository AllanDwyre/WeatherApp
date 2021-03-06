import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-widget',
  templateUrl: './home-widget.component.html',
  styleUrls: ['./home-widget.component.scss'],
})
export class HomeWidgetComponent implements OnInit {
  public location: any = 'Montpellier';
  public searchBarInput: any = '';

  weatherData: any;
  pipe = new DatePipe('en-US');
  todayDate: any;
  coords: any;
  isBottomBarOpen: boolean = false;

  // locations = new Observable((observer) => {
  //   let watchId: number;
  //   if ('geolocation' in navigator) {
  //     watchId = navigator.geolocation.watchPosition(
  //       (position: GeolocationPosition) => {
  //         observer.next(position);
  //       },
  //       (error: GeolocationPositionError) => {
  //         observer.error(error);
  //       }
  //     );
  //   } else {
  //     observer.error('Geolocation not available');
  //   }
  //   return {
  //     unsubscribe() {
  //       navigator.geolocation.clearWatch(watchId);
  //     },
  //   };
  // });

  // locationsSubscription = this.locations.subscribe({
  //   next(position) {
  //     console.log('Current Position: ', position);
  //   },
  //   error(msg) {
  //     console.log('Error Getting Location: ', msg);
  //   },
  // });

  constructor(public httpClient: HttpClient) {
    this.getWeatherData(`q=${this.location}`);
    this.todayDate = this.pipe.transform(Date.now(), 'dd, MMM yyyy, HH:mm');
    setInterval(() => {
      this.getWeatherData(`q=${this.location}`);
      this.todayDate = this.pipe.transform(Date.now(), 'dd, MMM yyyy, HH:mm');
    }, 1000 * 60 * 10);
  }
  ngOnInit(): void {}

  onSubmit() {
    if (this.searchBarInput == '' || this.searchBarInput == null) return;

    this.location = this.searchBarInput;
    this.searchBarInput = '';
    this.closeSearchbar();
    this.getWeatherData(`q=${this.location}`);
  }

  getWeatherData(position: string) {
    this.httpClient
      .get(
        environment.WEATHER_API_URL +
          `weather?${position}&appid=${environment.WEATHER_API_KEY}`
      )
      .subscribe((results) => {
        console.log(results);
        this.weatherData = results;

        this.todayDate = this.pipe.transform(
          new Date(this.weatherData.dt * 1000),
          'dd, MMM yyyy, HH:mm'
          // this.weatherData.timezone.toString()
        );
        this.renderBackgroundImage();
        this.renderWeatherIcon(this.weatherData.weather[0].icon);
        this.getWeatherHistoricalData(this.weatherData.coord);
      });
  }
  getWeatherHistoricalData(loc: any) {
    this.httpClient
      .get(
        `${environment.WEATHER_API_URL}onecall?lat=${loc.lat}&lon=${loc.lon}&exclude=current,daily,minutely&appid=${environment.WEATHER_API_KEY}`
      )
      .subscribe((results) => {
        this.weatherData.hourly = results;
      });
  }

  renderBackgroundImage() {
    let parameter = this.weatherData.weather[0].description
      .split(' ')
      .join('%20');

    var themes = ['beach', 'city', 'productivity', 'rural'];
    var theme = themes[Math.floor(Math.random() * themes.length)];
    fetch(environment.UNSPLASH_API_URL + `random/?${parameter},${theme}`).then(
      (response) => {
        var container = document.getElementById('background_image-container');
        container!.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, .5),rgba(0, 0, 0, 0.2) 30%,rgba(0, 0, 0, 0.2) 70%,rgba(0, 0, 0, .8)) , url(${response.url}) `;
      }
    );
  }
  renderWeatherIcon(weatherIcon: string) {
    var container = document.getElementById('logo');
    container!.style.backgroundImage = `url(http://openweathermap.org/img/wn/${weatherIcon}@2x.png)`;
  }
  get TemperatureCelsius() {
    return Math.round(this.weatherData?.main.feels_like - 273.15);
  }
  getHumanTime(utc: number) {
    return this.pipe.transform(new Date(utc * 1000), 'HH:mm');
  }
  getWindDirection(direction: number): string {
    var val = Math.round(direction / 45 + 0.5);
    var arr = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return arr[val % 8];
  }

  success(position: any): any {
    // let lat = Math.round(position.coords.latitude);
    // let long = Math.round(position.coords.longitude);

    this.coords = position.coords;
  }
  error() {
    this.getWeatherData('q=Paris');
  }

  openDrawer() {
    document.getElementById('sidebar')!.style.width = '250px';
  }
  closeDrawer() {
    document.getElementById('sidebar')!.style.width = '0';
  }
  weatherTimelinePanel() {
    if (this.isBottomBarOpen) {
      document.getElementById('bottombar-btn')!.style.transform =
        'rotateZ(0deg)';

      document.getElementById('bottomPanel')!.style.height = '0';
      document.getElementById('background_image-container')!.style.height =
        '100vh';
    } else {
      document.getElementById('bottombar-btn')!.style.transform =
        'rotateZ(180deg)';

      document.getElementById('bottomPanel')!.style.height = '20vh';
      document.getElementById('background_image-container')!.style.height =
        '80vh';
    }
    this.isBottomBarOpen = !this.isBottomBarOpen;
  }
  openSearchbar() {
    document.getElementById('searchBar')!.style.height = '10vh';
    document.getElementById('searchBar')!.style.opacity = '1';

    document.getElementById('background_image-container')!.style.height =
      '90vh';
    document.getElementById('searchCityInput')?.focus();
    this.closeDrawer();
    document.getElementById('bottombar-btn')!.style.transform = 'rotateZ(0deg)';

    document.getElementById('bottomPanel')!.style.height = '0';

    this.isBottomBarOpen = false;
  }
  closeSearchbar() {
    document.getElementById('searchBar')!.style.height = '0';
    document.getElementById('searchBar')!.style.opacity = '0';
    document.getElementById('background_image-container')!.style.height =
      '100vh';
  }
}

// getWindDirection(direction: any): string {
//   var val = Math.round(direction / 22.5 + 0.5);
//   var arr = [
//     'N',
//     'NNE',
//     'NE',
//     'ENE',
//     'E',
//     'ESE',
//     'SE',
//     'SSE',
//     'S',
//     'SSW',
//     'SW',
//     'WSW',
//     'W',
//     'WNW',
//     'NW',
//     'NNW',
//   ];
//   return arr[val % 16];
// }
