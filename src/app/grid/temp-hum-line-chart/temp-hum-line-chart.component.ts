import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FirebaseTempHumService } from 'src/app/services/firebase_charts/firebase-temp-hum.service';
// require('stats-array')
import * as ss from 'simple-statistics';
import { temperatureModel } from 'src/app/Models/Charts/temp_interface';
// import stats-array from 'node_modules\stats-array\stats-array.js'
declare var require: any;
@Component({
  selector: 'app-temp-hum-line-chart',
  templateUrl: './temp-hum-line-chart.component.html',
  styleUrls: ['./temp-hum-line-chart.component.css'],
})
export class TempHumLineChartComponent implements OnInit {
  constructor(private firebaseTempHumService: FirebaseTempHumService) {}
  private max_temperature!: string;
  private min_temperature!: string;
  private average_temperature!: string;
  private mean_temperature!: string;

  private temperature_stats = {
    max_temperature: '',
    min_temperature: '',
    average_temperature: '',
    mean_temperature: '',
  };

  //temporary temperature array, used later for verification purposes
  temperatureDataTmp: temperatureModel[] = [];

  //holders of the temperature data
  temperatureValues: number[] = [];
  temperatureTimeStamp: any[] = [];
  @Output() temperatureStatsCreated = new EventEmitter<{
    temperature_stats_param: object;
  }>();
  ngOnInit() {
    this.firebaseTempHumService.temperatureObservable.subscribe(
      (temperatureData) => {
        console.log('temperatureData:', temperatureData);
        var arr = [50, 40, 30, 20, 30, 40, 50];

        //holders of the temperature data
        this.temperatureDataTmp = [];
        this.temperatureValues = [];
        this.temperatureTimeStamp = [];

        //storage of the accusation time temperature value
        if (temperatureData.length)
          temperatureData.forEach((temperatureDataRow) => {
            this.temperatureValues.push(temperatureDataRow.temperature);

            /**
              Since we get seconds from firebase
              we have to convert it to date
             */
            let temperatureTimeDateFormat = new Date(
              temperatureDataRow.time.seconds * 1000
            )
              .toISOString()
              .split('.')[0];
            this.temperatureTimeStamp.push(temperatureTimeDateFormat);
          });

        //temporary temperature array, used later for verification purposes
        this.temperatureDataTmp = temperatureData;
        console.log(
          `temperature average is equal to ${ss.average(
            this.temperatureValues
          )}`
        );
        //Statistic values
        this.max_temperature =
          ('' + ss.max(this.temperatureValues)).slice(0, 5) + ' °C';

        this.min_temperature =
          ('' + ss.min(this.temperatureValues)).slice(0, 5) + ' °C';

        this.average_temperature =
          ('' + ss.average(this.temperatureValues)).slice(0, 5) + ' °C';

        this.mean_temperature =
          ('' + ss.mean(this.temperatureValues)).slice(0, 5) + ' °C';

        console.log(`max_temperature string: ${this.max_temperature}`);
        console.log(`min_temperature string: ${this.min_temperature}`);
        console.log(`average_temperature string: ${this.average_temperature}`);
        console.log(`mean_temperature string: ${this.mean_temperature}`);

        this.temperature_stats.max_temperature = this.max_temperature;
        this.temperature_stats.min_temperature = this.min_temperature;
        this.temperature_stats.average_temperature = this.average_temperature;
        this.temperature_stats.mean_temperature = this.mean_temperature;

        this.temperatureStatsCreated.emit({
          temperature_stats_param: this.temperature_stats,
        });

        //defining the content of categories from the firebase
        this.options.xAxis.categories = this.temperatureTimeStamp;
        this.options.series[0].data = this.temperatureValues;

        //Getting statistic values from the temperature data
        let max_temperature = Math.max(...this.temperatureValues);
        let min_temperature = Math.min(...this.temperatureValues);

        //creation of the line chart
        Highcharts.chart('container_hum_temp_chart', this.options);
      }
    );
  }
  public options: any = {
    chart: {
      type: 'spline',
      height: 250,
    },
    title: {
      text: 'Real time temperature values',
    },
    credits: {
      enabled: false,
    },

    xAxis: {
      categories: this.temperatureTimeStamp,
    },
    series: [
      {
        name: 'Temperature',
        data: this.temperatureValues,
      },
    ],
  };
}
