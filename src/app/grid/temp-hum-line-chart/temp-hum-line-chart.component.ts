import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-temp-hum-line-chart',
  templateUrl: './temp-hum-line-chart.component.html',
  styleUrls: ['./temp-hum-line-chart.component.css'],
})
export class TempHumLineChartComponent implements OnInit {

  ngOnInit() {
    Highcharts.chart('container_hum_temp_chart', this.options);
  }
  
  public options: any = {
    chart: {
      type: 'spline',
      height: 250,
    },
    title: {
      text: 'Temp-Humidity',
    },
    credits: {
      enabled: false,
    },

    xAxis: {
      categories: [
        '11 Sept.',
        '12 Sept.',
        '13 Sept.',
        '14 Sept.',
        '15 Sept.',
        '16 Sept.',
        '17 Sept.',
        '18 Sept.',
        '19 Sept.',
        '20 Sept.',
        '21 Sept.',
        '22 Sept.',
      ],
    },
    series: [
      {
        name: 'Temperature',
        data: [
          3.0, 15.9, 19.5, 16.5, 25.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
        ],
      },
      {
        name: 'Humidity',
        data: [
          24.8, 24.1, 20.1, 14.1, 8.6, 2.5,25.2, 26.5, 23.3, 18.3, 13.9, 9.6
        ],
      },
    ],
  };
}
