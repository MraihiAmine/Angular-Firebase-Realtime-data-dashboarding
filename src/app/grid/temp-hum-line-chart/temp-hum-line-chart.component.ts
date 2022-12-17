import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { FirebaseTempHumService } from 'src/app/services/firebase_charts/firebase-temp-hum.service';
@Component({
  selector: 'app-temp-hum-line-chart',
  templateUrl: './temp-hum-line-chart.component.html',
  styleUrls: ['./temp-hum-line-chart.component.css'],
})
export class TempHumLineChartComponent implements OnInit {
  constructor(private firebaseTempHumService: FirebaseTempHumService) {}

  //temporary temperature array, used later for verification purposes
  temperatureDataTmp: any[] = [];

  //holders of the temperature data
  temperatureValues: any[] = [];
  temperatureTimeStamp: any[] = [];
  ngOnInit() {
    this.firebaseTempHumService.temperatureObservable.subscribe(
      (temperatureData) => {
        console.log('temperatureData:', temperatureData);

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

        //defining the content of categories from the firebase
        this.options.xAxis.categories = this.temperatureTimeStamp;
        this.options.series[0].data = this.temperatureValues;

        //Getting statistic values from the temperature data
        let max_temperature = Math.max(...this.temperatureValues);
        let min_temperature = Math.min(...this.temperatureValues);

        // let average_temperature = Math.

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
