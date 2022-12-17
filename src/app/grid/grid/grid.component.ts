import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  hot_temperature_icon =
    'https://thumbs.dreamstime.com/b/hot-weather-rgb-color-icon-summer-heat-seasonal-forecasting-meteorology-science-air-temperature-prediction-thermometer-sun-180835854.jpg';

  constructor() {}

  ngOnInit(): void {}
}
