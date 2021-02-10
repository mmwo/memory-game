import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { ApiStorageService } from '@app/memory/services/api-storage.service';
import { BigChartService } from '@app/profile/services/big-chart.service';
import moment, { Moment } from 'moment';
import { MemoryGame } from '@app/memory/models';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Component({
  selector: 'app-big-chart',
  templateUrl: './big-chart.component.html',
  styleUrls: ['./big-chart.component.scss'],
})
export class BigChartComponent implements OnInit {
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
  private chartColor = '#FFFFFF';

  private toDate = moment().set({ hours: 23, minutes: 59, second: 59, millisecond: 99 });
  private fromDate = moment(this.toDate).subtract(1, 'month');

  constructor(private apiStorageService: ApiStorageService, bigChartService: BigChartService) {}

  ngOnInit(): void {
    this.initCanvas();
    const range = this.calculateRange(this.fromDate, this.toDate);
    const stats = this.calculateStats(this.apiStorageService.fetchStats(this.fromDate, this.toDate), range);
    this.lineBigDashboardChartData = [
      {
        label: marker('Cards revealed'),
        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        borderWidth: 2,
        data: stats,
      },
    ];

    this.lineBigDashboardChartLabels = range.map((day) => day.format('MM.D'));
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  private initCanvas() {
    this.canvas = document.getElementById('bigDashboardChart') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, '#80b6f4');
    this.gradientStroke.addColorStop(1, this.chartColor);
    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, 'rgba(128, 182, 244, 0)');
    this.gradientFill.addColorStop(1, 'rgba(255, 255, 255, 0.24)');

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
        bodyFontColor: '#777',
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
  }

  private calculateRange(fromDate: Moment, toDate: Moment): Moment[] {
    const date = moment(fromDate);
    const range = [];
    while (date.isBefore(toDate)) {
      range.push(moment(date.add(1, 'day')));
    }
    return range;
  }

  private calculateStats(memoryGames: MemoryGame[], range: moment.Moment[]) {
    const gamesByDate = {};
    memoryGames.forEach((game) => {
      const dateString = game.startedAt.substr(0, 10);
      if (!gamesByDate[dateString]) {
        gamesByDate[dateString] = 0;
      }
      gamesByDate[dateString] += game.cards.reduce((sum, card) => sum + card.revealCounter, 0);
    });

    return range.map((day) => {
      const dateString = day.format('YYYY-MM-DD');
      return gamesByDate[dateString] ? gamesByDate[dateString] : 0;
    });
  }
}
