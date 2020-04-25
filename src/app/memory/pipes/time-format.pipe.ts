import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  private static prefix(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  transform(value: number): any {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = (value % 3600) % 60;
    return `${TimeFormatPipe.prefix(hours)}:${TimeFormatPipe.prefix(minutes)}:${TimeFormatPipe.prefix(seconds)}`;
  }
}
