import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  public lineBigDashboardChartData: {
    pointHoverRadius: number;
    data: number[];
    pointHoverBorderWidth: number;
    borderWidth: number;
    pointBorderWidth: number;
    label: string;
    fill: boolean;
    pointRadius: number;
  }[];
  public lineBigDashboardChartColors: {
    pointBorderColor: any;
    pointBackgroundColor: string;
    backgroundColor: any;
    borderColor: any;
    pointHoverBorderColor: any;
    pointHoverBackgroundColor: string;
  }[];
  public lineBigDashboardChartLabels: string[];
  public lineBigDashboardChartOptions: ChartOptions;
  public lineBigDashboardChartType: ChartType;
  private canvas: HTMLCanvasElement;
  private ctx: any;
  private gradientStroke: CanvasGradient;
  private gradientFill: CanvasGradient;
  private chartColor: string;

  constructor() {}

  ngOnInit() {
    console.log('profile-stats');
    this.chartColor = '#FFFFFF';

    this.canvas = document.getElementById('bigDashboardChart') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    this.gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0.24)');

    this.lineBigDashboardChartData = [
      {
        label: 'Data',

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95],
      },
    ];
    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: '#2c2c2c',
        pointHoverBackgroundColor: '#2c2c2c',
        pointHoverBorderColor: this.chartColor,
      },
    ];
    this.lineBigDashboardChartLabels = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    this.lineBigDashboardChartOptions = {
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0,
        },
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: '#fff',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: false,
        position: 'nearest',
      },
      legend: {
        position: 'bottom',
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: 'rgba(255,255,255,0.4)',
              fontStyle: 'bold',
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 10,
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: 'transparent',
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              zeroLineColor: 'transparent',
              display: false,
            },
            ticks: {
              padding: 10,
              fontColor: 'rgba(255,255,255,0.4)',
              fontStyle: 'bold',
            },
          },
        ],
      },
    };
    this.lineBigDashboardChartType = 'line';
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
