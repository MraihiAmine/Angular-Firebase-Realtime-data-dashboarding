import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  temperature_stats = {
    max_temperature: '',
    min_temperature: '',
    average_temperature: '',
    mean_temperature: '',
  };
  hot_temperature_icon =
    'https://thumbs.dreamstime.com/b/hot-weather-rgb-color-icon-summer-heat-seasonal-forecasting-meteorology-science-air-temperature-prediction-thermometer-sun-180835854.jpg';
  add_cards_stats(eventData: { temperature_stats_param: any }) {
    console.log('The data in the parent object (grid is equal to');
    console.log(eventData.temperature_stats_param);
    this.temperature_stats = eventData.temperature_stats_param;
  }
  constructor() {}

  ngOnInit(): void {}
}
